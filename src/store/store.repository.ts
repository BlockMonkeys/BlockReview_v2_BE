import { CustomRepository } from "src/database/typeorm-ex.decorator";
import { Store } from "src/entities/store.entity";
import { Repository } from "typeorm";
import { CreateStoreDto } from "./dto/create-store-dto";
import { v4 as uuid } from "uuid";
import { User } from "src/entities/user.entity";
import { ConflictException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UpdateStoreDto } from "./dto/update-store-dto";
import { UserRepository } from "src/user/user.repository";

@CustomRepository(Store)
export class StoreRepository extends Repository<Store> {
    // Get Every Store
    async getEveryStore() : Promise <Store[]>{
        const dbData = await this.find();
        return dbData;
    }

    // Get Recent Store
    async getRecentStore(count) : Promise<Store[]> {
        const size = count;

        const tx = await this.find({
            order : {
                registeredAt : "DESC",
            }
        });

        const result = tx.slice(0, size);
        return result;
    }

    // Get Store By Id
    async getStore(id : string) : Promise<Store> {
        const tx = await this.findOne({
            where : {
                id
            }
        });

        if(!tx) throw new NotFoundException();

        return tx;
    }

    // Get Paging Store
    async getPagingStore(page : number, limit : number) : Promise<Store[]> {
        const size = limit;

        const tx = this.find({
            skip: (page - 1) * size,
            take: size
        })

        return tx;
    }

    // Register Store
    async createStore(createStoreDto : CreateStoreDto, user : User) : Promise<Store> {
        const { name, description, address, tel, category, imgUrl } = createStoreDto;
        // 이미 점포등록을 진행한 유저는 거부
        if(user.store){
            throw new ConflictException("Already Exist");
        }

        const tx = await this.create({
            id : uuid(),
            name,
            description,
            address,
            tel,
            category,
            imgUrl,
            user : user
        });

        await tx.save();

        return tx;
    }

    // Update Store Description
    async updateStoreDescription(updateStoreDto : UpdateStoreDto, user : User) : Promise<Store> {
        const { storeId, description } = updateStoreDto;
        
        const storeUpdate = await this.findOne({
            where: {
                id : storeId
            },
            relations:["user"]
        })
        // 찾고자하는 리뷰가 존재하지 않는 경우;
        if(!storeUpdate) {
            throw new NotFoundException();
        }

        // 상점 주 본인만 수정 가능
        if(storeUpdate.user.eoa !== user.eoa) {
            throw new UnauthorizedException();
        }
        
        storeUpdate.description = description;
        const tx = await this.save(storeUpdate);

        return tx;
    }
}
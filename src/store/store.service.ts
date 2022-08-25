import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Store } from 'src/entities/store.entity';
import { User } from 'src/entities/user.entity';
import { CreateStoreDto } from './dto/create-store-dto';
import { UpdateStoreDto } from './dto/update-store-dto';
import { StoreRepository } from './store.repository';
import Web3 from "web3";
import { SERVICE_CONTRACT_ABI, SERVICE_CONTRACT_ADRS } from 'src/util/contract';

@Injectable()
export class StoreService {
    constructor(
        private storeRepo : StoreRepository
    ){}

    // Get Every Store With Web3 Data
    async getEveryStore() {
        // 1. DB Every Data Query
        const dbData = await this.storeRepo.getEveryStore();
        
        // 2. Combine DB Data With Web3 Data;
        const web3 = new Web3("https://goerli.infura.io/v3/d87795149a1c4bf68e087d7a12040830");
        const service = new web3.eth.Contract(SERVICE_CONTRACT_ABI, SERVICE_CONTRACT_ADRS);
        const raw_reviews = await service.methods.getEveryReview().call();

        let web3Data = [];

        raw_reviews.map((item, idx) => {
            let data = {
                id : item[0],
                nftId : item[1],
                storeId : item[2],
                title : item[3],
                description : item[4],
                owner : item[5],
                likedUser : item[6],
                price : item[7],
                createdAt : item[8]
            }
            web3Data.push(data);
        })

        web3Data.shift();
    
        dbData.map((dbItem, idx)=> {
            let review = [];

            web3Data.map((web3Item, idx)=> {
                if(dbItem.id === web3Item.storeId) {
                    review.push(web3Item);
                }
            })
            dbItem["reviews"] = review;
        })

        return dbData;
    }

    // Get Recent Store
    async getRecentStore(count) : Promise<Store[]> {
        return this.storeRepo.getRecentStore(count);
    }
    // Get Store By Id
    async getStore(id : string) : Promise<Store> {
        return this.storeRepo.getStore(id);
    }
    // Get Store Paging
    async getPagingStore(page : number, limit : number) : Promise<Store[]> {
        return this.storeRepo.getPagingStore(page, limit);
    }
    // Create Store
    async createStore(createStoreDto : CreateStoreDto, user: User) : Promise<Store> {
        // Only Store Owner;
        if(user.userType !== 0) {
            throw new UnauthorizedException();
        }

        return this.storeRepo.createStore(createStoreDto, user);
    }
    // Update Store Description
    async updateStoreDescription(updateStoreDto : UpdateStoreDto, user : User) : Promise<Store> {
        return this.storeRepo.updateStoreDescription(updateStoreDto, user);
    }
}

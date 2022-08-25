import { Body, Controller, Get, Param, Patch, Post, Req, UnauthorizedException, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Store } from 'src/entities/store.entity';
import { CreateStoreDto } from './dto/create-store-dto';
import { UpdateStoreDto } from './dto/update-store-dto';
import { StoreService } from './store.service';


@Controller('store')
@ApiTags('Store APIs')
export class StoreController {
    constructor(private storeService : StoreService){}
    // 점포정보 & 리뷰 정보 Join 전체조회 [OK]
    @Get("/")
    @ApiOperation({ summary : "상점 & Web3 Data 통합 조회", description: "상점 & Web3 Data 통합 조회 API" })
    async getEveryStore() {
        return this.storeService.getEveryStore();
    }

    // 최신 리뷰 조회
    @Get("/recent/:count")
    @ApiOperation({ summary : "최신 리뷰 조회 (갯수)", description: "최신 리뷰 조회 (갯수) API" })
    @ApiOkResponse({
        type : [Store]
    })
    async getRecentStore(@Param("count") count) : Promise<Store[]> {
        return this.storeService.getRecentStore(count);
    }

    // 단일 조회 (By Review ID);
    @Get("/detail/:id")
    @ApiOperation({ summary: "상점 단일 조회 API", description : "상점 단일 조회 API"})
    @ApiOkResponse({
        type : Store
    })
    async getStore(@Param("id") id) : Promise<Store> {
        return this.storeService.getStore(id);
    }

    // 페이징 조회;
    @Get("/:page/:limit")
    @ApiOperation({ summary: "상점 페이징 조회 API", description : "상점 페이징 조회 API"})
    @ApiOkResponse({
        type : [Store]
    })
    async getPagingStore(@Param("page") page, @Param("limit") limit) : Promise<Store[]> {
        return this.storeService.getPagingStore(page, limit);
    }

    // 글 생성;
    @Post("/create")
    @UseGuards(AuthGuard())
    @ApiBearerAuth()
    @ApiOperation({ summary: "상점 등록 API", description : "상점 등록 API"})
    @ApiOkResponse({
        type : Store
    })
    async createStore (
        @Req() req, 
        @Body(ValidationPipe) createStoreDto : CreateStoreDto
    ) : Promise<Store>
    {
        return this.storeService.createStore(createStoreDto, req.user);
    }

    // 글 수정
    @Patch("/update")
    @UseGuards(AuthGuard())
    @ApiBearerAuth()
    @ApiOperation({ summary: "상점 description 수정 API", description : "상점 description 수정 API"})
    @ApiOkResponse({
        type : Store
    })
    async updateStoreDescription(
        @Req() req,
        @Body(ValidationPipe) updateStoreDto : UpdateStoreDto
    ) : Promise<Store>
    {
        return this.storeService.updateStoreDescription(updateStoreDto, req.user);
    }
}
import { BadRequestException, Controller, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('aws')
@ApiTags('AWS APIs')
export class AwsController {
    // S3 Upload
    @Post("/s3/upload")
    @UseInterceptors(FileInterceptor("file"))
    @ApiOperation({ summary : "상점이미지 S3 업로드 API", description: "상점이미지를 AWS S3에 업로드하는 API" })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
          type: 'object',
          properties: {
            file: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      })
    @ApiOkResponse({
        schema: {
            type : "object",
            example : {
                url : "https://blockmonkey-assets.s3.ap-northeast-2.amazonaws.com/blockreview/1660637370994test.png"
            }
        }
    })
    async uploadS3(
        @UploadedFile(new ParseFilePipe({
            validators : [
                new MaxFileSizeValidator ({ maxSize : 100000 }),
            ]
        })) 
        file : Express.Multer.File
    ) : Promise<{ url : string }>
    {
        // AWS Config
        AWS.config.update({
            region: "ap-northeast-2",
            credentials: ({
                accessKeyId: process.env.AWS_ACCESSKEYID,
                secretAccessKey: process.env.AWS_SECRET_ACCESSKEY
            })
        });
        
        try {
            const s3 = await new AWS.S3();

            const uploadParams = {
                Bucket : process.env.AWS_BUCKET,
                Body : file.buffer,
                Key : `${Date.now() + file.originalname}`,
                ContentType : file.mimetype,
                ACL : "public-read"
            }

            await s3.putObject(uploadParams).promise();

            return { url : "https://blockmonkey-assets.s3.ap-northeast-2.amazonaws.com/blockreview/" + uploadParams.Key };

        } catch (e) {
            throw new BadRequestException();
        }
    }

}

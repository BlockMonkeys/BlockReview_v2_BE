import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function setupSwagger(app : INestApplication) {
    const options = new DocumentBuilder()
        .setTitle("Block Review Version 2.0")
        .setDescription("BlockReview Version 2 API Document")
        .setVersion("2.0")
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup("api-docs", app, document);
}
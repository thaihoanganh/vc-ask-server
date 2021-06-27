import { APP_FILTER, APP_GUARD, APP_PIPE } from "@nestjs/core";
import { Module, ValidationPipe } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";

import config from "@config/index";
import { HttpExceptionFilter } from "@common/filters/http-exception.filter";
import { GqlAuthGuard } from "@common/guards/gql-jwt-auth.guard";

import { AuthModule } from "@modules/auth/auth.module";
import { JwtStrategy } from "@modules/auth/jwt.strategy";
import { UsersModule } from "./modules/users/users.module";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      load: [config],
    }),
    MongooseModule.forRootAsync({
      useFactory: () => config().mongodb,
    }),
    GraphQLModule.forRoot({
      debug: false,
      autoSchemaFile: "schema.gql",
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtStrategy,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: GqlAuthGuard,
    },
  ],
})
export class AppModule {}

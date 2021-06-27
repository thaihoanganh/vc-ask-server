import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

import { UsersModule } from "@modules/users/users.module";

import { PassportModule } from "@nestjs/passport";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get("jwt").secret,
        signOptions: {
          expiresIn: configService.get("jwt").expiresIn,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}

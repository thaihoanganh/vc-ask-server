import { HttpException, HttpStatus } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { Public } from "@common/decorators/auth.decorator";

import { AuthService } from "./auth.service";
import { LoginInput } from "./dto/login-input.dto";
import { RegisterInput } from "./dto/register-input.dto";
import { Auth } from "./models/auth.model";

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Public()
  @Mutation(() => Auth)
  async register(@Args("registerInput") registerInput: RegisterInput) {
    const user = await this.authService.findUserByEmail(registerInput.email);
    if (user) {
      throw new HttpException("CONFLICTtt", HttpStatus.CONFLICT);
    }
    return await this.authService.register(registerInput);
  }

  @Public()
  @Mutation(() => Auth)
  async login(@Args("loginInput") loginInput: LoginInput) {
    const user = await this.authService.findUserByEmail(loginInput.email);
    if (!user) {
      throw new HttpException("NOT_FOUND", HttpStatus.NOT_FOUND);
    }
    return this.authService.login(user, loginInput);
  }
}

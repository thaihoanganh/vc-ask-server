import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import { UsersService } from "@modules/users/users.service";

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {}

  async findUserByEmail(email: string) {
    return this.userService.findUser({ email });
  }

  async register(registerInput: any) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(registerInput.password, salt);

    const user = await this.userService.createUser({
      email: registerInput.email,
      username: registerInput.username,
      password: hash,
    });

    return this.generateToken(user.toObject());
  }

  async login(user: any, loginInput: any) {
    const isMatch = await bcrypt.compare(loginInput.password, user.password);
    if (isMatch) {
      return this.generateToken(user.toObject());
    }
    return null;
  }

  async generateToken(user: any) {
    const payload = { _id: user._id, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      ...user,
      access_token: token,
    };
  }
}

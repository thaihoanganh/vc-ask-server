import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { User, UserDocument } from "./schemas/user.schema";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly usersModel: Model<UserDocument>) {}

  async findUser(query: any) {
    return this.usersModel.findOne(query);
  }

  async createUser(createUserDto: any) {
    const createUser = new this.usersModel({
      email: createUserDto.email,
      username: createUserDto.username,
      password: createUserDto.password,
      role: "role",
      avatar_path: null,
      created_at: new Date(),
      updated_at: null,
      deleted_at: null,
    });

    await createUser.save();
    return createUser;
  }
}

import { Query, Resolver } from "@nestjs/graphql";

import { UsersService } from "./users.service";

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => String)
  async users() {
    return "Hello World";
  }
}

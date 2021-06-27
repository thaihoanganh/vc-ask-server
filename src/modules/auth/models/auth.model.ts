import { User } from "@modules/users/models/user.model";

import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Auth extends User {
  @Field()
  access_token: string;
}

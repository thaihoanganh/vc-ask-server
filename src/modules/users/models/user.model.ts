import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {
  @Field(() => ID)
  _id: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  username: string;

  @Field({ nullable: true })
  role?: string;

  @Field({ nullable: true })
  avatar_path?: string;

  @Field({ nullable: true })
  created_at?: string;

  @Field({ nullable: true })
  updated_at?: string;

  @Field({ nullable: true })
  deleted_at?: string;
}

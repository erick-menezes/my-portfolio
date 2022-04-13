import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Technology {
    @Field(type => Int)
    techId: number;

    @Field(type => String)
    name: string;

    @Field(type => String)
    camelName: string;
}
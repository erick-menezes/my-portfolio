import { Field, InputType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@InputType()
export class TechnologyEntity {
    @PrimaryGeneratedColumn()
    techId?: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    camelName: string;
}
import { Field, InputType, Int } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@InputType()
export class ProjectEntity {
    @PrimaryGeneratedColumn()
    projectId?: number;

    @Field()
    @Column()
    name: string;
    
    @Field()
    @Column()
    technologies: string;

    @Field()
    @Column()
    githubLink: string;

    @Field()
    @Column()
    projectLink: string;

    @Field()
    @Column()
    imagePath: string;

    @Field()
    @Column('text', { nullable: true })
    description: string;
}
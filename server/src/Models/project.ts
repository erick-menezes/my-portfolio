import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Project {
    @Field(type => Int)
    projectId: number;

    @Field(type => String)
    name: string;
    
    @Field(type => String)
    technologies: string;
    
    @Field(type => String)
    githubLink: string;
    
    @Field(type => String)
    projectLink: string;
    
    @Field(type => String)
    imagePath: string;
    
    @Field(type => String, { nullable: true })
    description?: string;
}
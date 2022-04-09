import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/Models/project';
import { ProjectEntity } from 'src/project.entity';
import { Repository } from 'typeorm';

@Resolver(of => Project)
export class ProjectResolver {
    constructor(
        @InjectRepository(ProjectEntity)
        private projectRepository: Repository<ProjectEntity>,
    ) {}

    @Mutation(returns => Project)
    async createProject(@Args('data') input: ProjectEntity) {
        const projectCreated = await this.projectRepository.save(input);
        return projectCreated;
    }
    
    @Query(returns => [Project])
    async findAllProjects(): Promise<ProjectEntity[]> {
        return this.projectRepository.find();
    }
}
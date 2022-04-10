import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
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

    @Mutation(returns => Int)
    async deleteProject(@Args('id', { type: () => Int }) id: number) {
        const deleteQuery = await this.projectRepository.createQueryBuilder().delete().where('projectId = :id', { id }).execute();
        return deleteQuery.affected;
    }
    
    @Query(returns => [Project])
    async findAllProjects(): Promise<ProjectEntity[]> {
        return this.projectRepository.find();
    }
}
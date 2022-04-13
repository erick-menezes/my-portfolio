import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';

import { Project } from 'src/Models/project';
import { Technology } from 'src/Models/technology';

import { ProjectEntity } from 'src/project.entity';
import { TechnologyEntity } from 'src/technology.entity';

import { Repository } from 'typeorm';
@Resolver(of => Project)
export class ProjectResolver {
    constructor(
        @InjectRepository(ProjectEntity)
        private projectRepository: Repository<ProjectEntity>,
        @InjectRepository(TechnologyEntity)
        private technologyRepository: Repository<TechnologyEntity>,
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

    @Query(returns => [Technology])
    async findAllTechnologies(): Promise<TechnologyEntity[]> {
        return this.technologyRepository.find();
    }

    @Mutation(returns => Technology)
    async createTechnology(@Args('data') input: TechnologyEntity) {
        const technologyCreated = await this.technologyRepository.save(input);
        return technologyCreated;
    }
}
import { gql } from "@apollo/client";

export const getAllProjects = gql`
{
  findAllProjects {
    projectId,
    name,
    technologies,
    githubLink,
    projectLink,
    imagePath,
    description
  }
}
`;

export const getAllTechnologies = gql`
  {
    findAllTechnologies {
      techId,
      name,
      camelName
    }
  }
`;
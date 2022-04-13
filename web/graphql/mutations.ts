import { gql } from "@apollo/client";

export const removeProjectById = gql`
    mutation RemoveProjectById($id: Int!) {
        removeProjectById(id: $id)
    }
`;

export const createTechnology = gql`
    mutation CreateTechnology($data: TechnologyEntity!) {
        createTechnology(data: $data) {
            name,
            camelName
        }
    }
`;
import Image from "next/image";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getAllProjects, getAllTechnologies } from "../../graphql/queries";
import { removeProjectById } from "../../graphql/mutations";

import Swal from "sweetalert2";

import { Button, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';

import TechDialog from "../../components/ProjectModal/TechDialog";

function AdminPage() {
    const router = useRouter();
    const projects = useQuery(getAllProjects);
    const technologies = useQuery(getAllTechnologies);
    const [deleteProject] = useMutation(removeProjectById);

    const [techDialog, setTechDialog] = useState(false);

    const removeProject = (idProject: number) => {
        Swal.fire({
            title: "Tem certeza?",
            text: "O projeto será excluído do banco de dados e não será possível recuperá-lo.",
            icon: 'question',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
        }).then(result => {
            if (result.isConfirmed) {
                deleteProject({
                    variables: { projectId: idProject }
                }).then(() => {
                    Swal.fire({
                        title: "Projeto excluído com sucesso!",
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }).catch(() => {
                    Swal.fire({
                        title: "Erro ao excluir o projeto!",
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
            }
        })
    }

    return (
        <div className="flex flex-col gap-y-10 pl-24 pt-16 ptw-full h-screen">
            <IconButton className="absolute top-2 left-2" aria-label="delete" size="large" onClick={() => router.back()}>
                <ArrowBackIcon fontSize="inherit" />
            </IconButton>
            <h1 className="text-3xl font-bold">Admin preferences</h1>
            <div>
                <h2 className="text-2xl font-bold">Seus projetos</h2>
                <div className="flex gap-x-10 mt-5">
                    {projects.data?.findAllProjects.map((project: any) => (
                        <div key={project.projectId}>
                            <div className="group overflow-hidden relative">
                                <Image
                                    className="z-0 select-none rounded-lg"
                                    src={project.imagePath}
                                    alt={project.description}
                                    width={350}
                                    height={200}
                                />
                                <DeleteIcon className="absolute top-3 right-3 cursor-pointer" color="error" onClick={() => removeProject(project.projectId)} />
                                <InfoIcon className="absolute top-12 right-3 cursor-pointer" color="primary" />
                            </div>
                        </div>
                    ))}
                    <div className="flex flex-col gap-y-2 text-gray-300 items-center justify-center border-2 border-gray-300 rounded border-dashed w-[350px] h-[200px] select-none cursor-pointer">
                        <AddIcon fontSize="large" />
                        <span>Adicionar projeto</span>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex gap-x-5">
                    <h2 className="text-2xl font-bold">Suas tecnologias</h2>
                    <Button className="flex items-center justify-between rounded" variant="text" onClick={() => setTechDialog(true)}>
                        <AddIcon fontSize="medium" />
                        <span className="ml-2">Adicionar tecnologia</span>
                    </Button>
                </div>
                <div className="flex gap-x-10 mt-5">
                    <ul>
                        {technologies?.data?.findAllTechnologies?.map((technology: any) => (
                            <li key={technology.techId}>{technology.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <TechDialog open={techDialog} setOpen={setTechDialog} technologyQuery={technologies} />
        </div>
    )
}

export default AdminPage;
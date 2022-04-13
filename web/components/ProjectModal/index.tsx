import { Button, Chip } from '@mui/material';
import Modal from '@mui/material/Modal';
import Image from 'next/image';

import { ProjectType } from '../../interfaces/HomePage';

import GitHubIcon from '@mui/icons-material/GitHub';

interface ProjectModalType {
    open: boolean;
    setOpen: (open: boolean) => void;
    projectInfo: ProjectType;
}

function ProjectModal({ open, setOpen, projectInfo }: ProjectModalType) {
    function handleCloseModal() {
        setOpen(false);
    }

    function accessProject() {
        window.open(projectInfo.projectLink, '_blank');
    }

    return (
        <Modal
            open={open}
            onClose={handleCloseModal}
            className="flex items-center justify-center"
        >
            <div className="flex bg-white w-10/12 h-5/6 rounded outline-0 p-5">
                <div className="h-5/6 w-full">
                    <div>
                        <b className="text-lg mr-2">{projectInfo.name}</b>
                        {projectInfo?.technologies?.split(';')?.map((technology: string, index: number) => (
                            <Chip
                                key={index}
                                label={technology}
                                className="mr-2 bg-black text-white h-5"
                                variant="outlined"
                            />
                        ))}
                    </div>
                    <div className="mt-5 w-full h-full relative">
                        <Image 
                            src={projectInfo.imagePath}
                            alt={projectInfo.description}
                            layout="fill"
                            className="rounded"
                        />
                    </div>
                </div>
                <div className="w-4/12 h-5/6 rounded p-5 flex flex-col">
                    <div className="flex justify-center gap-x-2">
                        <Button style={{ background: '#33b362', color: 'white', textTransform: 'none' }} onClick={accessProject}>Acessar projeto</Button>
                        <Button onClick={() => window.open(projectInfo.githubLink, '_blank')} variant="contained" style={{ background: 'black', textTransform: 'none' }} startIcon={<GitHubIcon />}>
                            GitHub
                        </Button>
                    </div>
                    <div className="mt-5">
                        <b>Descrição do projeto:</b>
                        <p className="text-sm">{projectInfo.description}</p>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default ProjectModal;
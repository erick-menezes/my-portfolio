import type { NextPage } from 'next'

import { useEffect, useState } from 'react';

import { useForm } from "react-hook-form";
import { gql, useQuery } from '@apollo/client';

import Head from 'next/head'
import Image from 'next/image'

import Select from 'react-select';

import ProjectModal from '../components/ProjectModal';

import { ProjectType } from '../interfaces/HomePage';

import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';

const PROJECTS_QUERY = gql`
  {
    findAllProjects {
      name,
      technologies,
      githubLink,
      projectLink,
      imagePath,
      description
    }
  }
`;

const Home: NextPage = () => {
  const { register, handleSubmit, control, watch, formState: { errors } } = useForm();
  const [projectsFilter, setProjectsFilter] = useState<ProjectType[]>([]);
  const [projectInfo, setProjectInfo] = useState<ProjectType>({} as ProjectType);
  const [open, setOpen] = useState(false);

  const { data: projectData, loading, error } = useQuery(PROJECTS_QUERY);

  const technologies = [
    { label: 'React', value: 'react' },
    { label: 'HTML', value: 'html' },
    { label: 'CSS', value: 'css' },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'TypeScript', value: 'typescript' },
    { label: 'Next.js', value: 'nextjs' },
    { label: 'Node.js', value: 'nodejs' },
    { label: 'Python', value: 'python' },
    { label: 'Supabase', value: 'supabase' },
    { label: 'SkynexUI', value: 'skynexUi' },
    { label: 'Styled Components', value: 'styledComponents'},
    { label: 'Sass', value: 'sass' },
  ]

  const projects = [
    {
      id: 1,
      title: 'Aluracord',
      description: 'Aplicação de chat online inspirada no Discord, desenvolvido durante o evento Imersão React da Alura.',
      imagePath: '/assets/aluracord.png',
      technologies: ['react', 'javascript', 'html', 'css', 'nextjs', 'supabase', 'skynexUi'],
      githubUrl: "https://github.com/erick-menezes/aluracord-game-community",
      projectUrl: 'https://aluracord-game-community.vercel.app/',
    },
    {
      id: 2,
      title: 'AluraQuiz',
      description: 'Um protótipo de um jogo de quiz web, desenvolvido durante o evento Imersão Next da Alura.',
      imagePath: '/assets/aluraQuiz.png',
      technologies: ['react', 'javascript', 'html', 'css', 'nextjs', 'styledComponents'],
      githubUrl: "https://github.com/erick-menezes/imersao_nextjs",
      projectUrl: 'https://imersao-nextjs.vercel.app/',
    },
    {
      id: 3,
      title: 'Eriflix',
      description: 'Aplicação de visualização de vídeos do youtube, feito como projeto para o evento Imersão React da Alura.',
      imagePath: '/assets/eriflix.png',
      technologies: ['react', 'javascript', 'html', 'css', 'styledComponents', 'sass'],
      githubUrl: "https://github.com/erick-menezes/eriflix",
      projectUrl: 'https://eriflix.vercel.app/',
    }
  ]

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = () => {
    setProjectsFilter(projects);
  }
  
  const onSubmit = (data: any) => {
    const projectFilter = projects.filter(project => project.technologies.includes(data.value));
    setProjectsFilter(projectFilter);
  }

  const openModal = (projectInfo: ProjectType) => {
    setProjectInfo(projectInfo);
    setOpen(previousValue => !previousValue);
  }

  return (
    <div>
      <Head>
        <title>My Portfolio</title>
        <meta name="description" content="Portfolio page made by Erick" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {process.env.NEXT_PUBLIC_ENVIRONMENT === 'dev' && (
        <IconButton className="absolute top-2 right-2" aria-label="delete" size="large">
          <SettingsIcon fontSize="inherit" />
        </IconButton>
      )}

      <main className="w-full">
          <div className="flex items-center justify-around w-full">
              <Select 
                className="w-2/12 z-50 my-10"
                onChange={(e) => onSubmit(e)}
                options={technologies}
                placeholder="Selecione uma tecnologia"
              />
          </div>
        <div className="flex items-center justify-around w-full">
            {projectsFilter.map((project: ProjectType) => (
              <div key={project.id}>
                <div onClick={() => openModal(project)} className="group overflow-hidden relative flex flex-col items-center justify-around cursor-pointer">
                  <Image
                    className="z-0 select-none"
                    src={project.imagePath}
                    alt={project.description}
                    width={350}
                    height={200}
                  />
                  <div className="group-hover:animate-appear animate-disappear flex items-center justify-end bg-black/50 w-full h-10 pr-5 absolute bottom-0 z-10">
                    <p className="text-lg text-white">{project.title}</p>
                  </div>
                </div>
              </div>  
            ))}
        </div>
      </main>

      <footer 
        className="flex justify-center w-full align-center flex-1 py-8 border-t-[#eaeaea]-500 border absolute bottom-0"
      >
          Criado por Erick Menezes, 2022
      </footer>
      
      <ProjectModal open={open} setOpen={setOpen} projectInfo={projectInfo} />
    </div>
  )
}

export default Home

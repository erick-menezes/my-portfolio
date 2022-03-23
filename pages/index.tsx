import type { NextPage } from 'next'

import { useEffect, useState } from 'react';

import { useForm, Controller } from "react-hook-form";

import Head from 'next/head'
import Image from 'next/image'

import Select from 'react-select';

import Button from '@mui/material/Button';

interface ProjectType {
  id: number;
  title: string;
  description: string;
  imagePath: string;
  technologies: string[];
  url: string;
}

const Home: NextPage = () => {
  const { register, handleSubmit, control, watch, formState: { errors } } = useForm();
  const [projectsFilter, setProjectsFilter] = useState<ProjectType[]>([]);
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
      url: 'https://aluracord-game-community.vercel.app/',
    },
    {
      id: 2,
      title: 'AluraQuiz',
      description: 'Um protótipo de um jogo de quiz web, desenvolvido durante o evento Imersão Next da Alura.',
      imagePath: '/assets/aluraQuiz.png',
      technologies: ['react', 'javascript', 'html', 'css', 'nextjs', 'styledComponents'],
      url: 'https://imersao-nextjs.vercel.app/',
    },
    {
      id: 3,
      title: 'Eriflix',
      description: 'Aplicação de visualização de vídeos do youtube, feito como projeto para o evento Imersão React da Alura.',
      imagePath: '/assets/eriflix.png',
      technologies: ['react', 'javascript', 'html', 'css', 'styledComponents', 'sass'],
      url: 'https://eriflix.vercel.app/',
    }
  ]

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = () => {
    setProjectsFilter(projects);
  }
  
  const onSubmit = (data: any) => {
    console.log('data', data);
    const projectFilter = projects.filter(project => project.technologies.includes(data.technology));
    setProjectsFilter(projectFilter);
  }

  return (
    <div>
      <Head>
        <title>My Portfolio</title>
        <meta name="description" content="Portfolio page made by Erick" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full ">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-around py-8">
          <div className="flex items-center justify-around w-full">
            <Controller
              control={control}
              name="technology"
              render={({ 
                field: { onChange },
              }) => (
                <Select 
                  className="w-52"
                  onChange={(e) => onChange(e?.value)}
                  options={technologies}
                  defaultValue={technologies[0]}
                />
              )}
            />
            {/* <Controller
              control={control}
              name="letters"
              render={({ 
                field: { onChange },
              }) => (
                <Select
                  className="w-52"
                  onChange={(e) => onChange(e?.label)}
                  options={['a', 'b', 'c', 'd', 'e', 'f'].map(i => ({value: i, label: i}))}
                />
              )}
            /> */}
          </div>
          <Button
            type="submit"
            className="bg-blue-500 mt-8"
            variant="contained"
          >
            Procurar
          </Button>
        </form>
        <div className="flex items-center justify-around w-full">
            {projectsFilter.map((project: ProjectType) => (
              <div key={project.id}>
                <div className="relative flex flex-col items-center justify-around">
                  <Image
                    className="z-0 select-none"
                    src={project.imagePath}
                    alt={project.description}
                    width={350}
                    height={200}
                  />
                  <div className="absolute bottom-3 right-5 z-10">
                    <p>Teste</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </main>

      <footer 
        className="flex justify-center w-full align-center flex-1 py-8 border-t-[#eaeaea]-500 border absolute bottom-0"
      >
        <a
          className="flex justify-center align-center grow"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home

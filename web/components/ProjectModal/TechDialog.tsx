import { useForm } from "react-hook-form";
import { OperationVariables, useMutation } from "@apollo/client";

import { Modal } from "@mui/material";
import { Button } from "@mui/material";

import SendIcon from '@mui/icons-material/Send';

import { createTechnology } from '../../graphql/mutations';
import { getAllTechnologies } from '../../graphql/queries';

import { QueryResult } from '@apollo/client';

interface TechDialogType {
    open: boolean;
    setOpen: (open: boolean) => void;
    technologyQuery: QueryResult<any, OperationVariables>;
}

function TechDialog({ open, setOpen, technologyQuery }: TechDialogType) {
    const { register, handleSubmit } = useForm();
    const [insertTechnology] = useMutation(createTechnology);

    const handleCloseModal = () => {
        setOpen(false);
    }

    const onSubmit = async (model: any) => {
        insertTechnology({ 
            variables: { 
                data: model 
            }, 
            notifyOnNetworkStatusChange: true, 
            refetchQueries: [{ query: getAllTechnologies }]
        });
        
        handleCloseModal();
    }

    return (
        <Modal
            open={open}
            onClose={handleCloseModal}
            className="flex items-center justify-center"
        >
            <div className="flex flex-col gap-y-5 bg-white w-4/12 rounded outline-0 p-5">
                <h1 className="text-2xl font-bold">Adicionar nova tecnologia</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="name">Nome:</label>
                        <input className="w-full border rounded p-2" type="text" { ...register("name", { required: true }) } />
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="name">Nome em CC (Camel Case):</label>
                        <input className="w-full border rounded p-2" type="text" { ...register("camelName", { required: true }) } />
                    </div>
                    <Button type="submit" variant="contained" className="bg-[#01579b] hover:bg-[#0168B7] font-bold flex gap-x-2">
                        <SendIcon />
                        Enviar
                    </Button>
                </form>
            </div>
        </Modal>
    );
}

export default TechDialog;
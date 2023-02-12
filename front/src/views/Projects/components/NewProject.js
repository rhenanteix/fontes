import React, { useState } from 'react';
import {
    Flex,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer
} from '@chakra-ui/react';
import Formulario from '../../../components/Form';
import moment from 'moment/moment';
import { formataMoeda } from '../../../utils';
import { projectService } from '../../../services/projects.service';

const ProjectModalForm = ({ close, setRefresh, refresh, toast, data }) => {
    console.log(data);

    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState(data ? data.title : '');
    const [description, setDescription] = useState(data ? data.description : '');
    const [zip_code, setZipCode] = useState(data ? data.zip_code : '');
    const [cost, setCost] = useState(data ? formataMoeda(data.cost) : '0,00');
    const [deadline, setDeadline] = useState(moment(data ? data.deadline.slice(0, 10) : null).format("YYYY-MM-DD"));

    const createProject = async () => {
        setLoading(true);
        await projectService.set({ title, description, zip_code, cost: parseFloat(cost), deadline, done: false },
            () => {
                toast({
                    title: "Sucesso!",
                    description: "Projeto foi corretamente criado",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                    variant: "left-accent"
                });
                setLoading(false);
                setRefresh(!refresh);
                close();
            },
            (erro) => {
                // console.log(erro);
                toast({
                    title: "Erro!",
                    description: erro,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                    variant: "left-accent"
                });
                setLoading(false);
                close();
            }
        )
    }

    const updateProject = async () => {
        setLoading(true);
        await projectService.update(data.id, { title, description, zip_code, cost: parseFloat(cost), deadline, done: false },
            () => {
                toast({
                    title: "Sucesso!",
                    description: "Projeto foi corretamente atualizado",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                    variant: "left-accent"
                });
                setLoading(false);
                setRefresh(!refresh);
                close();
            },
            (erro) => {
                toast({
                    title: "Erro!",
                    description: erro,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                    variant: "left-accent"
                });
                setLoading(false);
                close();
            }
        )
    }

    return (
        <Formulario
            allowButton={true}
            button={[{
                name: data !== null ? "Atualizar" : "Salvar", loading, onClick: data === null ? () => createProject() : () => updateProject()
                , colorScheme: 'teal', variant: 'ghost'
            }]}
            data={[
                {
                    label: "Título", variant: 'auth', disable: loading, type: "text", size: 'lg',
                    value: title, onChange: event => setTitle(event.target.value)
                },
                {
                    label: "Descrição", variant: 'auth', disable: loading, type: "text", size: 'lg',
                    value: description, onChange: event => setDescription(event.target.value)
                },
                {
                    label: "Código Postal", variant: 'auth', disable: loading, type: "text", size: 'lg',
                    value: zip_code, onChange: event => setZipCode(event.target.value)
                },
                {
                    label: "Custo R$", variant: 'auth', disable: loading, type: "text", size: 'lg',
                    value: cost, onChange: event => setCost(formataMoeda(event.target.value))
                },
                {
                    label: "Deadline", variant: 'd', disable: loading, type: "date", size: 'lg',
                    value: deadline, onChange: event => setDeadline(event.target.value)
                },
            ]}
        />
    )
}

export default ProjectModalForm;
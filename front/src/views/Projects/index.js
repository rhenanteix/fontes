import React, { useEffect, useState } from "react";
import {
    Tooltip, Button, Text,
    useToast, IconButton,
    Tr,
    Th,
} from "@chakra-ui/react";
import Header from "../../components/Header";
import { checkAuth } from "../../root";
import List from "../../components/List";
import './style.css';
import { MdEdit, MdDelete, MdCheckCircle, MdAdd, MdSearch } from 'react-icons/md';
import { projectService } from "../../services/projects.service";
import ProjectModalForm from "./components/NewProject";
import moment from "moment";
import { formataMoeda } from "../../utils";
import Alert from "../../components/Alert";
import ModalComponent from "../../components/Modal";
import OpenProject from "./components/OpenProject";

const returnRightChildren = (type, data, onCloseModal, setRefresh, refresh, toaster) => {
    return {
        "new": <ProjectModalForm data={data} close={onCloseModal} setRefresh={setRefresh} refresh={refresh} toast={toaster} />,
        "open": <OpenProject data={data} />
    }[type ? type : null]
}

const returnTitle = (type, data) => {
    return {
        "new": data ? "Editar Projeto" : "Novo Projeto",
        "open": "Visualizar Projeto"
    }[type ? type : null];
}


function Projects() {
    checkAuth();
    const toaster = useToast();
    const [alert, setAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [modal, setModal] = useState(false);
    const [data, setData] = useState(null);
    const [type, setType] = useState(null);
    const [projects, setProjects] = useState([]);
    const actions = [
        {
            label: "Editar",
            icon: <MdEdit size={20} />,
            onClick: (element) => { setModal(true); setType("new"); setData(element); },
            color: 'teal',
        },
        {
            label: "Deletar",
            icon: <MdDelete size={20} />,
            onClick: (element) => { setAlert(true); setData(element) },
            color: 'red',
        },
        {
            label: "Finalizar",
            icon: <MdCheckCircle size={20} />,
            onClick: (element) => { finishProject(element.id) },
            color: 'green',
        },
        {
            label: "Visualizar",
            icon: <MdSearch size={20} />,
            onClick: (element) => { getProjectData(element.id) },
            color: 'blackAlpha',
        },
    ];

    const showToast = (title, description, status) => {
        toaster({
            title,
            description,
            status,
            duration: 9000,
            isClosable: true,
            variant: "left-accent"
        });
    }
    const onCloseModal = () => { setModal(false); setData(null); setType(null); }
    const onCloseAlert = () => { setAlert(false); }

    const getProjectData = async id => {
        await projectService.getWithZipCode(id, response => { setData(response.data); setType("open"); setModal(true) }, erro => console.log(erro));
    }

    const getProjects = async () => {
        await projectService.get(response => setProjects(response.data.rows), erro => console.log(erro));
    }

    useEffect(() => {
        getProjects();
    }, [refresh]);


    const finishProject = async (id) => {
        setLoading(true);
        await projectService.makeDone(id, () => {
            showToast("Sucesso!", "Projeto marcado como finalizado", "success");
            setLoading(false);
            setRefresh(!refresh);
        }, (erro) => {
            showToast("Erro!", erro, "error");
            setLoading(false);
        })
    }

    const deleteProject = async () => {
        setAlert(false);
        await projectService.delete(data.id, () => {
            showToast("Sucesso!", "Projeto deletado.", "success");
            setLoading(false);
            setRefresh(!refresh);
        }, (erro) => {
            showToast("Erro!", erro, "error");
            setLoading(false);
        })
    }

    return (
        <div className="container">
            <Header />
            <div className="content-title">
                <Text className="title">MEUS PROJETOS</Text>
                <Button colorScheme={'twitter'} disabled={loading} onClick={() => { setData(null); setType("new"); setModal(true) }}
                    leftIcon={<MdAdd />}>Novo Projeto</Button>
            </div>
            <div className="content">
                <List
                    label={projects}
                    dados={() => projects.map((element, index) => {
                        return (
                            <Tr>
                                <Th color={element.done ? 'green.400' : 'black'}>{element.title}</Th>
                                <Th color={element.done ? 'green.400' : 'black'}>{element.description}</Th>
                                <Th color={element.done ? 'green.400' : 'black'}>R${formataMoeda(element.cost)}</Th>
                                <Th color={element.done ? 'green.400' : 'black'}>{element.zip_code}</Th>
                                <Th color={element.done ? 'green.400' : 'black'}>{moment(element.deadline.slice(0, 10)).format("DD/MM/YYYY")}</Th>
                                <Th color={element.done ? 'green.400' : 'black'}>{element.done ? "Finalizado" : "Em andamento"}</Th>
                                <Th width={'5%'}>{actions.map((item, index) => {
                                    return (
                                        <Tooltip hasArrow label={item.label} shouldWrapChildren>
                                            <IconButton isLoading={loading} disabled={item.label === "Finalizar" && element.done}
                                                icon={item.icon} colorScheme={item.color}
                                                margin={'1px'} onClick={() => item.onClick(element)}></IconButton>
                                        </Tooltip>
                                    )
                                })}</Th>
                            </Tr>
                        )
                    })}

                    headers={[
                        "Título", "Descrição", "Custo", "CEP", "Deadline", "Finalizado",
                    ]}

                />
            </div>
            <ModalComponent open={modal} onCloseModal={onCloseModal} title={returnTitle(type, data)}
                children={returnRightChildren(type, data, onCloseModal, setRefresh, refresh, toaster)} />
            <Alert open={alert} onCloseAlert={onCloseAlert} title="Deletar Projeto"
                description="Essa ação não poderá ser desfeita. Deseja continuar?"
                buttonName="Continuar" onClickButton={() => deleteProject()} />

        </div>
    );
}

export default Projects;

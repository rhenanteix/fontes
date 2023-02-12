import React from 'react';
import { Text } from '@chakra-ui/react';
import "../style.css"
import { formataMoeda } from '../../../utils';
import moment from 'moment';

const OpenProject = ({ data }) => {
    return (
        <div>
            <div>
                <Text className="title">Dados do Projeto</Text>
                <div className='open-content'>
                    <Text fontWeight={'bold'}>Título: </Text>
                    <Text>{data.title}</Text>
                </div>
                <div className="open-content">
                    <Text fontWeight={'bold'}>Descrição: </Text>
                    <Text>{data.description}</Text>
                </div>
                <div className="open-content">
                    <Text fontWeight={'bold'}>Custo: </Text>
                    <Text>R${formataMoeda(data.cost)}</Text>
                </div>
                <div className="open-content">
                    <Text fontWeight={'bold'}>Deadline: </Text>
                    <Text>{moment(data.deadline.slice(0, 10)).format("DD/MM/YYYY")}</Text>
                </div>
                <div className="open-content">
                    <Text fontWeight={'bold'}>Status: </Text>
                    <Text>{data.done ? "Finalizado" : "Em andamento"}</Text>
                </div>
            </div>
            <div>
                <Text className="title">Dados do Endereço</Text>
                <div className="open-content">
                    <Text fontWeight={'bold'}>CEP: </Text>
                    <Text>{data.zip_code.cep}</Text>
                </div>
                <div className="open-content">
                    <Text fontWeight={'bold'}>Logradouro: </Text>
                    <Text>{data.zip_code.logradouro}</Text>
                </div>
                <div className="open-content">
                    <Text fontWeight={'bold'}>Cidade: </Text>
                    <Text>{data.zip_code.localidade}</Text>
                </div>
                <div className="open-content">
                    <Text fontWeight={'bold'}>Bairro: </Text>
                    <Text>{data.zip_code.bairro}</Text>
                </div>
                <div className="open-content">
                    <Text fontWeight={'bold'}>UF: </Text>
                    <Text>{data.zip_code.uf}</Text>
                </div>
            </div>
        </div>

    );
}

export default OpenProject;
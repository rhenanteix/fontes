import React from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    TableCaption,
    TableContainer
} from '@chakra-ui/react';

const List = ({ headers, actions, dados, label }) => {
    return (
        <TableContainer w="100%" border="1px" borderRadius={7}>
            <Table variant='simple'>
                <TableCaption color={"red"}>{label.length > 0 ? "" : "Nenhum projeto encontrado"}</TableCaption>
                <Thead>
                    <Tr>
                        {headers.map((element, index) => <Th>{element}</Th>)}
                    </Tr>
                </Thead>
                <Tbody>
                    {dados()}
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default List;
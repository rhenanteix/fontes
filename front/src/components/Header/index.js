
import {
    Box,
    Tooltip,
    Text
} from "@chakra-ui/react";
import { MdExitToApp } from 'react-icons/md';
import { username } from '../../root';
import './style.css';

export default function Header() {

    const handleExit = () => { sessionStorage.clear(); window.location.href = "/" };


    return (
        <Box bg='#006666' w='100%' p={4} color='white' display={"flex"} flexDirection={"row"} justifyContent="space-between" alignItems={"center"}>
            <div className="data-right">
                <Text className="username">{username} </Text>
                <Tooltip hasArrow label="Logout" shouldWrapChildren>
                    <MdExitToApp onClick={handleExit} className="exit" size={20} />
                </Tooltip>
            </div>

        </Box >
    )
}
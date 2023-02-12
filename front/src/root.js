// import
import React from 'react';
import Projects from "./views/Projects";
import { MdHome as HomeIcon } from 'react-icons/md'

export const auth = sessionStorage.getItem("@Fontes/auth");
export const username = sessionStorage.getItem("@Fontes/username");
export const checkAuth = () => { if (!auth) { window.location.href = "/" } }

var routes = [
    {
        path: "/projects",
        name: "Projetos",
        icon: <HomeIcon />,
        component: Projects,
        layout: "/admin",
    },
];

export default routes;

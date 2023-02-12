import React from 'react';
import { Route, Router } from 'react-router-dom';
import Projects from '../views/Projects';

export default function AdminRoutes() {
    return (
        <Router peth="peth">
            <Route key="0" path="/" exact component={Projects}></Route>    
        </Router >
    );
}

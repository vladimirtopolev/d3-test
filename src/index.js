import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Switch, Route, BrowserRouter, Link } from 'react-router-dom';

import App from './App';
import Catalog from './components/catalog/Catalog';
import Home from './components/home/Home'


ReactDOM.render((
    <BrowserRouter>
        <header>
            <Link to="/catalog">Каталог</Link>
            <Link to="/workspace">Рабочая область</Link>
        </header>
        <Switch>
            <Route path="/catalog" exact component={Catalog}/>
            <Route path="/workspace" exact component={App}/>
            <Route path="/" exact component={Home}/>
        </Switch>
    </BrowserRouter>),
    document.getElementById('root'));



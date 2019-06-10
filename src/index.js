import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Switch, Route, BrowserRouter, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import configStore from './configStore';

import DrawCharacteristics from './components/tools/drawcharacteristics/DrawCharacteristics';
import Home from './components/home/Home';


const store = configStore();

ReactDOM.render((
        <Provider store={store}>
            <BrowserRouter>
                <header>
                    <Link to="/drawcharacteristics">Построение характеристик</Link>
                </header>
                <Switch>
                    <Route path='/drawcharacteristics' component={DrawCharacteristics}/>
                    <Route path="/" exact component={Home}/>
                </Switch>
            </BrowserRouter>
        </Provider>
    ), document.getElementById('root'));



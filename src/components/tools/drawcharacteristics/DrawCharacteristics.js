import { Route, Switch, Link } from "react-router-dom";
import CatalogSetTabs from "./catalog/CatalogSetTabs";
import React from "react";

export default () => {
    return (
        <div>
            <div>
                <Link to="/drawcharacteristics/catalog">Каталог</Link>
                <Link to="/drawcharacteristics/workspace">Рабочая область</Link>
            </div>
            <Switch>
                <Route path="/drawcharacteristics/catalog" component={CatalogSetTabs}/>,
            </Switch>
        </div>
    );
}

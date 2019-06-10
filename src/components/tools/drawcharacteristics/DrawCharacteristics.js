import { Route, Switch, Link } from "react-router-dom";
import CatalogSetTabs from "./catalog/CatalogSetTabs";
import WorkspaceContainer from "./workspace/WorkspaceContainer";
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
                <Route path="/drawcharacteristics/workspace" component={WorkspaceContainer}/>
            </Switch>
        </div>
    );
}

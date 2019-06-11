import React from 'react';
import cn from 'classnames';
import { CHARACTERISTIC_TYPES } from '../constants';

import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import CatalogTab from './CatalogTab';

const { FUSE, SWITCHER } = CHARACTERISTIC_TYPES;

export default class CatalogSetTabs extends React.Component {
    state = {
        activeTab: 'FUSE'
    };

    toggleTab = (tab) => {
        this.state.activeTab !== tab && this.setState({ activeTab: tab });
    };

    render() {
        const { activeTab } = this.state;
        return (
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={cn({ active: activeTab === FUSE })}
                            onClick={() => {
                                this.toggleTab(FUSE);
                            }}>
                            Предохранители
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={cn({ active: activeTab === SWITCHER })}
                            onClick={() => {
                                this.toggleTab(SWITCHER);
                            }}>
                            Автоматы
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId={FUSE}>
                        <CatalogTab type={FUSE}/>
                    </TabPane>
                    <TabPane tabId={SWITCHER}>
                        <CatalogTab type={SWITCHER}/>
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}

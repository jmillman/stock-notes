import React, { useState, useContext } from 'react';
import GlobalContext from '../store/GlobalContext';
import ViewsPage from './ViewsPage';
import TasksPage from './TasksPage';
import SettingsPage from './SettingsPage';
import LoginUserForm from './LoginUserForm';

import {
    Segment,
    Menu,
    Grid,
  } from 'semantic-ui-react';

const tabs = {
    VIEWS_PAGE: 'View',
    COMPLETE_TASKS: 'Do',
    SETTINGS_PAGE: 'Settings',
    LOGIN: 'Login',
};

function Page1() {
    const [state , ,] = useContext(GlobalContext);
    const [ selectedTab, setSelectedTab ] = useState(tabs.LOGIN);

    function getTab(tabName) {
        return(<Menu.Item key={tabName} name={tabName} active={selectedTab === tabName} onClick={()=> setSelectedTab(tabName)} />);
    }

    function getContent() {
        switch(selectedTab) {
            case tabs.VIEWS_PAGE:
                return(<ViewsPage />);
            case tabs.COMPLETE_TASKS:
                return(<TasksPage />);
            case tabs.SETTINGS_PAGE:
                return(<SettingsPage />);
            case tabs.LOGIN:
                return(<LoginUserForm />);

            default:
                throw new Error('Component Not Found');
        }        
    }

    function getLoggedInName() {
        if (state.loggedInUser) {
            return `Hi ${state.loggedInUser.name}!`;
        }
        return 'Please Login';
    }

    function getMenu() {
        const retMenu = [];
        if (state.loggedInUser) {
            retMenu.push(getTab(tabs.COMPLETE_TASKS));
            retMenu.push(getTab(tabs.VIEWS_PAGE));
            retMenu.push(getTab(tabs.SETTINGS_PAGE));
        }
        return retMenu;
    }

    return(
        <>
            <Grid>
                <Grid.Column width={4}>
                <Menu fluid vertical tabular>
                    <Menu.Item key={tabs.LOGIN} name={getLoggedInName()} active={selectedTab === tabs.LOGIN} onClick={()=> setSelectedTab(tabs.LOGIN)} />
                    {getMenu()}
                </Menu>
                </Grid.Column>
                <Grid.Column stretched width={12}>
                <Segment>
                    {getContent()}
                </Segment>
                </Grid.Column>
            </Grid>


        </>
    );
}

export default Page1;
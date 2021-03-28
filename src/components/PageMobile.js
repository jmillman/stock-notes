import React, { useState, useContext, useEffect } from 'react';
import GlobalContext from '../store/GlobalContext';
import { Icon, Menu } from 'semantic-ui-react'
import ViewsPage from './ViewsPage';
import TasksPage from './TasksPage';
import SettingsPage from './SettingsPage';
import LoginUserForm from './LoginUserForm';
import StockNotesPage from './stocks/StockNotesPage';

const tabs = {
    VIEWS_PAGE: 'View Task History',
    COMPLETE_TASKS: 'Do Tasks',
    SETTINGS_PAGE: 'Settings',
    LOGIN: 'Login',
    STOCK_NOTES: 'Stonks'
};


function PageMobile() {
    const [state , ,] = useContext(GlobalContext);

  const [ selectedTab, setSelectedTab ] = useState(tabs.STOCK_NOTES);

  useEffect(() => {
    if(state.loggedInUser) {
        setSelectedTab(tabs.STOCK_NOTES);
    }
  }, [state.loggedInUser]);  

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
        case tabs.STOCK_NOTES:
            return(<StockNotesPage />);

        default:
            throw new Error('Component Not Found');
    }        
}
function getLoggedInName() {
    if (state.loggedInUser) {
        return `${state.loggedInUser.name[0]}`;
    }
    return 'Please Login';
}

function getMenu() {
    if (state.loggedInUser) {
        return (
            <>
            <Menu.Item name={tabs.SETTINGS_PAGE}
                onClick={()=> setSelectedTab(tabs.SETTINGS_PAGE)} 
            //   onClick={handleShowClick}
            >
                <Icon name='setting' />
            </Menu.Item>
            <Menu.Item
                name={tabs.COMPLETE_TASKS}
                onClick={()=> setSelectedTab(tabs.COMPLETE_TASKS)} 
            />
            <Menu.Item
                name={tabs.VIEWS_PAGE}
                onClick={()=> setSelectedTab(tabs.VIEWS_PAGE)} 
            />
            <Menu.Item
                name={tabs.STOCK_NOTES}
                onClick={()=> setSelectedTab(tabs.STOCK_NOTES)} 
            />
            </>
        );
    }
    return null;
}

    return(
      <>
        <Menu size='huge'>
            {getMenu()}
            <Menu.Item position='right' key={tabs.LOGIN} name={getLoggedInName()} active={selectedTab === tabs.LOGIN} onClick={()=> setSelectedTab(tabs.LOGIN)} />
        </Menu>
        {getContent()}
      </>
    )
}


export default PageMobile;
import React from 'react';
import CreateTaskList from './CreateTaskList';
import ItemTypePage from './ItemTypePage';
import CreateViewsPage from './CreateViewsPage';
import CreateUsersPage from './CreateUsersPage';

import {
    Tab,
  } from 'semantic-ui-react';


function SettingsPage() {
    const panes = [
        { menuItem: 'Manage Task Lists', render: () => <Tab.Pane><CreateTaskList /></Tab.Pane> },
        { menuItem: 'Item Types', render: () => <Tab.Pane><ItemTypePage /></Tab.Pane> },
        { menuItem: 'Manage Views', render: () => <Tab.Pane><CreateViewsPage /></Tab.Pane> },
        { menuItem: 'Create Users', render: () => <Tab.Pane><CreateUsersPage /></Tab.Pane> },
      ];
    
    return (
        <Tab panes={panes} />
    );
}

export default SettingsPage;

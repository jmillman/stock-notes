import React, { useContext } from 'react';
import GlobalContext from '../store/GlobalContext';
import ItemsArea from './ItemsArea';


import {
    Tab,
  } from 'semantic-ui-react';


function ViewsPage() {
    const [state, ,] = useContext(GlobalContext);
    const panes = [
        { menuItem: 'All Items', render: () => <Tab.Pane><ItemsArea viewId={''} title={'All Tasks'} /></Tab.Pane> },
      ];
    state.views.forEach(view => {
        panes.push({ menuItem: `${view.value}`, render: () => <Tab.Pane key={view.id}><ItemsArea viewId={view.id} /></Tab.Pane> });        
    });
    return (
        <Tab panes={panes} />
    );
}

export default ViewsPage;

import React, { useContext, useState } from 'react';
import GlobalContext from '../store/GlobalContext';
import AddItem from './AddItem';
import PropTypes from 'prop-types';


import {
    Grid,
  } from 'semantic-ui-react';

  
function AddMultiple(props) {
    const [state , , ] = useContext(GlobalContext);
    const [closedAddIds, setAddIds] = useState([]);

    // keep and array of the closedItems, and if they are closed, don't render
    function closeItem(itemId) {
        setAddIds(closedAddIds.concat(itemId));
    }
    return (
        <Grid columns='equal' padded>
            {Object.keys(props.itemTypes).map((itemTypeId) => {
                const itemType = state.itemTypes[itemTypeId];
                if(itemType && !closedAddIds.includes(itemType.id)) {
                    return(<AddItem key={itemType.id} itemType={itemType} callback={closeItem} date={props.date}/>);
                }
                return null;
            })}
        </Grid>
    );
}

AddMultiple.propTypes = {
    itemTypes: PropTypes.any.isRequired,
    date: PropTypes.string.isRequired,
}

export default AddMultiple;
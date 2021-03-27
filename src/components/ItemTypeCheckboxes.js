import React, { useContext } from 'react';
import GlobalContext from '../store/GlobalContext';
import PropTypes from 'prop-types';

import {
    Checkbox,
    Segment,
  } from 'semantic-ui-react';

function ItemTypeCheckboxes(props) {
    const [state , ,] = useContext(GlobalContext);

    function handleClickCheckbox(id, state) {
        let retValues = (state === true) ?
            props.selectedItems.concat(id)
            :
            props.selectedItems.filter((value)=>value !== id)
            ;

        props.callback(retValues);
    }

    return(
        <>
            {Object.keys(state.itemTypes).map((itemTypeId) => {
                const itemType = state.itemTypes[itemTypeId];
                return(
                    <Segment key={itemType.id}>
                        <Checkbox                            
                            label={itemType.name}
                            onClick={(e, data)=>handleClickCheckbox(itemType.id, data.checked)}
                            checked={props.selectedItems.includes(itemType.id)}
                            />
                    </Segment>
                );
            })}
        </>
    );
}

ItemTypeCheckboxes.propTypes = {
    callback: PropTypes.func.isRequired,
    selectedItems: PropTypes.array.isRequired,
};

export default ItemTypeCheckboxes;
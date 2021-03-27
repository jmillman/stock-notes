import React, { useContext } from 'react';
import GlobalContext from '../store/GlobalContext';
// import { debug } from '../utils';
import {
    Icon,
    Button,
    Grid,
  } from 'semantic-ui-react';

function CompletedItem(props) {
    const [state, , api] = useContext(GlobalContext);
    function handleClickDelete(id) {
        api.deleteItemFromApp(id);
    }

    function getItemTypeName(item) {
        if(state.itemTypes) {
            const itemTypeName = state.itemTypes[item.typeId];
            return itemTypeName ? itemTypeName.name: item.typeId;
        }
        return item.typeId;
    }

    function getItemDisplay(item) {
        return (
            <Grid.Row key={`ITEM_${item.id}`}>
                <Grid.Column>{getItemTypeName(item)}</Grid.Column>
                <Grid.Column>{item.value ? item.value : null}</Grid.Column>
                <Grid.Column>
                    <Button
                        icon
                        onClick={() => handleClickDelete(item.id)}
                        floated='right'
                    >
                        <Icon
                            color='red'
                            name='cancel'
                            key={item.i}
                        />   
                    </Button>                    
                </Grid.Column>                        
            </Grid.Row>
        );
    }

    const item = props.item;
    return(
        <>
            {getItemDisplay(item)}
        </>
    );
}

export default CompletedItem;
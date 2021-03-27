import React, { useContext, useState } from 'react';
import GlobalContext from '../store/GlobalContext';
import PropTypes from 'prop-types';

import { ItemDataTypes } from '../templates/itemTypes';

import {
    Button,
    Input,
    Select,
    Label,
    Grid,
  } from 'semantic-ui-react';

    // I have two different types of inputs, one you can type in, which is good for long lists
  const useTypingSelectionBox = false;

function AddItem(props) {
    const [state , , api] = useContext(GlobalContext);
    const [valueToAdd, setValueToAdd] = useState('');
    const [saved, setSaved] = useState(false);
    const [addedId, setAddedId] = useState(null);
    const [selectedItemType, setSelectedItemType] = useState(props.itemType ? props.itemType.id : '');

    async function saveCallback(results) {
        if(results.id) {
            setAddedId(results.id);
            setSaved(true);
        }
        // if (props.callback) {
        //     props.callback(selectedItemType);
        // } else {
        //     setSelectedItemType('');
        //     setValueToAdd('');
        // }
    }

    function handleClickCreate() {
        api.addItemFromApp(valueToAdd, selectedItemType, props.date, saveCallback);
    }

    function handleClickDelete() {
        api.deleteItemFromApp(addedId);
        setValueToAdd('');
        setSaved(false);
        setAddedId(null);
    }

    function itemFormChooser() {
        const itemTypes = state.itemTypes;
        const itemTypeSelected = itemTypes[selectedItemType];
        const returnArray = [];
        if(itemTypeSelected) {
            switch(itemTypeSelected.dataType_1) {
                case ItemDataTypes.NUMBER:
                    returnArray.push (
                        <Input
                            fluid
                            key={'EventType'}
                            placeholder={itemTypeSelected.dataName_1}
                            value={valueToAdd}
                            onChange={(e) => setValueToAdd(e.target.value)}
                        />
                    );
                    break;
                case ItemDataTypes.EVENT:
                default:
                        break;
            }
        }
        else if (selectedItemType !== '') {
            returnArray.push(
                <Label color='red' key='addNotFound'>
                    Item Type Not Found
                </Label>
            );
        }

    return returnArray;
    }

    function getSelectTypeChooser() {
        const itemTypes = state.itemTypes;
        if( useTypingSelectionBox ) {
            return (
                <>
                    <Input
                        list='itemTypesList'
                        placeholder='Select a type to track...'
                        onChange={(e)=>{setSelectedItemType(e.target.value)}}
                    /> 
                    <datalist id='itemTypesList'>
                    {itemTypes.map((itemType) => {
                        return (
                            <option
                                value={itemType.name}
                                key={itemType.id}
                            />
                        );
                    })}
                    </datalist>
                </> 
            );
        }

        const pulldownOptions = Object.keys(itemTypes).map((itemTypeId) => {
            return {
                key: itemTypes[itemTypeId].name,
                text: itemTypes[itemTypeId].name,
                value: itemTypes[itemTypeId].id,
            };
        });

        return (
                <Select
                    fluid
                    placeholder='Select a type to track...'
                    options={pulldownOptions}
                    value={selectedItemType}
                    onChange={(e, data)=>{
                        setSelectedItemType(data.value)
                    }}
                />
        );


    }

    return (
        <>
            
                <Grid.Row key={`AddItem-${props.itemType.id}`}>
                    <Grid.Column width={7}>
                        {getSelectTypeChooser()}
                    </Grid.Column>
                    <Grid.Column width={5}>
                        {itemFormChooser()}
                    </Grid.Column>
                    <Grid.Column width={1}>
                    {
                        (saved === false) ?
                            <Button positive onClick={handleClickCreate}>Add</Button>
                        :
                            <Button negative onClick={handleClickDelete}>Delete</Button>
                        }
                            </Grid.Column>
                </Grid.Row>
        </>
    );
}

AddItem.propTypes = {
    itemType: PropTypes.object.isRequired,
    callback: PropTypes.func.isRequired,
    date: PropTypes.string.isRequired,
}

export default AddItem;
  
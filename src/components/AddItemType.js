import React, { useContext, useState, useRef } from 'react';
import GlobalContext from '../store/GlobalContext';

import { ItemDataTypes } from '../templates/itemTypes';

import {
    Button,
    Form,
    Select,
    Message,
  } from 'semantic-ui-react';

function AddItemType(props) {
    const [, , api] = useContext(GlobalContext);
    const [name, setName] = useState('');
    const [dataType_1, setSelectedTypeDataType_1] = useState(props.itemType ? props.itemType.name : '');
    const [dataName_1, setDataName_1] = useState('');
    const [formStatus, setFormStatus] = useState(null);
    const nameRef = useRef(null);

    const pulldownOptions = Object.keys(ItemDataTypes).map((dataType) => {
        return {
            key: dataType,
            text: dataType,
            value: dataType,
        };
    });

    function resetForm() {
        setFormStatus(null);
        setName('');
        setDataName_1('');
        setSelectedTypeDataType_1('');
        nameRef.current.focus();
    }

    async function handleClickCancel() {
        // setSelectedTypeDataType_1('');
        // setName('');
    }

    async function saveCallback(result) {
        if(result.status === 'success') {
            setFormStatus({status: 'success', message: 'Item Type Saved'});
            setTimeout(resetForm, 1000);
        }
        else {
            // const obj = {status: result.status, message: result.message}
            setFormStatus({status: result.status, message: result.message});
        }
    }

    async function handleClickCreate() {
        api.addItemTypeFromApp(name, dataType_1, dataName_1, null, null, saveCallback);
    }

    function getDataNameField() {
        const returnArray = [];
        if(dataType_1) {
            switch(dataType_1) {
                case ItemDataTypes.NUMBER:
                    returnArray.push (
                        <Form.Field>
                            <input
                                placeholder='Enter a name for the data type (ex lbs, miles, # of pushups)...'
                                value={dataName_1}
                                onChange={(e) => setDataName_1(e.target.value)}
                            />
                        </Form.Field>
                        );
                    break;
                case ItemDataTypes.EVENT:
                default:
                        break;
            }
        }
    return returnArray;
    }    
    function getDataTypeChooser() {

        return (
            <>
                <Form.Field>
                    <input
                        placeholder='Enter the name of something to track...'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        ref={nameRef}
                        autoFocus
                    />
                </Form.Field>
                <Form.Field>
                    <Select
                        placeholder='Select a type to track...'
                        options={pulldownOptions}
                        value={dataType_1}
                        onChange={(e, data)=>{
                            setSelectedTypeDataType_1(data.value)
                        }}
                    />
                </Form.Field>
                {getDataNameField()}
                {formStatus && formStatus.status ? 
                    <Message
                    color={formStatus && formStatus.status === 'error' ? 'red' : 'green'}
                    content={formStatus && formStatus.message}
                    />
                : null}
                <Form.Field>
                    <Button positive onClick={handleClickCreate}>Add</Button>
                    <Button negative onClick={handleClickCancel}>Cancel</Button>
                </Form.Field>
            </>
        );
    }

    return (
        <Form error={formStatus && formStatus.status === "error"}>
            {getDataTypeChooser()}
        </Form>
    );
}

export default AddItemType;
  
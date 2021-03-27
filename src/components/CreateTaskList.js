import React, { useState, useContext } from 'react';
import GlobalContext from '../store/GlobalContext';
import SelectList from './SelectList';


import {
    Message,
    Segment,
    Checkbox,
    Form,
    Button
  } from 'semantic-ui-react';
  
function CreateTaskList() {
    const [state , , api] = useContext(GlobalContext);
    const [checkboxValues, setCheckboxValues] = useState([]);
    const [name, setName] = useState([]);
    const [taskListToEditId, setTaskListToEditId] = useState('');
    const [formStatus, setFormStatus] = useState(null);

    function handleClickCheckbox(id, state) {
        if(state === true) {
            setCheckboxValues(checkboxValues.concat(id));
        }
        else{
            setCheckboxValues(checkboxValues.filter((value)=>value !== id));
        }
    }
    function resetForm() {
        setCheckboxValues([]);
        setName('')
        setFormStatus(null);
        setTaskListToEditId('');
    }
    
    async function callback(result) {
        if(result.status === 'success') {
            setFormStatus({status: 'success', message: 'Task List Saved'});
            setTimeout(resetForm, 1000);
        }
        else {
            // const obj = {status: result.status, message: result.message}
            setFormStatus({status: result.status, message: result.message});
        }
    }

    function handleSelectTaskListToEdit(taskID) {
        setTaskListToEditId(taskID);
        const selectedTaskList = state.taskLists.find(({id}) => id === taskID);
        setName(selectedTaskList.value);
        setCheckboxValues(selectedTaskList.notes.split(','));
        // setTaskListToEditId
    }

    function handleClickCreate() {
        api.createListFromApp(name, checkboxValues, callback);
    }

    function handleClickEdit() {
        api.editListFromApp(taskListToEditId, name, checkboxValues, callback);
    }

    function handleClickDelete() {
        api.deleteItemFromApp(taskListToEditId, resetForm);
    }


    return (

            <Form>
                <Form.Field key={'selectTaskListToEdit'}>
                    <SelectList
                        callback={handleSelectTaskListToEdit}
                        optionItems={state.taskLists}
                        selected={taskListToEditId}
                        placeholder={'Select a task list to edit'}
                        textKey={'value'}
                    />
                </Form.Field>

                <Form.Field key={'CreateTaskListAddButton'}>
                    <input
                        placeholder={'Create a new task list by typing a name here, select some tasks, then clicking add.'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Field>
                {formStatus && formStatus.status ? 
                    <Message
                    color={formStatus && formStatus.status === 'error' ? 'red' : 'green'}
                    content={formStatus && formStatus.message}
                    />
                : null}
                {Object.keys(state.itemTypes).map((itemTypeId) => {
                    const itemType = state.itemTypes[itemTypeId];
                    return(
                        <Segment key={itemType.id}>
                            <Checkbox
                                label={itemType.name}
                                onClick={(e, data)=>handleClickCheckbox(itemType.id, data.checked)}
                                checked={checkboxValues.includes(itemType.id)}
                                />
                        </Segment>
                        );
                })}
                <Form.Field key={'Buttons'}>
                    {(taskListToEditId) ? <Button positive onClick={handleClickEdit}>Edit</Button> : <Button positive onClick={handleClickCreate}>Add</Button> }
                    <Button color='orange' onClick={resetForm}>Reset</Button>
                    {(taskListToEditId) ? <Button negative onClick={handleClickDelete} floated='right'>Delete</Button> : null}
                </Form.Field>
            </Form>
    );
}

export default CreateTaskList;
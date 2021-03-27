import React, { useContext, useState, useRef} from 'react';
import GlobalContext from '../store/GlobalContext';
import { DatesRangeInput } from 'semantic-ui-calendar-react';
import CompletedItem from './CompletedItem';
import ItemTypeCheckboxes from './ItemTypeCheckboxes';
import SelectList from './SelectList';
import { ItemsFilter } from '../filters/ItemsFilter';
import { dateCalendarToDB, debug } from '../utils';

import {
    Form,
    Button,
    Container,
    Grid,
  } from 'semantic-ui-react';

const itemsFilter = new ItemsFilter();

function CreateViewsPage() {
    const [state, , api] = useContext(GlobalContext);
    const [date, setDate] = useState('');
    const [selectedItemTypes, setSelectedItemTypes] = useState([]);
    const [selectedViewId, setSelectedViewId] = useState('');

    const [name, setName] = useState('');
    const nameRef = useRef(null);

    function handleSelectedView(viewId) {

        setSelectedViewId(viewId);
        const item = state.views.filter(view=> { return view.id === viewId})[0];
        setName(item.value);

        itemsFilter.hydrateFromJson(item.notes);
        setDate(itemsFilter.getDateForCalendarControl());
        handleSetSelectedItemTypes(itemsFilter.getObject().itemTypeIds);


        // const selectedView = JSON.parse(item.notes);
        // setDate(`${dateDBToCalendar(selectedView.dateStart)} - ${dateDBToCalendar(selectedView.dateEnd)}`);
        // handleSetSelectedItemTypes(selectedView.itemTypeIds || []);
    }

    function handleSetSelectedItemTypes(arrayOfIds) {
        setSelectedItemTypes(arrayOfIds);
        itemsFilter.setItemTypeIds(arrayOfIds);
    }

    function handleChange(event, {name, value}) {
        setDate(value);

        let [startDate, endDate] = value.split(' - ');

        startDate = startDate ? dateCalendarToDB(startDate) : '';
        endDate = endDate ? dateCalendarToDB(endDate) : '';

        itemsFilter.setDateStart(startDate);
        itemsFilter.setDateEnd(endDate);        
    }

    function getData() {
        return itemsFilter.filter(state.data);
    }


    function resetForm() {
        // setFormStatus(null);
        setName('');
        setSelectedViewId('');
        // nameRef.current.focus();
    }
    async function saveCallback(result) {
        debug({result});
        // if(result.status === 'success') {
        //     setFormStatus({status: 'success', message: 'Item Type Saved'});
        //     setTimeout(resetForm, 1000);
        // }
        // else {
        //     // const obj = {status: result.status, message: result.message}
        //     setFormStatus({status: result.status, message: result.message});
        // }
    }

    async function handleClickCreate() {
        api.addViewFromApp(name, itemsFilter.getJson(), saveCallback)
    }

    async function handleClickEdit() {
        api.editViewFromApp(selectedViewId, name, itemsFilter.getJson(), saveCallback)
    }

    function getForm() {
        return(
            <Form>
                {selectedViewId}
                <Form.Field key={'View Select'}>
                    <input
                        placeholder={'View name...'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                        ref={nameRef}
                    />
                </Form.Field>
                <Form.Field key={'AddButton'}>
                    {(selectedViewId) ? <Button positive onClick={handleClickEdit}>Edit</Button> : null}
                    <Button positive onClick={handleClickCreate}>Add New</Button>
                    <Button negative onClick={resetForm}>Cancel</Button>
                </Form.Field>
                <SelectList
                    callback={handleSelectedView}
                    optionItems={state.views}
                    selected={selectedViewId}
                    placeholder={'Select a View...'}
                    textKey={'value'}
                />
            </Form>
        );
    }
    
    return (
        <Grid
        columns='12'
        >
            <Grid.Column width={4}>
                <Container width='100%'>
                        {getForm()}
                        <DatesRangeInput
                            inline
                            name="date"
                            placeholder="Date"
                            value={date}
                            iconPosition="left"
                            onChange={handleChange}
                            closable={true}
                            clearable
                        />
                        <ItemTypeCheckboxes callback={handleSetSelectedItemTypes} selectedItems={selectedItemTypes}/>
                </Container>
            </Grid.Column>
            <Grid.Column width={8}>
                {getData().map(item => {
                    return (
                        <CompletedItem item={item} key={item.id}/>
                    );
                })}
            </Grid.Column>
        </Grid>
    );
}

export default CreateViewsPage;
  
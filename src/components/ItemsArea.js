import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from '../store/GlobalContext';
import CompletedItem from './CompletedItem';
import { ItemsFilter } from '../filters/ItemsFilter';

import {
    Segment,
    Grid,
  } from 'semantic-ui-react';


const itemsFilter = new ItemsFilter();

function ItemsArea(props) {

    const [state, ,] = useContext(GlobalContext);

    useEffect(() => {
        const item = state.views.filter(view=> { return view.id === props.viewId})[0];
        if(item) {
            itemsFilter.hydrateFromJson(item.notes);
            }
    }, [state.views]);

    function getData() {
        return itemsFilter.filter(state.data);
    }

    function getDataByDate(date) {
        return getData().filter(data => data.date === date);
    }

    function getDatesArray(){
        return Array.from(new Set(getData().map((item) => item.date)))
    }
    function getContent() {
        const retArray=[];
        getDatesArray().map(date=>{
            retArray.push(<Grid.Row key={date}>
                <Grid.Column>
                    <Segment>{date}</Segment>
                </Grid.Column>
            </Grid.Row>);            
            
            getDataByDate(date).map(item => {                        
                retArray.push(
                    <CompletedItem item={item} key={item.id}/>
                );
                return null;
            });
            return null;
        });
        return retArray;              
    }

    return (
        <Segment.Group>
            <Segment>
                <Grid columns='equal' padded>
                    <Grid.Row>
                        <Grid.Column>
                            <Segment>{props.title}</Segment>
                        </Grid.Column>
                    </Grid.Row>

                    {getContent()}
                </Grid>
            </Segment>
        </Segment.Group>
    );
}

ItemsArea.propTypes = {
    viewId: PropTypes.string.isRequired,
    title: PropTypes.string,
}

export default ItemsArea;

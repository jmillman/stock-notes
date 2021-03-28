import moment from 'moment';
import React, { useContext, useState, useRef, useEffect } from 'react';
import GlobalContext from '../../store/GlobalContext';

import {
    Button,
    Form,
    Message,
  } from 'semantic-ui-react';

function StockNotesList(props) {
    const [, , api] = useContext(GlobalContext);
    const [data, setData] = useState({'still': 'empty'});
    const [formStatus, setFormStatus] = useState(null);
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'));

    useEffect(() => {
        setFormStatus({status: 'success', message: 'Fetching notes.....'});
        api.fetchStockNotesFromApp(date, getNotesListCallback);
    }, []);

    function resetForm() {
        setFormStatus(null);
    }

    async function getNotesListCallback(result) {
        setFormStatus({status: result.status, message: result.message});
        if(result.status === 'success') {
            api.fetchStockNotesFromApp(date, getNotesListCallback);
            setTimeout(resetForm, 1000);
            setData(result.data);
        }
    }

    return (
        <>
        {JSON.stringify(data)}
        </>
    );
}

export default StockNotesList;

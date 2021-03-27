import React, { useContext, useState, useRef } from 'react';
import GlobalContext from '../../store/GlobalContext';

import {
    Button,
    Form,
    Message,
  } from 'semantic-ui-react';

function AddSymbol(props) {
    const [, , api] = useContext(GlobalContext);
    const [symbol, setSymbol] = useState('');
    const [formStatus, setFormStatus] = useState(null);
    const nameRef = useRef(null);

    function resetForm() {
        setFormStatus(null);
        setSymbol('');
        nameRef.current.focus();
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
        debugger;
        api.addSymbolFromApp(symbol, saveCallback);
    }
 
    return (
        <Form error={formStatus && formStatus.status === "error"}>
            <>
                <Form.Field>
                    <input
                        placeholder='Symbol...'
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value)}
                        ref={nameRef}
                        autoFocus
                    />
                </Form.Field>
                {formStatus && formStatus.status ? 
                    <Message
                    color={formStatus && formStatus.status === 'error' ? 'red' : 'green'}
                    content={formStatus && formStatus.message}
                    />
                : null}
                <Form.Field>
                    <Button positive onClick={handleClickCreate}>Add</Button>
                </Form.Field>
            </>
        </Form>
    );
}

export default AddSymbol;
  
import React, { useContext, useRef, useState } from 'react';
import { Form, Input, Message } from 'semantic-ui-react';
import GlobalContext from '../../store/GlobalContext';

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
    setFormStatus({ status: result.status, message: result.message });
    if (result.status === 'success') {
      setTimeout(resetForm, 1000);
    }
  }

  async function handleClickCreate() {
    setFormStatus({ status: 'success', message: 'Saving symbol.....' });
    api.addSymbolFromApp(symbol, saveCallback);
  }

  return (
    <Form error={formStatus && formStatus.status === 'error'}>
      <>
        <Form.Group inline widths="equal">
          <Form.Field width={5}>
            <Input
              fluid={true}
              placeholder="Symbol..."
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              ref={nameRef}
              autoFocus
            />
          </Form.Field>
          <Form.Button positive onClick={handleClickCreate}>
            Add
          </Form.Button>
        </Form.Group>
        <Form.Group inline>
          {formStatus && formStatus.status ? (
            <Message
              color={
                formStatus && formStatus.status === 'error' ? 'red' : 'green'
              }
              content={formStatus && formStatus.message}
            />
          ) : null}
        </Form.Group>
      </>
    </Form>
  );
}

export default AddSymbol;

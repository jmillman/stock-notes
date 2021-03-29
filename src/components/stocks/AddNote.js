import _ from 'lodash';
import React, { useState, useRef, useContext } from 'react';
import {
  Container,
  Button,
  Label,
  Grid,
  Segment,
  Popup,
  Form,
  Input,
  TextArea,
  Message,
} from 'semantic-ui-react';
import GlobalContext from '../../store/GlobalContext';

function AddNote(props) {
  const [, , api] = useContext(GlobalContext);
  const [addNote, setAddNote] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [formStatus, setFormStatus] = useState(null);
  // const [date] = useState(moment().format('YYYY-MM-DD'));
  const nameRef = useRef(null);

  function resetForm() {
    setFormStatus(null);
    setTitle('');
    setBody('');
    setAddNote(false);
  }

  async function saveCallback(result) {
    setFormStatus({
      status: result.status,
      message: JSON.stringify(result.message),
    });
    if (result.status === 'success') {
      setTimeout(resetForm, 5000);
    }
  }

  async function handleSubmit() {
    setFormStatus({ status: 'success', message: 'Saving note.....' });
    api.saveNoteFromApp(props.symbol, title, body, saveCallback);
  }

  return (
    <Container>
      {!addNote ? (
        <Button
          content="Add Note"
          icon="signup"
          size="big"
          onClick={() => {
            setAddNote(true);
          }}
        />
      ) : (
        <Form>
          <Form.Field>
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <TextArea
              placeholder="What's up?..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </Form.Field>
          {formStatus && formStatus.status ? (
            <Message
              color={
                formStatus && formStatus.status === 'error' ? 'red' : 'green'
              }
              content={formStatus && formStatus.message}
            />
          ) : null}
          <Form.Field
            control={Button}
            onClick={() => {
              handleSubmit();
            }}
          >
            Submit
          </Form.Field>
        </Form>
      )}
    </Container>
  );
}

export default AddNote;

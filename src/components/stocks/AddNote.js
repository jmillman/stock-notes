import _ from 'lodash';
import React, { useState, useContext } from 'react';
import {
  Container,
  Button,
  Form,
  Input,
  TextArea,
  Message,
  Icon,
} from 'semantic-ui-react';
import GlobalContext from '../../store/GlobalContext';

function AddNote(props) {
  const [, , api] = useContext(GlobalContext);
  const [addNote, setAddNote] = useState(props.note ? true : false);
  const [title, setTitle] = useState(_.get(props, 'note.title', ''));
  const [body, setBody] = useState(_.get(props, 'note.body', ''));
  const [date] = useState(_.get(props, 'note.date', ''));
  const [formStatus, setFormStatus] = useState(null);

  function resetForm() {
    setFormStatus(null);
    setTitle('');
    setBody('');
    setAddNote(false);
    if (props.cancelCallback) {
      props.cancelCallback();
    }
  }

  async function saveCallback(result) {
    if (result.status === 'success') {
      resetForm();
    } else {
      setFormStatus({
        status: result.status,
        message: JSON.stringify(result.message),
      });
    }
  }

  async function handleSubmit() {
    setFormStatus({ status: 'success', message: 'Saving note.....' });
    api.saveNoteFromApp(props.symbol, title, body, date, saveCallback);
  }

  async function handleDelete() {
    setFormStatus({ status: 'success', message: 'Deleting note.....' });
    api.deleteNoteFromApp(date, saveCallback);
  }

  return (
    <Container key={props.note || props.symbol}>
      {!addNote ? (
        <Icon
          name="signup"
          size="small"
          onClick={() => {
            setAddNote(true);
          }}
        ></Icon>
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
          <Form.Field
            control={Button}
            onClick={() => {
              resetForm();
            }}
          >
            Cancel
          </Form.Field>
          {date ? (
            <Form.Field
              control={Button}
              onClick={() => {
                handleDelete(date);
              }}
            >
              Delete
            </Form.Field>
          ) : (
            <></>
          )}
        </Form>
      )}
    </Container>
  );
}

export default AddNote;

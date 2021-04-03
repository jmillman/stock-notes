import _ from 'lodash';
import moment from 'moment';
import React, { useState, useContext, useEffect } from 'react';
import { Button, Divider, Grid, Segment, Popup, List } from 'semantic-ui-react';
import AddNote from './AddNote';
import GlobalContext from '../../store/GlobalContext';

function NotesList(props) {
  const [state, ,] = useContext(GlobalContext);
  const [notesBeingEdited, setNotesBeingEdited] = useState([]);
  const [refreshList, setRefreshList] = useState(null);

  // const [, setFormStatus] = useState(null);
  // const [date] = useState(moment().format('YYYY-MM-DD'));

  useEffect(() => {
    setNotesBeingEdited([]);
  }, [state.notes, refreshList]);

  function getNote(note) {
    if (notesBeingEdited.includes(note.date)) {
      return (
        <AddNote
          note={note}
          key={note.date}
          cancelCallback={() => {
            // setNotesBeingEdited(notesBeingEdited.filter((item)=>item.date !== note.date))}
            setRefreshList(note.date);
          }}
        />
      );
    }
    return (
      <div
        key={note.date}
        onDoubleClick={() =>
          setNotesBeingEdited(notesBeingEdited.concat(note.date))
        }
      >
        <div>{moment(note.date).format('YYYY-MM-DD')}</div>
        <div>
          {note.title} - {note.body}
        </div>
      </div>
    );
  }

  function getNotes() {
    console.log('getNotes');
    const items = state.notes
      .filter((note) => note.symbol === props.symbol)
      .map((note) => {
        return getNote(note);
      });
    return <List divided items={items} />;
  }
  return (
    <>
      <AddNote symbol={props.symbol} />
      {getNotes()}
      {/* {JSON.stringify(state.notes)} */}
    </>
  );
}

export default NotesList;

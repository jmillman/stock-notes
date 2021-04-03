import moment from 'moment';
import React, { useState, useContext, useEffect } from 'react';
import { Accordion, Icon } from 'semantic-ui-react';
import AddNote from './AddNote';
import GlobalContext from '../../store/GlobalContext';

function NotesList(props) {
  const [state, ,] = useContext(GlobalContext);
  const [notesBeingEdited, setNotesBeingEdited] = useState([]);
  const [refreshList, setRefreshList] = useState(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  // const [, setFormStatus] = useState(null);
  // const [date] = useState(moment().format('YYYY-MM-DD'));

  useEffect(() => {
    setNotesBeingEdited([]);
  }, [state.notes, refreshList]);

  function getNote(note, index) {
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
      <Accordion
        styled
        key={note.date}
        onDoubleClick={() =>
          setNotesBeingEdited(notesBeingEdited.concat(note.date))
        }
      >
        <Accordion.Title
          active={activeIndex === index}
          index={0}
          // set the index to itself, if it is already expanded, set to -1 to collapse
          onClick={() => {
            setActiveIndex(activeIndex === index ? -1 : index);
          }}
        >
          <Icon name="dropdown" />
          {note.title} - {moment(note.date).format('YYYY-MM-DD')}
        </Accordion.Title>
        <Accordion.Content active={activeIndex === index}>
          <p>
            {moment(note.date).format('YYYY-MM-DD')} - {note.body}
          </p>
        </Accordion.Content>
      </Accordion>
    );
  }

  return (
    <>
      {state.notes
        .filter((note) => note.symbol === props.symbol)
        .map((note, index) => {
          return getNote(note, index);
        })}

      <Accordion styled>
        <Accordion.Title active={true}>
          <AddNote symbol={props.symbol} />
        </Accordion.Title>
        {/* <Accordion.Title active={true}>
          <Icon name="signup" />
          Add New
        </Accordion.Title> */}
      </Accordion>
    </>
  );
}

export default NotesList;

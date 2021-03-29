import _ from 'lodash';
import React, { useState, useContext } from 'react';
import { Button, Divider, Grid, Segment, Popup } from 'semantic-ui-react';
import AddNote from './AddNote';
import GlobalContext from '../../store/GlobalContext';

function NotesList(props) {
  const [state, ,] = useContext(GlobalContext);
  // const [data, setData] = useState({});
  // const [, setFormStatus] = useState(null);
  // const [date] = useState(moment().format('YYYY-MM-DD'));
  function getNotes() {
    console.log(props.symbol);
    return state.notes
      .filter((note) => note.symbol === props.symbol)
      .map((note) => {
        return (
          <div key={note.title + note.body}>
            {note.title} {note.body}
          </div>
        );
      });
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

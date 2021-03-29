import _ from 'lodash';
import React, { useState, useContext } from 'react';
import { Button, Divider, Grid, Segment, Popup, List } from 'semantic-ui-react';
import AddNote from './AddNote';
import GlobalContext from '../../store/GlobalContext';

function NotesList(props) {
  const [state, ,] = useContext(GlobalContext);
  // const [data, setData] = useState({});
  // const [, setFormStatus] = useState(null);
  // const [date] = useState(moment().format('YYYY-MM-DD'));
  function getNotes() {
    console.log(props.symbol);
    const items = state.notes
      .filter((note) => note.symbol === props.symbol)
      .map((note) => {
        return (`${note.title} - ${note.body}`);
      });
      return <List items={items} />
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

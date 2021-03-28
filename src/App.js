import React from 'react';
import PageMobile from './components/PageMobile';
import { withGlobalContext } from './store/GlobalContext';

function App() {
  return (
    <>
      {/* <Page1 /> */}
      <PageMobile />
    </>
  );
}

export default withGlobalContext(App);

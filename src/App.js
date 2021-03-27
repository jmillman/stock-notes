import React from 'react';
import { withGlobalContext } from './store/GlobalContext';

// import Page1 from './components/Page1';
import PageMobile from './components/PageMobile';

function App() {

    return (
        <>
            {/* <Page1 /> */}
            <PageMobile />
        </>
    );
}

export default withGlobalContext(App);

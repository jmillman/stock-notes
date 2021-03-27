import React, { useState, useContext } from 'react';
import GlobalContext from '../store/GlobalContext';
import SelectList from './SelectList';


import {
    Form,
  } from 'semantic-ui-react';

  
function LoginUserForm() {
    const [state , , api] = useContext(GlobalContext);
    const [selectedUserId, setSelectedUserId] = useState('');

    function handleSelectUser(userId) {
        setSelectedUserId(userId)
        const user = state.users.find(({id}) => id === userId);
        api.loginUserFromApp(user);
    }

    return (
            <Form>
                <SelectList
                    callback={handleSelectUser}
                    optionItems={state.users}
                    selected={selectedUserId}
                    placeholder={'Select a User...'}
                    textKey={'name'}
                />
            </Form>
    );
}

export default LoginUserForm;
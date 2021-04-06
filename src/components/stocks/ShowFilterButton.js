import React, { useContext } from 'react';
import _ from 'lodash';
import { Icon } from 'semantic-ui-react';
import GlobalContext from '../../store/GlobalContext';

function ShowFilterButton() {
  const [state, , api] = useContext(GlobalContext);
  const showFilter = _.get(state, 'settings.showFilter', false);

  return (
    <>
      {!showFilter && (
        <Icon
          name="filter"
          size="large"
          onClick={() => api.updateSettings('showFilter', true)}
        />
      )}
    </>
  );
}

export default ShowFilterButton;

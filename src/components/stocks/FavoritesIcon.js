import _ from 'lodash';
import React, { useContext } from 'react';
import GlobalContext from '../../store/GlobalContext';

import { Icon } from 'semantic-ui-react';

function FavoritesIcon(props) {
  const [state, , api] = useContext(GlobalContext);
  const favoriteStocks = _.get(state, 'settings.favoriteStocks', []);
  const { symbol } = props;

  const isFavorite = favoriteStocks.includes(symbol);
  if (!isFavorite) {
    return (
      <Icon
        name="star outline"
        onClick={() =>
          api.updateSettings('favoriteStocks', favoriteStocks.concat(symbol))
        }
      />
    );
  }
  return (
    <Icon
      name="star"
      onClick={() =>
        api.updateSettings(
          'favoriteStocks',
          favoriteStocks.filter((fav) => fav !== symbol)
        )
      }
    />
  );
}

export default FavoritesIcon;

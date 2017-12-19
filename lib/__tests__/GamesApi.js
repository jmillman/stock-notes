import GamesApi from '../sample_data/GamesApi'
import {data} from '../sample_data/testData';

const api = new GamesApi(data);

describe('GamesApi', () => {
  it('exposes teams as an object', () =>{
    const games = api.getGames();
    const gameTitle = data.games[0].title;
    expect(games).toHaveProperty(gameTitle);
    expect(games[gameTitle].title).toBe(gameTitle);
    console.log("jared=",gameTitle);
  });
});

class GamesApi {
  constructor(rawData){
    this.rawData = rawData;
  }
  mapIntoObject(array) {
    return array.reduce((acc, current) => {
      acc[current.title] = current;
      return acc;
    }, {});
  }
  getGames(){
    return this.mapIntoObject(this.rawData.games);
  }
}

export default GamesApi;

import axios from 'axios';

// lookup_symbol?symbol=${action.symbol}
const url = 'http://localhost:5000';

export async function addSymbol(symbol, callback) {
    const myUrl = `${url}/lookup_symbol?symbol=${symbol}`;
    const response = await axios.get(myUrl);
    if(response.data) {
        debugger;
        callback(response.data);
    }
}


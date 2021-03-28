import axios from 'axios';

// lookup_symbol?symbol=${action.symbol}
const url = 'http://127.0.0.1:5000/';

export async function addSymbol(symbol, callback) {
    try{
        const myUrl = `${url}/lookup_symbol?symbol=${symbol}`;
        const response = await axios.get(myUrl);
        if(response.data) {
            callback(response.data);
        }    
    }
    catch(ex) {
        console.error(ex);
    }
}


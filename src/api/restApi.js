import axios from 'axios';

const url = 'https://redjsolutions.com/api/index.php';

export class AddItemInput{
    constructor(userid, recordType, value, date, typeId, notes) {
        this.userid = userid;
        this.recordType = recordType;
        this.value= value;
        this.date = date;
        this.typeId = typeId;
        this.notes = notes;
    }

    async save(callback){
        const bodyFormData = new FormData();
        bodyFormData.set('action', 'insert');
        bodyFormData.set('userid', this.userid);
        bodyFormData.set('value', this.value);
        bodyFormData.set('typeId', this.typeId);
        bodyFormData.set('recordType', this.recordType);
        bodyFormData.set('notes', this.notes);
        bodyFormData.set('date', this.date);
        const response = await axios.post(url, bodyFormData);
        if(callback){
            callback(response.data);
        }    
    }

    async editAndSave(id, callback){
        const bodyFormData = new FormData();
        bodyFormData.set('action', 'editItem');
        bodyFormData.set('id', id);
        bodyFormData.set('userid', this.userid);
        bodyFormData.set('value', this.value);
        bodyFormData.set('typeId', this.typeId);
        bodyFormData.set('recordType', this.recordType);
        bodyFormData.set('notes', this.notes);
        bodyFormData.set('date', this.date);
        const response = await axios.post(url, bodyFormData);
        if(callback){
            callback(response.data);
        }    
    }
}

export class AddUserInput{
    constructor(name) {
        this.name = name;
    }
    async save(callback){
        const bodyFormData = new FormData();
        bodyFormData.set('action', 'createUsers');
        bodyFormData.set('name', this.name);
        const response = await axios.post(url, bodyFormData);
        if(callback){
            callback(response.data);
        }    
    }
}

// export async function addItem(value, itemType, callback) {
//     const bodyFormData = new FormData();
//     bodyFormData.set('action', 'insert');
//     bodyFormData.set('value', value);
//     bodyFormData.set('type', itemType);
//     bodyFormData.set('date', new Date().toISOString().slice(0,10));
//     const response = await axios.post(url, bodyFormData);
//     if(callback){
//         callback(response.data);
//     }
// }

export async function addItemType(userid, name, dataType_1, dataName_1, dataType_2, dataName_2, callback) {
    const bodyFormData = new FormData();
    bodyFormData.set('action', 'createItemType');
    bodyFormData.set('userid', userid);
    bodyFormData.set('name', name);
    bodyFormData.set('dataType_1', dataType_1);
    bodyFormData.set('dataName_1', dataName_1);
    if(dataType_2)
        bodyFormData.set('dataType_2', dataType_2);
    if(dataName_2)
        bodyFormData.set('dataName_2', dataName_2);
    const response = await axios.post(url, bodyFormData);
    if(response.data) {
        callback(response.data);
    }
}

export async function fetchItems(userid, callback) {
    if(typeof userid !== "string" && typeof "callback" !== "function") throw new Error('fetchItems input Error');
    const response = await axios.get(`${url}?action=listItems&userid=${userid}`);
    callback(response.data);
}

export async function fetchItemTypes(userid, callback) {
    if(typeof userid !== "string" && typeof callback !== "function") throw new Error('fetchItems input Error');
    const response = await axios.get(`${url}?action=listItemTypes&userid=${userid}`);
    callback(response.data);
}

export async function fetchUsers(callback) {
    const response = await axios.get(`${url}?action=listUsers`);
    callback(response.data);
}

export async function deleteItem(id, callback) {
    const response = await axios.get(`${url}?action=delete&id=${id}`);
    callback(response.data);
}

export async function deleteItemType(id, callback) {
    const response = await axios.get(`${url}?action=deleteItemType&id=${id}`);
    callback(response.data);
}



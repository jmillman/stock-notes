export default function(state, action) {
    let retState;
    switch (action.type) {
        case 'taskCompleted':
            retState =  Object.assign({}, state, {data: action.data});
            return retState;
        case 'loginUser':
            retState =  Object.assign({}, state, {loggedInUser: action.user});
            return retState;
        case 'taskLists':
            retState =  Object.assign({}, state, {taskLists: action.data});
            return retState;
        case 'views':
            retState =  Object.assign({}, state, {views: action.data});
            return retState;
        case 'USERS':
            retState =  Object.assign({}, state, {users: action.users});
            return retState;
        case 'ITEMTYPES':
            const itemTypes = action.itemTypes.reduce((accum, current) => {
                accum[current.id] = current;
                return accum;
            }, {});
            retState =  Object.assign({}, state, {itemTypes: itemTypes});
            return retState;
        case 'REPORT':
            return state;
        default:
            return state;
    }
}
export function debug(field) {
    if(typeof field !== "object") {
        console.error("DEBUG>> <Wrap var in {}> = ", field);
    } else {
        const variableName = Object.keys(field)[0];
        const value = field[variableName]
        console.error("DEBUG>>  " +variableName + "=%O", value);    
    }
}

export function dateDBToCalendar(databaseDate) {
    if(databaseDate) {
        const [year, month, day] = databaseDate.split('-');
        return `${day}-${month}-${year}`
    }
    return '';
}

export function dateCalendarToDB(calendarDate) {
    const [day, month, year] = calendarDate.split('-');
    return `${year}-${month}-${day}`
}


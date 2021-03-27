import { dateDBToCalendar } from '../utils';

export class ItemsFilter {

    setItemTypeIds(arrayOfItemTypeIds) {
        this.itemTypeIds = arrayOfItemTypeIds;
    }
    setName(name) {
        this.name = name;
    }
    
    setDateStart(date) {
        this.dateStart = date;
    }
    
    setDateEnd(date) {
        this.dateEnd = date;
    }

    getDateForCalendarControl() {
        return `${dateDBToCalendar(this.dateStart)} - ${dateDBToCalendar(this.dateEnd)}`;
    }

    hydrateFromJson(jsonString) {
        const selectedView = JSON.parse(jsonString);
        this.setDateStart(selectedView.dateStart);
        this.setDateEnd(selectedView.dateEnd);
        this.setItemTypeIds(selectedView.itemTypeIds || []);
    }

    getObject() {
        return {
            itemTypeIds: this.itemTypeIds,
            name: this.name,
            dateStart: this.dateStart,
            dateEnd: this.dateEnd,
        }
    }

    getJson() {
        return JSON.stringify(this.getObject());
    }

    filter(items) {
        let retItems = items;
        if(this.itemTypeIds  && this.itemTypeIds.length) {
            retItems = retItems.filter(item=> this.itemTypeIds.includes(item.typeId));
        }

        if(this.dateStart && this.dateEnd) {
            retItems = retItems.filter(item=> item.date >= this.dateStart && item.date <= this.dateEnd);
        }
        else if(this.dateStart) {
            retItems = retItems.filter(item=> item.date >= this.dateStart);
        }

        return retItems;
    }    
}
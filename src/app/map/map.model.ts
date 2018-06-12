export class MapModel {
    iconUrl: string;
    title: string;
    label: string;
    centerLat: number;
    centerLong: number;
    link: string;

    constructor(lat: number, long: number, icon: string, title:string, label:string, link: string){
        this.iconUrl = icon;
        this.title = title;
        this.label = label;
        this.centerLat = lat;
        this.centerLong = long;
        this.link = link;
    }
} 
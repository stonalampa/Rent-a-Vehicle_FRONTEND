import {Room} from "app/room/room.model";
import {AccomodationType} from "app/accomodationtype/accomodationtype.model"
import {Place} from "app/place/place.model"
import {Country}  from "app/country/country.model"
import {Region} from "../region/region.model"
export class SearchModel
{
    AcomodationType:AccomodationType;
    Room:Room;
    Place:string;
    Country:Country;
    Region:Region;
    BedCount:string;
    MinPrice:number; 
    MaxPrice:number;
    MinRate:number;
    MaxRate:number;
}
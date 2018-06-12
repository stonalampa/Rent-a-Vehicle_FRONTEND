import {Place} from "app/place/place.model";
export class Accommodation{

    Id:number;
    Name:string;
    Description:string;
    Address:string;
    AverageGrade:number;
    Latitude:number;
    Longitude:number;
    ImageURL:string;
    Approved:boolean;
    AppUser_Id:number;
    AccommodationType_Id:number;
    Place:Place;
    Place_Id:number;
    Comments:Array<Comment>
    AppUserName:string;

}
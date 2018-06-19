import {TypeOfVehicle} from "../../app/vehicle-type/vehicleType.model"
import { Service } from "../service/service.model";
export class Vehicle{

    Id:number;
    CarModel:string;
    Year: number;
    Description:string;
    PricePerHour: number;
    Manufactor:string;
    Aveable: boolean;
    Image: string;

    Service:Service;
    Service_Id:number;
    
    TypeOfVehicle:TypeOfVehicle;
    TypeOfVehicle_Id:number;

}
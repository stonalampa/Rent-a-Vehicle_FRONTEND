import { Injectable } from "@angular/core"
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {TypeOfVehicle} from './vehicleType.model'
import {AppUrl} from "../appservice/AppUrl.services"

@Injectable()
export class HttpVehicleTypeService{
    
    constructor (private http: Http,private appUrl:AppUrl){
    }

    getVehicleTypes(): Observable<any> {
        return this.http.get(this.appUrl.RootLocation+"vehicleType/vehicleTypes").map(this.extractData);        
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }

    getVehicleType(Id:number){
        return this.http.get(this.appUrl.RootLocation+'vehicleType/vehicleType/'+Id).map(this.extractData);
    }

    postVehicleType(vehicleType: TypeOfVehicle): Observable<any>  {
        
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'));

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.post(this.appUrl.RootLocation+'vehicleType/vehicleType', vehicleType , opts);
    }

    deleteVehicleType(Id:number){
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'));

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.delete(this.appUrl.RootLocation + 'vehicleType/vehicleType/'+ Id,opts);
    }

    editVehicleType(vehicleType:TypeOfVehicle){

        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'));

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.put(this.appUrl.RootLocation+'vehicleType/vehicleType/'+vehicleType.Id, vehicleType , opts);
    }
}
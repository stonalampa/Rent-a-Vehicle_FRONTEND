import { Injectable } from "@angular/core"
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Branch} from "./branch.model"
import {AppUrl} from "../appservice/AppUrl.services"

@Injectable()
export class HttpBranchService{
    
    constructor (private http: Http,private appUrl:AppUrl){
    }

    getBranches(): Observable<any> {
        return this.http.get(this.appUrl.RootLocation+"branch/branches").map(this.extractData);        
    }


    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }

    getBranch(Id:number){
        return this.http.get(this.appUrl.RootLocation+'branch/branch/'+Id).map(this.extractData);
    }

    getLogoUrlForBranch(id:number):Observable<Response>{
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.get(this.appUrl.RootLocation+'branch/branch/logo/'+id , opts);
    }

    postBranch(branch: Branch): Observable<any>  {
        
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        return this.http.post(this.appUrl.RootLocation+'branch/branch', branch , opts);
    }

    deleteBranch(Id:number){
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        return this.http.delete(this.appUrl.RootLocation + 'branch/branch/'+ Id,opts);
    }

    editBranch(branch:Branch){

        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'));

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.put(this.appUrl.RootLocation+'branch/branch/'+branch.Id, branch, opts);
    }

    
}
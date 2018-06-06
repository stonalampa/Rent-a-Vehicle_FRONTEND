import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MethodResult } from '../models/methodResult.model';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: Http, private httpClient: HttpClient) { }

  private parseData(res: Response)
  {
    return res.json() || [];
  }

  private handleError(error: Response | any) {
    let errorMessage: string;
    errorMessage = error.message ? error.message : error.toString();
    return Observable.throw(errorMessage);
  }

  getMethodDemo(): Observable<any> {
    return this.httpClient.get('http://localhost:51680/GetUser/ReturnUser').map(this.parseData).catch(this.handleError);
  }

}

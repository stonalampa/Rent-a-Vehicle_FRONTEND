// import the packages  
import { Injectable, EventEmitter } from '@angular/core';
import { RequestOptions, Headers, Http } from '@angular/http';
import { AppUrl } from './AppUrl.services';

// declare the global variables  
declare var $: any;

@Injectable()
export class NotificationService {
    // Declare the variables  
    private proxy: any;
    private proxyName: string = 'notifications';
    private connection: any;
private token:string;
    // create the Event Emitter  
    public adminNotReceived: EventEmitter<Array<any>>;
    public managerNotRecieved: EventEmitter<Array<any>>;
    public connectionEstablished: EventEmitter<Boolean>;
    public timeReceived: EventEmitter<string>;
    public connectionExists: Boolean;

    constructor(
        private http: Http,
        private locationService: AppUrl
    ) {
        // Constructor initialization  
        this.connectionEstablished = new EventEmitter<Boolean>();
        this.adminNotReceived = new EventEmitter<Array<any>>();
        this.managerNotRecieved = new EventEmitter<Array<any>>();
        this.timeReceived = new EventEmitter<string>();
        this.connectionExists = false;

        // create hub connection  
        this.connection = $.hubConnection("http://localhost:54042/");
        this.token=localStorage.getItem('id_token');
        
        
        // create new proxy as name already given in top  
        this.proxy = this.connection.createHubProxy(this.proxyName);
        // register on server events  
        this.registerOnServerEvents();

        this.proxy.on('hello', (data: string) => {
            console.log(data);
        })

        this.registerForTimerEvents();
        // call the connecion start method to start the connection to send and receive events. 
        this.startConnection();

        

    }
    // method to hit from client  
    public sendHello() {
        // server side hub method using proxy.invoke with method name pass as param  
        this.proxy.invoke('Hello');

    }

    public getProxy(){
        return this.proxy;
    }

    public registerOnServerEvents(){
         this.proxy.on('ApprovedAccomodations', (data: any) => {
             this.adminNotReceived.emit(data);
         });

        this.proxy.on('NotifyManager', (data: any) => {
             this.managerNotRecieved.emit(data);
         });
    }
    // check in the browser console for either signalr connected or not  
    private startConnection(): void {
        this.connection.start().done((data: any) => {
            this.Introduce();
            console.log('Now connected ' + data.transport.name + ', connection ID= ' + data.id);
            this.connectionEstablished.emit(true);
            this.connectionExists = true;
        }).fail((error: any) => {
            console.log('Could not connect ' + error);
            this.connectionEstablished.emit(false);
        });
    }
   

    private registerForTimerEvents() {

        this.proxy.on('setRealTime', (data: string) => {
            console.log('received time: ' + data);
            this.timeReceived.emit(data);
        });
    }

    private Introduce() {
        let username = localStorage.getItem("username");
        let role = localStorage.getItem("role");

        if (username == null || username == undefined || role == null || role == undefined) {
            return;
        }
        this.proxy.invoke('Introduce', username, role);

    }

}  
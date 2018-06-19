import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { NguiDatetimePickerModule } from '@ngui/datetime-picker'; //for datetime
import { AppComponent } from './app.component';
import { MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule,MaterialModule,MdNativeDateModule,MdSnackBarModule} from '@angular/material/';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AdminGuard} from './adminGuard';
import {ManagerGuard} from './managerGuard';
import { AgmCoreModule } from '@agm/core';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import {NgxPaginationModule} from 'ngx-pagination';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {HttpAuthenticationService} from "./login/userAuthentication.service"
import {AppUrl} from "./appservice/AppUrl.services";
import { ServiceComponent } from './service/service.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { VehicleTypeComponent } from './vehicle-type/vehicle-type.component';
import { BranchComponent } from './branch/branch.component';
import {HttpVehicleTypeService} from "./vehicle-type/vehicleType.service";
import { VehicleTypeAddComponent } from './vehicle-type/vehicle-type-add/vehicle-type-add.component';
import { VehicleTypeEditComponent } from './vehicle-type/vehicle-type-edit/vehicle-type-edit.component';
import { ServiceAddComponent } from './service/service-add/service-add.component';
import { ServiceEditComponent } from './service/service-edit/service-edit.component';
import { ImageuploadComponent } from './imageupload/imageupload.component';
import { BranchAddComponent } from './branch/branch-add/branch-add.component';
import { BranchEditComponent } from './branch/branch-edit/branch-edit.component';
import {HttpBranchService} from "./branch/branch.service";
import {MapComponent} from "./map/map.component";
import {HttpServiceService} from "./service/service.service";
import { VehicleAddComponent } from './vehicle/vehicle-add/vehicle-add.component';
import { VehicleEditComponent } from './vehicle/vehicle-edit/vehicle-edit.component';
import { HttpVehicleService } from './vehicle/vehicle.service';
const Routes=[
  {path: "register",component:RegisterComponent},
  {path: "login",component:LoginComponent},
  {path: "home",component:HomeComponent},
  {path: "service",component:ServiceComponent},
  {path: "service-add",component:ServiceAddComponent,},
  {path: "service-edit",component:ServiceEditComponent,},
  {path: "branch",component:BranchComponent,},
  {path: "vehicle",component:VehicleComponent, },
  {path: "vehicleType",component:VehicleTypeComponent, },
  
]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ServiceComponent,
    VehicleComponent,
    VehicleTypeComponent,
    BranchComponent,
    VehicleTypeAddComponent,
    VehicleTypeEditComponent,
    ServiceAddComponent,
    ServiceEditComponent,
    ImageuploadComponent,
    FileSelectDirective,
    FileDropDirective,
    BranchAddComponent,
    BranchEditComponent,
    MapComponent,
    VehicleAddComponent,
    VehicleEditComponent
    
  ],
  entryComponents: [ImageuploadComponent,BranchAddComponent,MapComponent,BranchEditComponent,
    VehicleAddComponent,VehicleEditComponent,VehicleTypeAddComponent,VehicleTypeEditComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(Routes),
    NguiDatetimePickerModule,
    MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule,MaterialModule,MdNativeDateModule,MdSnackBarModule,
    BrowserAnimationsModule,NgxPaginationModule,AgmCoreModule.forRoot({apiKey: 'AIzaSyAtvp71DTpNaEw59EcmxvFMQOKRyRUiArg'})
  ],
  providers: [HttpAuthenticationService,AppUrl,AdminGuard,ManagerGuard,HttpVehicleTypeService,HttpBranchService,HttpServiceService,HttpVehicleService],
  bootstrap: [AppComponent]
})
export class AppModule { }

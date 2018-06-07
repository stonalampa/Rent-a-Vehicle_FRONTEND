import { Component } from '@angular/core';
import { UserServiceService } from './services/user-service.service'
import { UserModel } from '../model/userModel.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserServiceService],
})
export class AppComponent {
  title = 'Anor Londo';
  testPromenljiva = 'Test Promenljiva';
  private User: UserModel;
  constructor(private UserService: UserServiceService) {}

  callPost(){
    let user = 
      { Id: 1, 
        FullName: 'Test Test', 
        DateOfBirth: 'nesto',
        UserType: 1,
        PhotoPath: 'string'
      }
      this.UserService.postMethodDemo(user).subscribe(data => console.log(data), data => console.log(data));
  }
  
  callGet(){
    this.UserService.getMethodDemo().subscribe(data =>{this.User = data});
    console.log(this.User);
  }
}

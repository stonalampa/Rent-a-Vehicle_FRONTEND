import { Component } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Anor Londo';
  testPromenljiva = 'Test Promenljiva';

  callGet(){
    this.userService
  }
}

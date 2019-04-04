import {Component, ViewChild} from '@angular/core';

import {LoginComponent} from './login/components/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild(LoginComponent)
  login: LoginComponent;

}

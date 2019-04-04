import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../login/services/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  LogOutClick() {
    this.authService.logout();
  }
}

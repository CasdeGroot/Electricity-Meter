import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../login/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(public router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  onHomeClick() {
    console.log('clicked');
   this.router.navigate(['home']);
  }
}

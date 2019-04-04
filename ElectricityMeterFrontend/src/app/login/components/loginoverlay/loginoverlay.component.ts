import {Component, OnInit} from '@angular/core';
import {animate, keyframes, query, stagger, style, transition, trigger} from '@angular/animations';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-loginoverlay',
  templateUrl: './loginoverlay.component.html',
  styleUrls: ['./loginoverlay.component.scss'],
  animations: [
  trigger('ngIfOutAnimation', [
    transition('* => void', [
      query('*', style({ opacity: 1}), {optional: true}),
      query('*', stagger('300ms', [
        animate('0.8s ease-in', keyframes([
          style({opacity: 1, transform: 'translateY(0)', offset: 0}),
          style({opacity: .5, transform: 'translateY(35px)', offset: 0.3}),
          style({opacity: 0, transform: 'translateY(-75%)', offset: 1.0}),
        ]))]), {optional: true}),
    ])
  ]),
  trigger('ngIfInAnimation', [
    transition('void => *', [
      query('*', style({ opacity: 0}), {optional: true}),
      query('*', stagger('300ms', [
        animate('0.8s ease-in', keyframes([
          style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
          style({opacity: .5, transform: 'translateY(35px)', offset: 0.3}),
          style({opacity: 1, transform: 'translateY(0)', offset: 1.0}),
        ]))]), {optional: true}),
    ])
  ])
]
})
export class LoginoverlayComponent implements OnInit {

  isCreateAccount = false;
  isLogin = true;
  isLoggedIn: boolean;

  constructor(public authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  ngOnInit() {
  }

  OnCreateAccount($event) {
    this.isLogin = !$event;
    this.isCreateAccount = $event;
  }

  OnLogin($event) {
    this.isLoggedIn = $event;
  }
}

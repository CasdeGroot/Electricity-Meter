import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../user/user/user.class';
import {SweetAlertService} from 'ngx-sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user: User;
  isLoggedIn: boolean;

  @Output()
  public onCreateAccount: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public onLogin: EventEmitter<any> = new EventEmitter<any>();

  constructor(public authService: AuthService, private fb: FormBuilder, private alertService: SweetAlertService) {
    this.user = new User();
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onLoginClick() {
    if (this.loginForm.valid) {
      this.authService.login(this.user.username, this.user.password)
        .subscribe(e => {
          this.isLoggedIn = this.authService.isLoggedIn();
          this.onLogin.emit(this.isLoggedIn);
          if (!this.isLoggedIn) {
            this.alertService.error({ title: 'Error!', text: 'error logging in'});
          }
      }, (err) => this.alertService.error({ title: 'Error!', text: 'error logging in'}));
    }
  }

  onCreateAccountClick() {
    this.onCreateAccount.emit(true);
  }
}

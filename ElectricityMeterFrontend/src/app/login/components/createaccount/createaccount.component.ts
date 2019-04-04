import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../user/user/user.class';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {SweetAlertService} from 'ngx-sweetalert2';

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.scss'],
})
export class CreateaccountComponent implements OnInit {

  public user: User;
  public userForm: FormGroup;
  private areaCodePattern = /^[1-9][0-9]{3}[\s]?[A-Za-z]{2}$/i;
  private homePghonePattern = /^(((0)[1-9]{2}[0-9][-]?[1-9][0-9]{5})|((\\+31|0|0031)[1-9][0-9][-]?[1-9][0-9]{6}))$/;
  private cellPhonePattern = /^(((\\+31|0|0031)6){1}[1-9]{1}[0-9]{7})$/i;

  @Output()
  onCreateAccount: EventEmitter<any> = new EventEmitter<any>();

  constructor(private authService: AuthService, private fb: FormBuilder, private alertService: SweetAlertService) {
    this.user = new User();
    this.userForm = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.min(3), Validators.max(20)])],
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      cellPhone: [''],
      homePhone: [''],
      areaCode: ['', Validators.compose([Validators.required])],
      address: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  onCreateAccountClick() {
    if (this.userForm.valid) {
      this.authService.createAccount(this.user)
        .subscribe(e => {
          this.onCreateAccount.emit(false);
        }, (err) => this.alertService.error({ title: 'Error!', text: 'error creating account'}));
    } else {
      this.alertService.error({ title: 'Error!', text: 'form not filled in correctly'});
    }
  }

  GoBack() {
    this.onCreateAccount.emit(false);
  }
}

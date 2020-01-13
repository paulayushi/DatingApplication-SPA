import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() registerToggleMode = new EventEmitter();
  user: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private authSvc: AuthService, private alertify: AlertifyService,
              private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    // this.registerForm = new FormGroup({
    //   username: new FormControl('', Validators.required),
    //   password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    //   confirmPassword: new FormControl('', Validators.required)
    // }, this.matchPasswordValidator);
    this.bsConfig = Object.assign({}, { containerClass: 'theme-orange' });
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators : this.matchPasswordValidator });
  }

  matchPasswordValidator(formGroup: FormGroup){
    return formGroup.get('password').value === formGroup.get('confirmPassword').value ? null : { mismatch : true };
  }

  register() {
    if(this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      console.log(this.user);
      console.log(this.registerForm);
      this.authSvc.register(this.user).subscribe( () => {
        this.alertify.success('Registration successful.');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.authSvc.login(this.user).subscribe( () => {
          this.router.navigate(['/members']);
        }, error=> {
          this.alertify.error(error);
        });
      });
     }
  }

  cancel() {
    this.registerToggleMode.emit(false);
  }

}

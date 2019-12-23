import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() registerToggleMode = new EventEmitter();
  model: any = {};

  constructor(private authSvc: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  register() {
    this.authSvc.register(this.model).subscribe(
      () => {
        this.alertify.success('Registration successful.');
      }, error => {
        this.alertify.error(error);
      }
    );
  }

  cancel() {
    this.registerToggleMode.emit(false);
  }

}

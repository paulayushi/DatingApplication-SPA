import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  toggleRegisterComp = false;
  constructor(private _http: HttpClient) { }

  ngOnInit() {
  }

  toggleRegister(){
    this.toggleRegisterComp = true;
  }

  cancelToggleRegisterMode(toggleRegisterMode: boolean){
    this.toggleRegisterComp = toggleRegisterMode;
  }
}

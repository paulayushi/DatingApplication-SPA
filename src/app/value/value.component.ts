import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {

  values: any;

  constructor(private _http: HttpClient) { }

  ngOnInit() {
    this.getValue().subscribe( response => {
      this.values = response;
      console.log(this.values);
    }, error => {
      console.log(error);
    });
  }

  getValue(): Observable<any> {
    return this._http.get('http://localhost:5000/api/values');
  }
}

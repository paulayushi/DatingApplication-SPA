import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { User } from "../_models/user";
import { PaginatedResult } from '../_models/paging';
import { map } from 'rxjs/operators';

// const headerOption = new HttpHeaders({
//   Authorization: 'Bearer ' + localStorage.getItem('token')
// });

@Injectable({
  providedIn: "root"
})
export class UserService {
  baseUrl: string = environment.baseUrl;

  constructor(private _http: HttpClient) {}

  getUsers(pageNumber?, pageSize?, params?): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
    let userParams: HttpParams = new HttpParams();

    if(pageNumber != null && pageSize!= null){
      userParams = userParams.append('currentPage', pageNumber);
      userParams = userParams.append('pageSize', pageSize);
    }

    if (params != null){
      userParams = userParams.append('gender', params.gender);
      userParams = userParams.append('minAge', params.minAge);
      userParams = userParams.append('maxAge', params.maxAge);
      userParams = userParams.append('orderBy', params.orderBy);
    }

    return this._http.get<User[]>(this.baseUrl + "user", { params: userParams, observe: 'response' }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if(response.headers.get('Paging') != null){
          paginatedResult.pagingHeader = JSON.parse(response.headers.get('Paging'));
        }
        return paginatedResult;
      })
    );
  }

  getUser(id: number): Observable<User> {
    return this._http.get<User>(this.baseUrl + "user/" + id);
  }

  updateUser(id: number, user: User) {
    return this._http.put(this.baseUrl + 'user/' + id, user);
  }

  setMainPhoto(userId: number, id: number) {
    return this._http.post(this.baseUrl + 'user/' + userId + '/photos/' + id + '/setMain', {});
  }

  deletePhoto(userId: number, id: number){
    return this._http.delete(this.baseUrl + 'user/' + userId + '/photos/' + id);
  }
}

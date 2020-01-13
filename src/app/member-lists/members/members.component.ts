import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { User } from '../../_models/user';
import { ActivatedRoute } from '@angular/router';
import { PagingHeader } from 'src/app/_models/paging';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  users: User[];
  user: User;
  pagination: PagingHeader;
  userParams: any = {};
  genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}];

  constructor(private userSvc: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }


  ngOnInit() {
    this.route.data.subscribe( data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagingHeader;
    }, error => {
      this.alertify.error(error);
    });
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.gender = this.user.gender.toLowerCase() === 'male' ? 'female' : 'male';
    this.userParams.orderBy = 'lastActive';
  }

  pagedChange(event){
    this.pagination.currentPage = event.page;
    this.loadUser();
  }

  loadUser() {
    this.userSvc.getUsers(this.pagination.currentPage, this.pagination.pageSize, this.userParams).subscribe( users => {
      this.users = users.result;
      this.pagination = users.pagingHeader;
    }, error => {
      this.alertify.error(error);
    });
  }

  resetFilter(){
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.gender = this.user.gender.toLowerCase() === 'male' ? 'female' : 'male';
    this.loadUser();
  }
}

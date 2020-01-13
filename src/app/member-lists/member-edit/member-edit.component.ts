import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user: User;
  @ViewChild('editForm', { static: true}) editMember: NgForm;
  @HostListener('window: beforeunload', ['$event'])
  preventFromExternalEvent($event: any){
    if(this.editMember.dirty) {
      return event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
    private userSvc: UserService, private authSvc: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe( data => {
      this.user = data['user'];
    }, error => {
      this.alertify.error(error);
    });
    this.authSvc.currentPhotoUrl.subscribe(url => {
      this.user.photoUrl = url;
    });
  }

  updateUser() {
    this.userSvc.updateUser(this.authSvc.decodedToken.nameid, this.user).subscribe( () => {
      this.alertify.success('Profile updated successfully.');
      this.editMember.reset(this.user);
    }, error=> {
      this.alertify.error(error);
    });
  }

  // setMainPhoto(photoUrl: string) {
  //   this.user.photoUrl = photoUrl;
  // }
}

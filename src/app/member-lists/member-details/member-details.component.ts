import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private userSvc: UserService, private alertify: AlertifyService, 
    private route: ActivatedRoute, private _authSvc: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe( data => {
      this.user = data['user'];
    }, error => {
      this.alertify.error(error);
    });
    this.galleryOptions = [{
      width: '500px',
      height: '500px',
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Slide,
      imagePercent: 100,
      preview: false
    }];

    this.galleryImages = this.getImages();
  }
  getImages(){
    const imageUrls = [];
    for (const photo of this.user.photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        large: photo.url
      });
    }
    return imageUrls;
  }
  
  // loadUser() {
  //   this.userSvc.getUser(+this.route.snapshot.params['id']).subscribe( (user: User) => {
  //     this.user = user;
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }

}

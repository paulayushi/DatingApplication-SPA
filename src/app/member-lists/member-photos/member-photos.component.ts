import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from 'src/app/_models/photo';
import { FileUploader } from 'ng2-file-upload'
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-member-photos',
  templateUrl: './member-photos.component.html',
  styleUrls: ['./member-photos.component.css']
})
export class MemberPhotosComponent implements OnInit {
  @Input() photos: Photo[];
  @Output() setMainPhotoUrl = new EventEmitter<string>();
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  baseUrl: string;
  currentMainPhoto: Photo;

  constructor(private authSvc: AuthService, private userSvc: UserService, private alertify: AlertifyService) {}

  ngOnInit() {
    this.hasBaseDropZoneOver = false;
    this.baseUrl = environment.baseUrl;
    this.initiateUploader();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initiateUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'user/' + this.authSvc.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      autoUpload: false,
      removeAfterUpload: true,
      maxFileSize: 10 * 1024 * 1024
    });
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      const resp: Photo = JSON.parse(response);
      this.photos.push(resp);
      if(resp.isMain){
        this.authSvc.changeCUrrentPhotoUrl(resp.url);
        localStorage.setItem('photoUrl', resp.url);
      }
    };
  }

  setMainPhoto(photo: Photo) {
    this.userSvc.setMainPhoto(this.authSvc.decodedToken.nameid, photo.id).subscribe( () => {
      this.currentMainPhoto = this.photos.filter(p => p.isMain === true)[0];
      this.currentMainPhoto.isMain = false;
      photo.isMain = true;
      //this.setMainPhotoUrl.emit(photo.url);
      this.authSvc.changeCUrrentPhotoUrl(photo.url);
      localStorage.setItem('photoUrl', photo.url);
    }, error => {
      this.alertify.error(error);
    });
  }

  deletePhoto(id: number){
    this.alertify.confirm('Are you sure you want to delete your photo?',
    () => {
      this.userSvc.deletePhoto(this.authSvc.decodedToken.nameid, id).subscribe(() => {
        this.photos.splice(this.photos.findIndex(p => p.id === id), 1);
        this.alertify.success('Your photo is successfully deleted.');
      }, error=> {
        this.alertify.error('Failed to delete the photo. ' + error);
      });
    });
  }

}

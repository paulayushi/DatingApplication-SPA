import { Injectable } from "@angular/core";
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../member-lists/member-edit/member-edit.component';

@Injectable()
export class ProtectRouteGuard implements CanDeactivate<MemberEditComponent> {
    constructor(){}
    canDeactivate(component: MemberEditComponent): boolean {
        if (component.editMember.dirty) {
           return confirm('You have unsaved changes and you will lose all your changes. Do you want to continue?');
        }
        return true;
    }
}
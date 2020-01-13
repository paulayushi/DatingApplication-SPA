import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MembersComponent } from './member-lists/members/members.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailsComponent } from './member-lists/member-details/member-details.component';
import { MemberDetailsResolver } from './_resolver/member-details-resolver';
import { MemberListResolver } from './_resolver/member-lists-resolver';
import { MemberEditComponent } from './member-lists/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolver/member-edit-resolver';
import { ProtectRouteGuard } from './_guards/protect-route-guard';

export const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'members', component: MembersComponent, resolve: { users : MemberListResolver}},
      {path: 'members/:id', component: MemberDetailsComponent, resolve: { user : MemberDetailsResolver }},
      {path: 'member/edit', component: MemberEditComponent,
      resolve: {user: MemberEditResolver}, canDeactivate: [ProtectRouteGuard] },
      {path: 'lists', component: ListsComponent},
      {path: 'messages', component: MessagesComponent}
    ]
  },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

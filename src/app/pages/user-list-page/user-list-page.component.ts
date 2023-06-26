import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-user-list-page',
  templateUrl: './user-list-page.component.html',
  styleUrls: ['./user-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListPageComponent {

  // public createUser(email: string, password: string) {

  // }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateNewUserModalComponent } from 'src/app/components/create-new-user-modal/create-new-user-modal.component';

@Component({
  selector: 'app-user-list-page',
  templateUrl: './user-list-page.component.html',
  styleUrls: ['./user-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListPageComponent {
  constructor(
    public dialog: MatDialog
  ) { }

  openModal(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CreateNewUserModalComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}

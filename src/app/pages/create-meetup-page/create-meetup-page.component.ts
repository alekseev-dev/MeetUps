import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { CreateMeetupComponent } from 'src/app/components/create-meetup/create-meetup.component';
import { IMeetupData } from 'src/app/interfaces/meetup-data';

@Component({
  selector: 'app-create-meetup-page',
  templateUrl: './create-meetup-page.component.html',
  styleUrls: ['./create-meetup-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateMeetupPageComponent implements OnInit {
  private _meetupData: IMeetupData | null = null;
  private _isEditing = false;
  @ViewChild('createMeetup') createMeetup!: CreateMeetupComponent

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      tap(data => {
        if (Object.keys(data).length !== 0) {
          this._meetupData = {
            id: data['id'],
            name: data['name'],
            description: data['description'],
            location: data['location'],
            targetAudience: data['targetAudience'],
            needToKnow: data['needToKnow'],
            willHappen: data['willHappen'],
            reasonToCome: data['reasonToCome'],
            time: data['time'],
            duration: data['duration'],
            createdBy: data['createdBy'],
            owner: data['owner'],
            users: data['users'],
          };

          this._isEditing = true;
        }
      }))
      .subscribe()
  }


  get meetupData() {
    return this._meetupData;
  }

  get isEditing() {
    return this._isEditing;
  }

  onCreateMeetupMethod() {
    this.createMeetup.createMeetup()
  }

  onDeleteMeetupMethod() {
    this.createMeetup.deleteMeetup()
  }

  onSaveMeetupMethod() {
    this.createMeetup.saveMeetup();
  }

  redirectToBack() {
    this.location.back();
  }
}

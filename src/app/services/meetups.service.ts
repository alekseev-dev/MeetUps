import { Injectable } from '@angular/core';
import { IMeetupData } from '../interfaces/meetup-data';

@Injectable({
  providedIn: 'root'
})
export class MeetupsService {
  private _meetupsData: IMeetupData[] = [
    {
      cardTitle: 'Angular vs React',
      targetTitle: 'Целевая аудитория',
      targetDescription: 'разрабы, аналитики, и проч',
      whatToKnowTitle: 'Что надо знать?',
      whatToKnowDescription: [
        'один',
        'два',
        'три',
        'четыре',
      ],
      whatWillBeTitle: 'Что будет?',
      whatWillDescription: [
        'один',
        'два',
        'три',
        'четыре',
      ],
      whyShouldComeTitle: 'Почему надо обязательно прийти?',
      whyShouldComeDescription: 'У меня красный пояс по C++',
      subsCount: 200,
      cardDescription: 'А здесь я ещё более подробно напишу об том, отб этом. О том, об этом. О том, об этом. О том, об этом. О том, об этом. О том, об этом. О том, об этом. О том, об этом. О том, об этом. О том, об этом. О том, об этом. О том, об этом. О том, об этом. О том, об этом. О том, об этом. О том, об этом. О том, об этом. О том, об этом.',
      author: 'Александр Козаченко',
      roomNumber: 14,
      meetTime: new Date().toISOString(),
    },
    {
      cardTitle: 'Angular vs React',
      targetTitle: 'Целевая аудитория',
      targetDescription: 'разрабы, аналитики, и проч',
      whatToKnowTitle: 'Что надо знать?',
      whatToKnowDescription: [
        'один',
        'два',
        'три',
        'четыре',
      ],
      whatWillBeTitle: 'Что будет?',
      whatWillDescription: [
        'один',
        'два',
        'три',
        'четыре',
      ],
      whyShouldComeTitle: 'Почему надо обязательно прийти?',
      whyShouldComeDescription: 'У меня красный пояс по C++',
      subsCount: 200,
      cardDescription: 'А здесь я ещё более подробно напишу об том, отб этом. О том, об этом. О том, об этом. О том, об этом. О том, об этом. О том, об этом. О том, об этом. О том, об этом. О том, об этом. О том, об этом. О том, об этом. О том, об этом. О том, об этом. О том, об этом. О том, об этом. О том, об этом. О том, об этом. О том, об этом.',
      author: 'Александр Козаченко',
      roomNumber: 14,
      meetTime: new Date().toISOString(),
    },
  ];

  constructor() { }

  public get meetupsData() {
    return this._meetupsData;
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { IMeetupData } from '../interfaces/meetup-data';

@Pipe({
  name: 'filterDataPipe'
})
export class FilterDataPipe implements PipeTransform {

  transform(meetups: IMeetupData[] | null, searchValue: string): IMeetupData[] {
    if (meetups === null) return [];

    if (!searchValue) {
      return meetups;
    }

    return meetups.filter(meetup => {
      return meetup.name.toLowerCase().includes(searchValue)
    })
  };
};

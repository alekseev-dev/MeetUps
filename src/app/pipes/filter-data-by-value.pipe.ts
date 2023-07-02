import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { FilterType } from 'src/assets/const/common';
import { ISearchParams } from '../interfaces/filter-data';
import { IMeetupData } from '../interfaces/meetup-data';

@Pipe({
  name: 'filterDataByValuePipe'
})
export class FilterDataByValue implements PipeTransform {

  transform(meetups: IMeetupData[] | null, searchParams: ISearchParams | null): IMeetupData[] {
    if (meetups === null) return [];

    if (!searchParams?.searchValue) {
      return meetups;
    }

    let result;

    switch (searchParams.searchType) {
      case FilterType.Name:
        result = meetups.filter(meetup => {
          return meetup.name.toLowerCase().includes(searchParams.searchValue.toLowerCase())
        })
        break;

      case FilterType.Date:
        result = meetups.filter(meetup => {
          const datePipe = new DatePipe('en-US');
          const date = datePipe.transform(meetup.time, 'dd.MM.yy');
          return date?.includes(searchParams.searchValue)
        })
        break;

      case FilterType.Description:
        result = meetups.filter(meetup => {
          let regex = new RegExp(searchParams.searchValue, 'gi');
          return regex.test(meetup.description);
        })
        break;

      default:
        return []
    }

    return result
  };
};

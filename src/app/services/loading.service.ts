import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _loadingGlobal = new BehaviorSubject<boolean>(false);
  private _loadingLocal = new BehaviorSubject<boolean>(false);
  public readonly loadingGlobal$ = this._loadingGlobal.asObservable().pipe(delay(1));
  public readonly loadingLocal$ = this._loadingLocal.asObservable().pipe(delay(1));

  constructor() { }

  showGlobal() {
    this._loadingGlobal.next(true);
  }

  hideGlobal() {
    this._loadingGlobal.next(false);
  }

  showLocal() {
    this._loadingLocal.next(true);
  }

  hideLocal() {
    this._loadingLocal.next(false);
  }
}

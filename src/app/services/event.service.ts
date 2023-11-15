import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  public isLoggedIn: EventEmitter<any> = new EventEmitter();
  public isLoggedOut: EventEmitter<any> = new EventEmitter();
  public refreshNetwork: EventEmitter<any> = new EventEmitter();
  public isHttpError: EventEmitter<any> = new EventEmitter();
  public isHttpRequirementError: EventEmitter<any> = new EventEmitter();
  public isLoggedInRefresh: EventEmitter<any> = new EventEmitter();

  constructor() { }

}

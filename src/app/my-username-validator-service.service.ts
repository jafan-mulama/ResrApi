import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyUsernameValidatorService {
  constructor() {}

  checkUsername(username: string): Observable<ValidationErrors | null> {
    // Replace this with your actual API call to validate the username
    // The API call should return an observable of validation errors or null

    // In this example, we'll consider 'admin' as a taken username
    const isUsernameTaken = username === 'admin';

    return of(isUsernameTaken ? { usernameTaken: true } : null);
  }
}

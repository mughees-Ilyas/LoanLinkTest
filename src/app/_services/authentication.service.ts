import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    //if a user exist in local storage ue it as current user and dont ask for login
    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }
  /*
   * method to get current user value
   */
    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    /*
    * username: user name to login
    * password: password to the given user
     */
    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // store user in local storage so we can access if a user is already loged in even after refresh
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }
  /*
  * logout user
   */
    logout() {
        // remove user object after logout.
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}

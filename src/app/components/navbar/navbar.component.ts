import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthenticationService} from '@app/_services';


@Component({
  selector: 'nav-bar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css']
})
export class NavbarComponent {
  toggle = false;

    constructor(private route: ActivatedRoute, private router: Router, private  authenticationService:AuthenticationService) {}
    /*
    * toggle nav bar on click.
     */
    onClick() {
      this.toggle=!this.toggle;
    }
    /*
     * logout user from the system
     */
    logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  /*
   * navigate to user page to view all users
   */
  usersPage() {
    this.router.navigate(['/thermostats']);
  }
  /*
   * navigate to user adding page to add new user
   */
  addUserPage() {
    this.router.navigate(['/thermostats/thermostat/new']);
  }
}

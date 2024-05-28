import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../shared/service/user-data.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  sidebarClick = false;
  modulesList: Array<any>;
  enteredButton = false;
  isMatMenuOpen = false;
  isMatMenu2Open = false;
  prevButtonTrigger;



    //permission
    reportsLinkPermission: Boolean = false;

  loggedInName: string;

  loggedInUserRolePermission: any;


  private subDataOne: Subscription;

  LoggedInUserRoleId: any;
  constructor(
    public router: Router,
    private userDataService: UserDataService,
    private authService: AuthService,
    private ren: Renderer2,
    private _elementRef : ElementRef
  ) {
  }

  ngOnInit(): void {
    this.LoggedInUserRoleId = sessionStorage.getItem('role');
    this.loggedInName = sessionStorage.getItem('name');
    // Retrieve the data from the shared service when the component initializes.
    this.loggedInUserRolePermission = this.userDataService.getLoggedInUserRolePermission();
    // If it's not already set, fetch it from your API.
    if (!this.loggedInUserRolePermission) {
      // this.getLogedInUserPermissionformApi();
    }
  }
  handleOutsideClick(): void {
    this.sidebarClick = false;
  }





  onLogOut() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email')
    sessionStorage.removeItem('name')
    sessionStorage.removeItem('role')
    this.router.navigate(['/auth/login']);
  }


  sidebar(){
    this.sidebarClick = !this.sidebarClick
  }



  updateloggedInUserRolePermission() {
    console.log(' this.loggedInUserRolePermission',  this.loggedInUserRolePermission);
    console.log('LoggedInUserRoleId', this.LoggedInUserRoleId);
    
    if (this.LoggedInUserRoleId == 1) {
      this.reportsLinkPermission = true;
    } else {
       this.loggedInUserRolePermission.forEach((item: any) => {
      switch (item.permission) {
        case 'reports_ink':
          this.reportsLinkPermission = true;
          break;
        // Add more cases for other permissions if needed
        default:
          break;
      }
    })

    }
   
  }




}




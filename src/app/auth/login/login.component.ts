import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { UiService } from 'src/app/service/ui.service';
interface LoginResponse {
  message: string;
  status: string;
  User: {
    email: string;
    token: string;
    // You can include other properties if they are present in the actual response
  };
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //store data
  isLoggedIn = false;
  myAuthToken = sessionStorage.getItem('token');
  hide = true;

  // Reactive Form
  loginForm: FormGroup;
  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  // Subscriptions
  private subDataOne: Subscription;
  constructor(
    private authService: AuthService,
    public router: Router,
    private uiService: UiService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });
    // this.getProtectedDtata()
    console.log('isLoggedIn', this.isLoggedIn)
  }

/**
 * Executes the login process when a user attempts to log in.
 * - Shows a spinner to indicate loading.
 * - Validates the login form for input errors.
 * - Sends the user's email and password to the authentication service.
 * - Handles successful login by storing user information in session storage.
 * - Redirects the user to the dashboard upon successful login.
 * - Handles and displays errors if the login process fails.
 */

  onLogin() {
    this.spinner.show();
    if (this.loginForm.invalid) {
      console.log('Invalid Input field!');
      return;
    }
    // Form Data..
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    const data = { email, password };


    this.subDataOne = this.authService.onLogin(data).subscribe({
      
      next: (res: LoginResponse) => {
        if (res) {
          console.log('res on login', res);
          console.log('login successfully')
          console.log('res?.data?.token', res?.User?.token);
          
          sessionStorage.setItem('token', res?.User?.token)
          sessionStorage.setItem('email', res?.User?.email)
          this.spinner.hide();
          // this.getPDtata()
          this.uiService.success('You are successfully logged in');
          this.router.navigate(['/', 'dashboard']);

        } else {
          console.log('Error! Please try again.')
          
        }
      },
      error: (err) => {
        console.log(err)
        this.uiService.wrong(err?.error?.error);
        this.spinner.hide();
      }
    })
  }


  /**
  * ON DESTROY
  */
  ngOnDestroy() {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
  }

}

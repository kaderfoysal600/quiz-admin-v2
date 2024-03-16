import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  allUser;
  hide = true;
  hide1 = true;
  originalData


  resetForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
  ) {

    this.resetForm = this.formBuilder.group({
      user_id: ['', Validators.required],
      newPassword: [
        '',
        [
          Validators.required,
          this.passwordValidator // Add the custom password validator
        ]
      ],
      confirmNewPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllUser()
  }


  // Custom password validator function
  passwordValidator(control) {
    const password = control.value;
    // Check for minimum length of 8 characters
    if (password.length < 8) {
      return { minLength: true };
    }

    // Check for at least one small letter, one capital letter, one digit, and one special character
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[0-9a-zA-Z$@$!%*?&]*$/;
    if (!passwordPattern.test(password)) {
      return { pattern: true };
    }

    // You can add additional checks for not containing the email portion or user id here

    return null; // Return null if the password is valid
  }

  // Create a method to handle the form submission
  onSubmit() {
    if (this.resetForm.valid) {
      console.log('Password reset logic goes here', this.resetForm.value);

      this.authService.resetPassword(this.resetForm.value).subscribe({
        next: (res) => {
          if (res) {
            console.log('res from api', res)
            this._snackBar.open('Password Updated Successfully', '', {
              duration: 2000,
              panelClass: ['green-snackbar']
            })
            this.resetForm.reset();
            // this.router.navigate(['/', 'list-user']);

          } else {
            console.log('Error! Please try again.')
            this._snackBar.open('Error! Please try again.', '', {
              duration: 2000,
              panelClass: ['red-snackbar']
            })
          }
        },
        error: (err) => {
          console.log('err', err)
          this._snackBar.open(err.error.error, '', {
            duration: 2000,
            panelClass: ['red-snackbar']
          })
        }
      })



    }
  }



  getAllUser() {
    let  userType_company = {
      user_type :  sessionStorage.getItem('user_type'),
      company_id: sessionStorage.getItem('company_id')
    }
    this.authService.getAllUser(userType_company).subscribe({
      next: (res) => {
        if (res) {
          this.allUser = res
          this.originalData = res;
          console.log('res', res)
        } else {
          console.log('Error! Please try again.')
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    let searchText = filterValue.trim().toLowerCase();

    if (searchText) {
      this.allUser = this.originalData.filter(item => {
        const concatenatedName = (item.dataValues.first_name + item.dataValues.last_name).toLowerCase().replace(/\s/g, '');
        const emailMatch = item.dataValues.email.toLowerCase().includes(searchText);
        const nameMatch = concatenatedName.includes(searchText);
        
        // Include both email and name matches in the result
        return emailMatch || nameMatch;
    });


    } else {
      this.allUser =this.originalData;
    }
  }

}

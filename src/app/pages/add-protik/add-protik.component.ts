import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-add-protik',
  templateUrl: './add-protik.component.html',
  styleUrls: ['./add-protik.component.scss'],
})
export class AddProtikComponent implements OnInit {
  selectedFile: any = null;
  allDivision;
  allSubDivision;
  images: any;
  imgurl: any = null;

  // Reactive Form
  loginForm: FormGroup;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  constructor(
    private authService: AuthService,
    public router: Router,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      name: [''],
      slag: [''],
      protik: [''],
      photo: [''],
      // protik_photo: [''],
    });
  }
  onFileSelected(event) {
    if (event.target.files.length > 0) {
      const image = event.target.files[0];
      this.selectedFile = event.target.files[0];
      this.images = image;

      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imgurl = reader.result;
      };
      reader.readAsDataURL(this.images);
    }
  }

  /**
   * Login
   */
  onLogin() {
    if (this.loginForm.invalid) {
      console.log('Invalid Input field!');
      return;
    }
    const formData = new FormData();
    formData.append('name', this.loginForm.get('name').value);
    formData.append('slag', this.loginForm.get('slag').value);
    formData.append('protik', this.loginForm.get('protik').value);
    formData.append('photo', this.images);
    // formData.append('protik_photo', this.images1);
    console.log('log from data from frontend', formData);

    this.subDataTwo = this.authService.addProtik(formData).subscribe({
      next: (res) => {
        if (res) {
          console.log('res from api', res);
          console.log('user created successfully');
          this._snackBar.open('User Created Successfully', '', {
            duration: 2000,
            panelClass: ['green-snackbar'],
          });
          // this.router.navigate(['/', 'list-member']);
        } else {
          console.log('Error! Please try again.');
        }
      },
      error: (err) => {
        console.log(err);
        this._snackBar.open(err.error.error, '', {
          duration: 2000,
          panelClass: ['red-snackbar'],
        });
      },
    });
  }

  /**
   * ON DESTROY
   */
  ngOnDestroy() {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
    if (this.subDataTwo) {
      this.subDataTwo.unsubscribe();
    }
  }
}

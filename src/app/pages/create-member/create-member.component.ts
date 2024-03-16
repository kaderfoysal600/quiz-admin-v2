import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-create-member',
  templateUrl: './create-member.component.html',
  styleUrls: ['./create-member.component.scss'],
})
export class CreateMemberComponent implements OnInit {
  selectedFile: any = null;
  allDivision;
  allSubDivision;
  allProtik;
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
    this.getAllDivision();
    this.getAllSubDivision();
    this.getAllProtik();
    this.loginForm = this.fb.group({
      name: [''],
      slag: [''],
      ashon_no: [''],
      perticipation: [''],
      win: [''],
      division_id: [''],
      sub_division_id: [''],
      protik_id: [''],
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
    formData.append('ashon_no', this.loginForm.get('ashon_no').value);
    formData.append('perticipation', this.loginForm.get('perticipation').value);
    formData.append('win', this.loginForm.get('win').value);
    formData.append('division_id', this.loginForm.get('division_id').value);
    formData.append('protik_id', this.loginForm.get('protik_id').value);
    formData.append(
      'sub_division_id',
      this.loginForm.get('sub_division_id').value
    );
    formData.append('photo', this.images);
    // formData.append('protik_photo', this.images1);
    console.log('log from data from frontend', formData);

    this.subDataTwo = this.authService.addMember(formData).subscribe({
      next: (res) => {
        if (res) {
          console.log('res from api', res);
          console.log('user created successfully');
          this._snackBar.open('User Created Successfully', '', {
            duration: 2000,
            panelClass: ['green-snackbar'],
          });
          this.router.navigate(['/', 'list-member']);
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

  getAllDivision() {
          // Get the token from sessionStorage
  const token = sessionStorage.getItem('token');

  // Check if token exists
  if (!token) {
    console.log('Token not found. Please log in.');
    // this.spinner.hide();
    return;
  }

  // Create headers with Authorization token
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  console.log('Headers:', headers); 
    this.authService.getAllDivision(headers).subscribe({
      next: (res) => {
        if (res) {
          this.allDivision = res;
          console.log(res);
        } else {
          console.log('Error! Please try again.');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAllSubDivision() {
    this.authService.getAllSubDivision().subscribe({
      next: (res) => {
        if (res) {
          this.allSubDivision = res;
          console.log(res);
        } else {
          console.log('Error! Please try again.');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAllProtik() {
    this.authService.listProtik().subscribe({
      next: (res) => {
        if (res) {
          this.allProtik = res;
          console.log(res);
        } else {
          console.log('Error! Please try again.');
        }
      },
      error: (err) => {
        console.log(err);
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

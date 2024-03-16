import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  selectedValue: string;
  allRoles
  selectedFile: any = null;
  allCompany
  originalData

  //extra
  imageSrc: any;

  allGender: string[] = ['Male', 'Female', 'Others',];
  // Static Data
  allStatus: any[] = [
    { value: 1, viewValue: 'Active' },
    { value: 0, viewValue: 'Inactive' }
  ];
  userTypes = [
    { viewValue: 'Super Admin', value: 'super_admin' },
    { viewValue: 'User Admin', value: 'user_admin' },
    { viewValue: 'Comapny Manager', value: 'comapny_manager' },
    { viewValue: 'Company Admin', value: 'company_admin' },
    { viewValue: 'Company Member', value: 'company_member' },
  ];
  userTypesUpdated

  

  images: any;
  imgurl: any = null
  // Reactive Form
  loginForm: FormGroup;


  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;

  constructor(private authService: AuthService, public router: Router, private fb: FormBuilder, private _snackBar: MatSnackBar) { }
  ngOnInit(): void {
    this.filterUserType()
    this.loginForm = this.fb.group({
      first_name: [''],
      last_name: [''],
      mobile: [''],
      email: [''],
      address: [''],
      role_id: [''],
      gender: [''],
      password: [''],
      photo: [''],
      user_type: [''],
      company_id: [[]],
      status: [null, Validators.required],
      created_by:[sessionStorage.getItem('id')],
    });
    this.getRoleData()
    this.getAllcompany()
    this.originalData = this.allCompany

  }
  onFileSelected(event) {
    if (event.target.files.length > 0) {
      const image = event.target.files[0]
      this.selectedFile = event.target.files[0]
      this.images = image

      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imgurl = reader.result;


      };
      reader.readAsDataURL(this.images);
    }
  }

  filterUserType(){
    let user_type = sessionStorage.getItem('user_type');
    if (user_type === 'super_admin'){
      this.userTypesUpdated = this.userTypes;
    }
    if (user_type === 'user_admin'){
      this.userTypesUpdated = this.userTypes.filter(item=> item.value !== 'super_admin');
    }
    else if (user_type === 'comapny_manager'){
      this.userTypesUpdated = this.userTypes.filter(item=> item.value !== 'super_admin' && item.value !== 'user_admin' && item.value !== 'comapny_manager');
    }
    else if (user_type === 'company_admin'){
      this.userTypesUpdated = this.userTypes.filter(item=> item.value !== 'super_admin'  && item.value !== 'user_admin' && item.value !== 'comapny_manager');
    }
  }


  getRoleData() {
    this.subDataOne = this.authService.getAllrole().subscribe({
      next: (res) => {
        if (res) {
          this.allRoles = res
          console.log(res)

        } else {
          console.log('Error! Please try again.')
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
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
    formData.append('first_name', this.loginForm.get('first_name').value);
    formData.append('last_name', this.loginForm.get('last_name').value);
    formData.append('mobile', this.loginForm.get('mobile').value);
    formData.append('email', this.loginForm.get('email').value);
    formData.append('address', this.loginForm.get('address').value);
    formData.append('role_id', this.loginForm.get('role_id').value);
    formData.append('gender', this.loginForm.get('gender').value);
    formData.append('password', this.loginForm.get('password').value);
    formData.append('photo', this.images);
    formData.append('user_type', this.loginForm.get('user_type').value);
    formData.append('status', this.loginForm.get('status').value);
    formData.append('company_id', JSON.stringify(this.loginForm.get('company_id').value));
    formData.append('created_by', sessionStorage.getItem('id'));
    console.log('log from data from frontend', formData);

    this.subDataTwo =
     this.authService.addUser(formData).subscribe({
      next: (res) => {
        if (res) {
          console.log('res from api', res)
          console.log('user created successfully')
          this._snackBar.open('User Created Successfully', '', {
            duration: 2000,
            panelClass: ['green-snackbar']
          })
          this.router.navigate(['/', 'list-user']);

        } else {
          console.log('Error! Please try again.')
        }
      },
      error: (err) => {
        console.log(err)
        this._snackBar.open(err.error.error, '', {
          duration: 2000,
          panelClass: ['red-snackbar']
        })
      }
    })
  }



  ////get all company 
  getAllcompany() {
    this.authService.getAllCompanyWithoutPegi().subscribe({
      next: (res) => {
        if (res) {
          this.allCompany = res;
          this.originalData = res;
          console.log(res)

        } else {
          console.log('Error! Please try again.')
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  isCompanyRequired() {
    return this.loginForm.get('user_type').value === 'comapny_manager' || this.loginForm.get('user_type').value === 'company_admin' || this.loginForm.get('user_type').value === 'company_member';
  }
  isCompanyManagerSelected() {
    const userTypeControl = this.loginForm.get('user_type');
    return userTypeControl.value === 'comapny_manager'; // Change the value to match the "Company Manager" value in your userTypes array
  }
  isSuperAdminSelected() {
    const userTypeControl = this.loginForm.get('user_type');
    return userTypeControl.value !== 'super_admin'; // Change the value to match the "Company Manager" value in your userTypes array
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    let searchText = filterValue.trim().toLowerCase();
    if (searchText) {
      this.allCompany = this.originalData.filter(item => item.name.toLowerCase().includes(searchText));
    } else {
      this.allCompany = this.originalData;
    }
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

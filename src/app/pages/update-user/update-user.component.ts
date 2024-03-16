import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  allRoles
  allUser
  singleUser
  selectedFile: any = null;
  images: any;
  imgurl: any = null;
  loginForm: FormGroup;
  allGender: string[] = ['Male', 'Female', 'Other',];
  Id: string;
  oldPhoto: any;
  allCompany;
  changeImage = false;

  userTypes = [
    { viewValue: 'Super Admin', value: 'super_admin' },
    { viewValue: 'User Admin', value: 'user_admin' },
    { viewValue: 'Comapny Manager', value: 'comapny_manager' },
    { viewValue: 'Company Admin', value: 'company_admin' },
    { viewValue: 'Company Member', value: 'company_member' },
  ];
  userTypesUpdated
  allStatus: any[] = [
    { value: 1, viewValue: 'Active' },
    { value: 0, viewValue: 'Inactive' }
  ];

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;

  constructor(
    private authService: AuthService,
    public router: Router,
    private fb: FormBuilder,
    private _route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.filterUserType();
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
      status: [null],
      updated_by: [sessionStorage.getItem('id')],
    });
    this.getRoleData();
    this.getAllcompany()
    this._route.paramMap.subscribe(params => {
      this.Id = params.get("id");
      console.log('Id', this.Id);

    });
    console.log('this.singleUser', this.singleUser);
    this.getUserById()

  }

  getUserById() {
    let  userType_company = {
      user_type :  sessionStorage.getItem('user_type'),
      company_id: sessionStorage.getItem('company_id')
    }
    this.spinner.show();
    this.subDataOne = this.authService.getAllUser(userType_company).subscribe({
      next: (res) => {
        if (res) {
          console.log('edittttt', res);

          this.allUser = res
          this.singleUser = this.allUser.find(user => user?.dataValues?.id == this.Id)
          console.log('this.singleUser.dataValues?.user_type', this.singleUser.dataValues?.user_type);

          if (this.singleUser.dataValues?.user_type === "company_admin" || this.singleUser.dataValues?.user_type === "company_member") {
            console.log('aaaa of');
            
            this.singleUser = { ...this.singleUser, company_id: parseInt(this.singleUser.dataValues?.company_id) }
          }


          else {
            console.log('this.singleUser?.company_id', this.singleUser?.dataValues?.company_id);
            const company_str = this.singleUser.dataValues?.company_id; 
            console.log('company_str', company_str);
            
            const company_array = company_str ? company_str.split(',').map(Number) : [];

            // const company_arr = [...this.singleUser.company_id]
            console.log('company_arr', company_array);

            this.singleUser = { ...this.singleUser, company_id: company_array }
          }

          console.log('singleUser', this.singleUser)
          this.setUser(this.singleUser);
          console.log('this.singleUser.photo', this.singleUser.photo);

          this.selectedFile = this.singleUser.dataValues?.photo
          this.spinner.hide();

        } else {
          console.log('Error! Please try again.')
        }
      },
      error: (err) => {
        console.log(err)
        this.spinner.hide();
      }
    })
  }

  onFileSelected(event) {
    this.changeImage = true;
    if (event.target.files.length > 0) {
      const image = event.target.files[0]
      this.images = image
      this.selectedFile = event.target.files[0].name

      var reader = new FileReader();
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
      this.userTypesUpdated = this.userTypes.filter(item=> item.value !== 'super_admin' && item.value !== 'user_admin' );
    }
    else if (user_type === 'company_admin'){
      this.userTypesUpdated = this.userTypes.filter(item=> item.value !== 'super_admin'  && item.value !== 'user_admin' && item.value !== 'comapny_manager');
    }
  }


  ////get all company 
  getAllcompany() {
    this.authService.getAllCompanyWithoutPegi().subscribe({
      next: (res) => {
        if (res) {
          this.allCompany = res
          console.log('company res', res)

        } else {
          console.log('Error! Please try again.')
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  getRoleData() {
    this.spinner.show();
    this.subDataTwo = this.authService.getAllrole().subscribe({
      next: (res) => {
        if (res) {
          this.allRoles = res
          console.log('role res', res)
          this.spinner.hide();

        } else {
          console.log('Error! Please try again.')
        }
      },
      error: (err) => {
        console.log(err)
        this.spinner.hide();
      }
    })
  }

  setUser(data) {
    console.log('old data', data);
    this.oldPhoto = data?.dataValues?.photo
    //console.log(sim); //[0]  added
    this.loginForm.patchValue({
      first_name: data?.dataValues?.first_name,
      last_name: data?.dataValues?.last_name,
      mobile: data?.dataValues?.mobile,
      email: data?.dataValues?.email,
      address: data?.dataValues?.address,
      role_id: data?.dataValues?.role_id,
      gender: data?.dataValues?.gender,
      user_type: data?.dataValues?.user_type,
      company_id: data.company_id,
      photo: data?.dataValues?.photo,
      password: data?.dataValues?.password,
      status: data?.dataValues?.status,
      updated_by: sessionStorage.getItem('id')
    });
  }


  /**
* Login
*/
  onUpdate() {
    if (this.loginForm.invalid) {
      console.log('Invalid Input field!');
      return;
    }

    let inputEmail = this.loginForm.get('email').value;

    let x = this.allUser.find(user => user?.dataValues?.email === inputEmail && this.singleUser.dataValues?.email !== inputEmail)

    if (x) {
      this._snackBar.open('Email Alrealdy Exit', '', {
        duration: 2000,
        panelClass: ['red-snackbar']
      })
    }

    console.log('x', x);
    if (sessionStorage.getItem('id') == this.Id) {
      sessionStorage.setItem('email', this.loginForm.get('email').value)
    }
    if (!x) {
      const formData = new FormData();
      formData.append('first_name', this.loginForm.get('first_name').value);
      formData.append('last_name', this.loginForm.get('last_name').value);
      // formData.append('name', this.loginForm.get('first_name').value);
      formData.append('mobile', this.loginForm.get('mobile').value);
      formData.append('email', this.loginForm.get('email').value);
      formData.append('address', this.loginForm.get('address').value);
      formData.append('role_id', this.loginForm.get('role_id').value);
      formData.append('gender', this.loginForm.get('gender').value);
      formData.append('user_type', this.loginForm.get('user_type').value);
      formData.append('company_id', JSON.stringify(this.loginForm.get('company_id').value));
      formData.append('password', this.loginForm.get('password').value);
      formData.append('status', this.loginForm.get('status').value);
      formData.append('updated_by', sessionStorage.getItem('id'));
      if (this.images == undefined) {
        formData.append('photo', this.oldPhoto);
        console.log("formData.append('photo',this.oldPhoto);", formData.append('photo', this.oldPhoto));
      }
      else if (this.images) {
        formData.append('photo', this.images);
      }





      this.subDataThree = this.authService.updateUserById(this.Id, formData).subscribe({
        next: (res) => {
          if (res) {
            this.spinner.hide();
            console.log('res from api', res)
            this._snackBar.open('User Updated Successfully', '', {
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
          this.spinner.hide();
          this._snackBar.open('Something Went wrong', '', {
            duration: 1000,
            panelClass: ['red-snackbar']
          })
        }
      })


    }

  }


  isCompanyRequired() {
    return this.loginForm.get('user_type').value === 'comapny_manager' || this.loginForm.get('user_type').value === 'company_admin' || this.loginForm.get('user_type').value === 'company_member';
  }

  isCompanyManagerSelected() {
    const userTypeControl = this.loginForm.get('user_type');
    return userTypeControl.value === 'comapny_manager'; // Change the value to match the "Company Manager" value in your userTypes array
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
    if (this.subDataThree) {
      this.subDataThree.unsubscribe();
    }
  }


}

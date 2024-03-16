import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProfileEditComponent } from 'src/app/dialog/profile-edit/profile-edit.component';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {

  LoggedInUserId = sessionStorage.getItem('id');
  allUser;
  singleUser;
  allRole;
  AllCompany;
  showCompanyName = false;


    // Image Upload
    imageChangedEvent: any = null;
    imgPlaceHolder = '/assets/svg/user.svg';
  
    pickedImage?: any;
    file: any = null;
    newFileName: string;
  
    imgBlob: any = null;


  //loggedinUser Data
  Id = sessionStorage.getItem('id');
  first_name = sessionStorage.getItem('first_name');
  last_name = sessionStorage.getItem('last_name');
  photo = sessionStorage.getItem('photo');
  email = sessionStorage.getItem('email');
  mobile = sessionStorage.getItem('mobile');
  gender = sessionStorage.getItem('gender');
  user_type = sessionStorage.getItem('user_type');
  company_id = sessionStorage.getItem('company_id');
  status = sessionStorage.getItem('status');  
  address = sessionStorage.getItem('address');



  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAllUserById()
    this.check()
  }
  check(){
    if(this.user_type === "super_admin" || this.user_type === "user_admin"){
      this.showCompanyName = false;
    }else{
      this.showCompanyName = true;
    }
  }


  getAllUserById() {
    let  userType_company = {
      user_type :  sessionStorage.getItem('user_type'),
      company_id: sessionStorage.getItem('company_id')
    }
    this.authService.getAllUser(userType_company).subscribe({
      next: (res) => {
        if (res) {
          console.log('res from api', res)
          this.allUser = res
          let x = this.allUser.find(user => user?.dataValues.id == this.LoggedInUserId);
          this.singleUser = x.dataValues
          console.log('this.singleUser', this.singleUser);
          this.getAllRole()
        } else {
          console.log('Error! Please try again.')
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }




  getAllRole() {
    this.spinner.show();
    this.authService.getAllrole().subscribe({
      next: (res) => {
        if (res) {
          this.allRole = res
          console.log(res)
          this.getAllCompany()
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

  getAllCompany() {
    this.spinner.show();
    this.authService.getAllCompanyWithoutPegi().subscribe({
      next: (res) => {
        if (res) {
          this.AllCompany = res
          console.log(res)
          this.updateSingleUser()
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

  updateSingleUser() {
    console.log('this.singleUser.role_id', this.singleUser)
    console.log('company', this.AllCompany);


    let x = this.allRole.find(role => role.id == this.singleUser.role_id);

    let y = this.AllCompany.find(company => company.id == this.singleUser.company_id);
    console.log('x', x)
    console.log('yyyyy', y);

    let companyIds = this.singleUser?.company_id;
    const matchingCompanies = this.AllCompany?.filter((company) => companyIds.includes(company.id));

    console.log('matchingCompanies', matchingCompanies.name);

    this.singleUser = { ...this.singleUser, roleName: x?.name, companyName: matchingCompanies };

  }



  public openEditControllerDialog() {
    let data = {
      first_name: this.first_name,
      last_name: this.last_name,
      mobile: this.mobile,
      gender: this.gender,
    }
    console.log('data open to dialog', data)
    const dialogRef = this.dialog.open(ProfileEditComponent, {
      maxWidth: '600px',
      width: '95%',
      data: data,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult && dialogResult.data) {
        if (data) {
          console.log('edit data ee', data);
          this.updateProfileInfo(dialogResult.data)
          // this.updateRoleById(data.id, dialogResult.data);
        }
        //  else {
        //   this.addRole(dialogResult.data);
        // }
      }
    });
  }


  updateProfileInfo(data) {
    this.authService.updateProfileById(this.Id, data).subscribe({
      next: (res) => {
        if (res) {
          this.spinner.hide();
          console.log('res from api', res)
          sessionStorage.setItem('first_name', res['data'].first_name)
          sessionStorage.setItem('last_name', res['data'].last_name)
          sessionStorage.setItem('gender', res['data'].gender)
          sessionStorage.setItem('mobile', res['data'].mobile)
          this.first_name = sessionStorage.getItem('first_name')
          this.last_name = sessionStorage.getItem('last_name')
          this.mobile = sessionStorage.getItem('mobile')
          this.gender = sessionStorage.getItem('gender')
          this._snackBar.open('User Updated Successfully', '', {
            duration: 2000,
            panelClass: ['green-snackbar']
          })

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

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  //store Data
  totalUser = 0;
  totalCompany = 0;
  totalDevice = 0;
  totalWarrentyDevice = 0;
  withoutWarrentyDevice = 0;
  currentWarrentyDevice = 0;
  totalSelleingDevice = 0;

  // Subscriptions
  private subDataOne: Subscription;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getAllUser()
    this.getAllCompany()
    this.getAllDevice()
    this.listCompanyDevice()
  }

  getAllUser() {
    let  userType_company = {
      user_type :  sessionStorage.getItem('user_type'),
      company_id: sessionStorage.getItem('company_id')
    }

    this.subDataOne = this.authService.getAllUserWithPegi(1, null, null, userType_company).subscribe({
      next: (res) => {
        if (res) {
          this.totalUser = res['data'].length;
        } else {
          console.log('Error! Please try again.')
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  getAllCompany() {
    let  userType_company = {
      user_type :  sessionStorage.getItem('user_type'),
      company_id: sessionStorage.getItem('company_id')
    }
    this.subDataOne = this.authService.getAllCompany(1, null, null, userType_company).subscribe({
      next: (res) => {
        if (res) {
          console.log('company res ', res);
          
          this.totalCompany = res['data'].length;

        } else {
          console.log('Error! Please try again.')
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  getAllDevice() {
    this.subDataOne = this.authService.getAllDevice(1, null, null).subscribe({
      next: (res) => {
        if (res) {
          this.totalDevice = res['totalData'];
        } else {
          console.log('Error! Please try again.')
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  listCompanyDevice() {
    this.authService.listCompanyDevice().subscribe({
      next: (res: any) => {
        console.log('list comapny device ', res);
        this.totalSelleingDevice = res.data.length;
        this.totalWarrentyDevice = res.totalWarrentyDevice;
        this.withoutWarrentyDevice = res.withoutWarrentyCount;
        this.currentWarrentyDevice = res.currentWarrentyCount;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  companyAndDeviecePermission(){
    const user_type = sessionStorage.getItem('user_type');
    if(user_type ==='company_admin' || user_type ==='company_member'){
      return false;
    }else{
      return true;
    }
  }

}

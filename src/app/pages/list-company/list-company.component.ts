import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CompanyComponent } from 'src/app/dialog/company/company.component';
import { AuthService } from 'src/app/service/auth.service';
import { UiService } from 'src/app/service/ui.service';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/shared/dialog/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-list-company',
  templateUrl: './list-company.component.html',
  styleUrls: ['./list-company.component.scss']
})
export class ListCompanyComponent implements OnInit {
//search
  searchForm: FormGroup;
  searchData = null;

  editDeletePermission;

  //storeData
  allCompany: any = null;

  dataSource
  displayedColumns = [ 'action','SlNo', 'Name', 'Contact Name',
    'Max','Remarks', 'Created', 'Updated','status',];
  allStatus: any[] = [
    { value: 1, viewValue: 'Active' },
    { value: 0, viewValue: 'Inactive' }
  ];
  searchClicked = false;

  // Pagination
  page: number = 1;
  itemsPerPage = 3;
  totalItems: any;
  currPage: number = 1;
  showPegination = true;




  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subDataFour: Subscription;

  constructor(
    private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private uiService: UiService,
    private fb: FormBuilder,
    private router :Router,
  ) {
    this.searchForm = this.fb.group({
      name: '',
      status: '',
      contactEmail: '',
      contactNumber: '',
    });
  }

  ngOnInit(): void {

    this.getAllCompany(null);  
    this.checkEditDeletePermission()
  }

  
  
  
  
  

  onSearchClick(p) {
    const formData = this.searchForm.value;
    console.log(formData);
    this.searchData = formData;

    let x = p
    if (p > 1) {
      x = 1;
    }
    console.log('p', p);

    this.getAllCompany(x);
    this.page = 1
  }
  onClearFilter() {
    this.searchForm.reset();
    this.searchData = {};
    this.getAllCompany(null);
    this.showPegination = true;
  }

  getAllCompany(page) {
    this.updateDataSource(this.allCompany)
    let  userType_company = {
      user_type :  sessionStorage.getItem('user_type'),
      company_id: sessionStorage.getItem('company_id')
    }

    this.subDataOne = this.authService.getAllCompany(page, this.itemsPerPage, this.searchData, userType_company).subscribe({
      next: (res) => {
        if (res) {
          console.log('allPermissionGroupItemSearch', res);
          this.allCompany = res['data']
          console.log('ressss', res);
          
          if (res['totalData'] !== 0) {
            this.totalItems = res['totalData'];
          } else if (res['totalData'] === 0) {
            this.showPegination = false;
            console.log('this.showPegination ', this.showPegination)
          }

          this.updateDataSource(this.allCompany)

        } else {
          console.log('Error! Please try again.')
        }
      },
      error: (err) => {
        console.log(err)
      }
    })

  }


  checkEditDeletePermission() {
    const userType = sessionStorage.getItem('user_type');
  
    if (userType === 'super_admin' || userType === 'user_admin') {
      return true;
    } else if (userType === 'company_manager') {
      return false;
    } else {
      // Handle the case where userType is undefined or doesn't match any expected values
      return false;
    }
  }


  public openEditControllerDialog(data?: any) {
    const dialogRef = this.dialog.open(CompanyComponent, {
      maxWidth: '600px',
      width: '95%',
      data: data,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult && dialogResult.data) {
        if (data) {
          this.updateCompany(data.id, dialogResult.data);
        } else {
          this.addCompany(dialogResult.data);
        }
      }
    });
  }

  addCompany(data: any) {
    this.subDataTwo =
      this.authService.addComapny(data)
        .subscribe({
          next: (res) => {
            console.log('res', res)
            if (res) {
              console.log('Company successfully', res)
              this.uiService.success('Company successfully');
              this.getAllCompany(this.currPage)
            } else {
              console.log('Error! Please try again.')
            }
          },
          error: (err) => {
            console.log(err)
          }
        })
  }

  public updateCompany(id: string, data: any) {
    this.subDataThree =
      this.authService.updateCompany(id, data).subscribe({
        next: (res) => {
          console.log(res);
          this.uiService.success('Company Updated successfully');
          if (res) {
            this.getAllCompany(this.currPage)
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  deleteCompany(id: string) {
    console.log('id', id)
    this.subDataFour = this.authService.deleteCompany(id).subscribe({
      next: (res) => {
        console.log('res', res);
        this.uiService.success('Compay deleted successfully');
        if (res) {
          this.getAllCompany(this.currPage)
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  public openConfirmDialog(data?: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want delete this data?'
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.deleteCompany(data.id);
      }
    });
  }

  updateDataSource(newData: any[]) {
    this.dataSource = newData;
    console.log('this.dataSource ', this.dataSource)
    // Notify the MatTable that the data has changed
    this.changeDetectorRef.detectChanges();
  }

  exportCSV() {
    // Define the columns you want to export
    const columns = ['Name', 'Contact Name',
      'Max User', 'Max Role', 'Max Device', 'Remarks', 'Created_time', 'Created_by', 'status'];

    // Convert table data to an array of arrays
    const tableData = [columns]; // Start with the header row

    // Populate the data rows
    for (const item of this.allCompany) {
      const rowData = [
        item.name,
        item.contactName,
        item.maxUser,
        item.maxRole,
        item.maxDevice,
        item.remarks,
        item.created_time,
        item.created_by,
        item.status === 0 ? 'Inactive' : 'Active',
      ];
      tableData.push(rowData);
    }

    // Convert the tableData array into a CSV string
    const csvContent = tableData.map(row => row.join(',')).join('\n');

    // Create a Blob with the CSV data
    const blob = new Blob([csvContent], { type: 'text/csv' });

    // Save the CSV file using FileSaver
    saveAs(blob, 'exported_data.csv');
  }

  addDevice(data) {
    this.router.navigate(["/comapny/device", data.id]);
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
      if (this.subDataFour) {
        this.subDataFour.unsubscribe();
      }
    }


}

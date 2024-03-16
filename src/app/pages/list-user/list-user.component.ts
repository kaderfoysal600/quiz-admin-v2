import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { UserEditDialogComponent } from 'src/app/dialog/user-edit-dialog/user-edit-dialog.component';
import { AuthService } from 'src/app/service/auth.service';
import { TableUtil } from 'src/app/shared/pdfxl/tableUtl';
import { TableXl } from 'src/app/shared/pdfxl/tableXl';
import * as XLSX from 'xlsx-js-style';
import { saveAs } from 'file-saver';
import { ConfirmDialogComponent } from 'src/app/shared/dialog/confirm-dialog/confirm-dialog.component';
import { ViewUserDialogComponent } from 'src/app/dialog/view-user-dialog/view-user-dialog.component';
export interface Pagination {
  pageSize: string | number;
  currentPage: string | number;
}

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  allUser: any;
  allRole: any;
  loggedInUserRolePermission: any;
  isHovered = false;

  // Pagination
  // p: number = 1;
  allCompany


  // Pagination
  page: number = 1;
  itemsPerPage = 20;
  totalItems: any;
  currPage: number = 1;
  showPegination = true;


  //search
  searchForm: FormGroup;
  searchData = null;
  searchClicked = false;
  allStatus: any[] = [
    { value: 1, viewValue: 'Active' },
    { value: 0, viewValue: 'Inactive' }
  ];

  //user-type data
  userTypes = [
    { viewValue: 'Super Admin', value: 'super_admin' },
    { viewValue: 'User Admin', value: 'user_admin' },
    { viewValue: 'Comapny Manager', value: 'comapny_manager' },
    { viewValue: 'Company Admin', value: 'company_admin' },
    { viewValue: 'Company Member', value: 'company_member' },
  ];
  userTypesUpdated


  //permission
  addUserPermission: Boolean = false;
  editUserPermission: Boolean = false;
  deleteUserPermission: Boolean = false;
  exportUserPermission: Boolean = false;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subDataFour: Subscription;
  private subDataFive: Subscription;
  LoggedInUserRoleId: any;



  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
  ) {
    this.searchForm = this.fb.group({
      first_name: '',
      status: '',
      contactEmail: '',
      contactNumber: '',
      user_type:'',
      user_role : '',
      user_company : ''
    });
  }

  ngOnInit(): void {
    this.getAllRole();
 this.filterUserType()
    this.getAllcompany()
    // this.getAllUser();
    this.getLoggedInUserRoleId();
    this.getLogedInUserPermission();
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
  onSearchClick(p) {
    const formData = this.searchForm.value;
    this.searchData = formData;
    console.log('this.searchData', this.searchData);
    let x = p
    if (p > 1) {
      x = 1;
    }
    console.log('p', p);

    this.getAllUserWithPegi(x);
    this.page = 1
  }
  onClearFilter() {
    this.searchForm.reset();
    this.searchData = {};
    this.getAllUserWithPegi(null);
    this.showPegination = true;
  }


  getAllUserWithPegi(page) {
    // this.updateDataSource(this.allCompany)
  let  userType_company = {
      user_type :  sessionStorage.getItem('user_type'),
      company_id: sessionStorage.getItem('company_id')
    }

    this.subDataOne = this.authService.getAllUserWithPegi(page, this.itemsPerPage, this.searchData, userType_company).subscribe({
      next: (res) => {
        if (res) {
          console.log('alluser With Pegi', res);
          this.allUser = res['data'];
          console.log(' this.allUser', this.allUser);

          // this.addCreatedByNames(this.allUser)
          if (res['totalData'] !== 0) {
            this.totalItems = res['totalData'];
            // this.getAllUserWithRoleName(res['data'])
            this.getAllUserWithCompanyName(this.allUser)
          } else if (res['totalData'] === 0) {
            this.showPegination = false;
            console.log('this.showPegination ', this.showPegination)
          }

          // this.updateDataSource(this.allCompany)

        } else {
          console.log('Error! Please try again.')
        }
      },
      error: (err) => {
        console.log(err)
      }
    })

  }

  getLoggedInUserRoleId() {
    this.LoggedInUserRoleId = sessionStorage.getItem('role');
    console.log(' this.LoggedInUserRoleId', this.LoggedInUserRoleId);
  }


  getAllRole() {
    this.subDataFour = this.authService.getAllrole().subscribe({
      next: (res) => {
        if (res) {
          this.allRole = res
          console.log('all-role',res);
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

  addCreatedByNames(users) {
    this.allUser = users.map(user => {
      const created_by_user = users.find(u => {
        console.log('u', u.id);
        console.log('user.created_by', user.created_by);

        return u.id == user.created_by
      });
      return {
        ...user,
        created_by_name: created_by_user ? created_by_user.first_name : null
      };
    });
    console.log(' this.allUser with name', this.allUser)
  }


  // getAllUser() {
  //   this.spinner.show();
  //   this.subDataOne =
  //     this.authService.getAllUser().subscribe({
  //       next: (res) => {
  //         if (res) {
  //           this.spinner.hide();
  //           console.log('res', res)
  //           this.getAllUserWithRoleName(res)

  //         } else {
  //           console.log('Error! Please try again.')
  //         }
  //       },
  //       error: (err) => {
  //         console.log(err)
  //         this.spinner.hide();
  //       }
  //     })
  // }



  getLogedInUserPermission() {

    this.subDataFive = this.authService.getAllRolePermission(this.LoggedInUserRoleId).subscribe({
      next: (res) => {
        if (res) {
          this.loggedInUserRolePermission = res['data']
          console.log('res12', res['data'])
          this.spinner.hide();
          this.updateloggedInUserRolePermission()

        } else {
          console.log('Error! Please try again.')
        }
      },
      error: (err) => {
        this.spinner.hide();
        console.log(err)
      }
    })
  }


  updateloggedInUserRolePermission() {
    console.log(' this.loggedInUserRolePermission',  this.loggedInUserRolePermission);
    if (this.LoggedInUserRoleId == 1) {
      this.addUserPermission = true;
      this.editUserPermission = true;
      this.deleteUserPermission = true;
      this.exportUserPermission = true;
    } else {
       this.loggedInUserRolePermission.forEach((item: any) => {
      switch (item.permission) {
        case 'user_add':
          this.addUserPermission = true;
          break;
        case 'user_edit':
          this.editUserPermission = true;
          break;
        case 'user_delete':
          this.deleteUserPermission = true;
          break;
        case 'user_export':
          this.exportUserPermission = true;
          break;
        // Add more cases for other permissions if needed
        default:
          break;
      }
    })

    }
   
  }



  // getAllUserWithRoleName(totalUser) {

  //   const usersWithRoleName = totalUser.map((user) => {

  //     const matchingRole = this.allRole?.find((role) => user?.dataValues?.role_id == role.id);
  //     console.log('matchingRole', matchingRole);

  //     if (matchingRole) {
  //       this.spinner.hide();
  //       return { ...user, role_name: matchingRole.name };
  //     } else {
  //       return user;
  //     }


  //   });

  //   this.allUser = usersWithRoleName;
  //   console.log('this.allUser101', this.allUser);
  //   this.getAllUserWithCompanyName(this.allUser)

  // }

  getAllUserWithCompanyName(totalUser) {
    const usersWithComapnyName = totalUser.map((user) => {
      console.log(' user.company_id', user?.company_id);
      if (user?.company_id?.length <= 1 || !user?.company_id) {
        const matchingCompany = this.allCompany?.find((comapny) => user?.company_id == comapny?.id);
        this.spinner.hide();
        if (matchingCompany) {
          this.spinner.hide();
          return { ...user, company_name: matchingCompany?.name };
        } else {
          this.spinner.hide();
          return user;
        }
      }
      else if (user?.company_id?.length > 1) {
        this.spinner.hide();
        const companyIds = user?.company_id;
        const matchingCompanies = this.allCompany?.filter((company) => companyIds.includes(company.id));
        if (matchingCompanies && matchingCompanies.length > 0) {
          const companyNames = matchingCompanies.map((company) => company?.name);
          return { ...user, company_name: companyNames };
        } else {
          this.spinner.hide();
          return user;
        }
      }
    });

    this.allUser = usersWithComapnyName;

    console.log('this.allUser company', this.allUser);

  }
  ////get all company 
  getAllcompany() {
    this.authService.getAllCompanyWithoutPegi().subscribe({
      next: (res) => {
        if (res) {
          this.allCompany = res
          console.log('this.allCompany', this.allCompany);
          
          this.getAllUserWithPegi(this.page)
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
  public openEditControllerDialog(data?: any) {
    const dialogRef = this.dialog.open(UserEditDialogComponent, {
      maxWidth: '600px',
      width: '95%',
      data: data,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult && dialogResult.data) {
        if (data) {
          this.updateUserById(data.id, dialogResult.data);
        } else {
          this.addUser(dialogResult.data);
        }
      }
    });
  }


  addUser(data: any) {

    this.subDataTwo = this.authService.addUser(data)
      .subscribe({
        next: (res) => {
          if (res) {
            console.log('res from api ss', res);
            this.spinner.hide();
            this._snackBar.open('User Added Successfully', '', {
              duration: 3000
            })
            console.log('User added successfully')
            this.getAllUserWithPegi(this.page)
          } else {
            console.log('Error! Please try again.')

          }
        },
        error: (err) => {
          console.log(err)
          this.spinner.hide();
          this._snackBar.open('Error! Please try again.', '', {
            duration: 3000
          })
        }
      })
  }

  editUser(data) {
    this.router.navigate(["/updateUser", data.id]);
  }

  public updateUserById(id: string, data: any) {
    this.subDataThree = this.authService.updateUserById(id, data).subscribe({
      next: (res) => {
        this.spinner.hide();
        console.log(res);
        if (res) {
          this.spinner.hide();
          this.getAllUserWithPegi(this.page)
        }
      },
      error: (err) => {
        this.spinner.hide();
        console.log(err);
      },
    });
  }


  deleteUser(id: string) {

    this.subDataFour = this.authService.deleteUserById(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res) {
          this.spinner.hide();
          // this._snackBar.open('User Deleted Successfully','Undo');  
          this._snackBar.open('User Deleted Successfully', '', {
            duration: 1000
          })
          this.getAllUserWithPegi(this.page)
        }
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide();
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
    if (this.subDataThree) {
      this.subDataThree.unsubscribe();
    }
    if (this.subDataFour) {
      this.subDataFour.unsubscribe();
    }
  }

  exportTable() {
    const tableClone = document.getElementById('ExampleTable').cloneNode(true) as Element;
    const actionCells = tableClone.querySelectorAll('.td-action');
    actionCells.forEach(cell => cell.parentNode.removeChild(cell));


    const actionCells1 = tableClone.querySelectorAll('.td-first-name');
    actionCells1.forEach(cell => cell.parentNode.removeChild(cell));

    const actionCells2 = tableClone.querySelectorAll('.td-last-name');
    actionCells2.forEach(cell => cell.parentNode.removeChild(cell));
    // Filter columns that should be included in the export
    // const exportableColumns = this.columns.filter(column => column.export);

    // Remove header cells for non-exportable columns
    const headerCells = tableClone.querySelectorAll('th');
    console.log('headerCells', headerCells)
    headerCells.forEach((cell, index) => {
      if (cell.innerText === 'Actions') {
        cell.parentNode.removeChild(cell);
      }
      else if (cell.innerText === 'First Name') {
        cell.parentNode.removeChild(cell);
      }
      else if (cell.innerText === 'Last Name') {
        cell.parentNode.removeChild(cell);
      }
    });
    TableUtil.exportToPdf(tableClone.outerHTML, 'All User');
  }


  exportXlTable2() {
    const mData = this.allUser.map((m) => {
      console.log('mxl', m);
      const x = m.dataValues
      // Format the created_time field
      const createdTime = x.created_time ? new Date(x.created_time) : null;
      const formattedCreatedTime = createdTime ? createdTime.toLocaleString() : 'n/a';

      return {
        Name: x.name,
        RoleName: m.role_name,
        Email: x.email ? x.email : 'n/a',
        Gender: x.gender,
        Mobile: x.mobile ? x.mobile : 'n/a',
        Address: x.address,
        Created_time: formattedCreatedTime
      };
    })

    // Define column widths
    const columnWidths = [
      { wch: 22 },  // Width of the 'name' column
      { wch: 10 },  // Width of the 'roleName' column
      { wch: 20 },  // Width of the 'email' column
      { wch: 8 },  // Width of the 'gender' column
      { wch: 15 },  // Width of the 'mobile' column
      { wch: 15 },  // Width of the 'address' column
      { wch: 21 },  // Width of the 'created_time' column
    ];


    console.log('mData', mData);

    // EXPORT XLSX with specified column widths
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(mData);
    ws['!cols'] = columnWidths; // Set column widths

    // Define styles for bold headers
    const headerStyle = {
      font: {
        name: 'arial',
        sz: "13"
      },
      alignment: {
        vertical: 'center',
        horizontal: 'center',
        wrapText: '1', // any truthy value here
      },
      border: {
        right: {
          style: 'thin',
          color: '000000',
        },
        left: {
          style: 'thin',
          color: '000000',
        },
        bottom: {
          style: 'thin',
          color: '000000',
        },
      },
      fill: {
        patternType: 'solid',
        fgColor: { rgb: 'b2b2b2' },
        bgColor: { rgb: 'b2b2b2' },
      }


    };

    // Apply styles to the header row
    ws['A1'].s = headerStyle;
    ws['B1'].s = headerStyle;
    ws['C1'].s = headerStyle;
    ws['D1'].s = headerStyle;
    ws['E1'].s = headerStyle;
    ws['F1'].s = headerStyle;
    ws['G1'].s = headerStyle;

    ws['!rows'] = [{ hpx: 20 }];

    const rowCount = mData.length;
    for (let rowIndex = 1; rowIndex <= rowCount; rowIndex++) {
      ws['!rows'][rowIndex] = { hpx: 18 }; // Set the height of each row (excluding the header) to 20 pixels
    }
    // Add more header styles for additional columns as needed

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    XLSX.writeFile(wb, `user_Reports.xlsx`);
  }



  exportCSV() {
    // Define the columns you want to export
    const columns = ['Name',
      'Role Name', 'Email', 'Gender', 'User Type', 'Company Name', 'Mobile No.', 'Address', 'Created_time', 'status'];

    // Convert table data to an array of arrays
    const tableData = [columns]; // Start with the header row
    // Populate the data rows
    for (const item of this.allUser) {
      const x = item.dataValues
      const rowData = [
        x.first_name + x.last_name,
        item.role_name,
        x.email,
        x.gender,
        x.user_type,
        Array.isArray(item.company_name) ? item.company_name.join(' ') : item.company_name,
        x.mobile,
        x.address,
        x.created_time,
        x.status === 0 ? 'Inactive' : 'Active',
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
        this.deleteUser(data.id);
      }
    });
  }
  
  public openVisibilityDialog(data?: any) {
    this.dialog.open(ViewUserDialogComponent, {
      maxWidth: '650px',
      data: {
        data: data,
      }
    });
    // dialogRef.afterClosed().subscribe(dialogResult => {

    // });
  }


}

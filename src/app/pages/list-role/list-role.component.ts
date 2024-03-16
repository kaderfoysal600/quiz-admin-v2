import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subscription } from 'rxjs';
import { RoleDialogComponent } from 'src/app/dialog/role-dialog/role-dialog.component';
import { AuthService } from 'src/app/service/auth.service';
import { UiService } from 'src/app/service/ui.service';
import { ConfirmDialogComponent } from 'src/app/shared/dialog/confirm-dialog/confirm-dialog.component';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { saveAs } from 'file-saver';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.scss']
})
export class ListRoleComponent implements OnInit {
  allRole
  allCompany


  //what to show

  allRoleShow = false;

  //search
  searchForm: FormGroup;
  searchData = null;
  searchClicked = false;
  allStatus: any[] = [
    { value: 1, viewValue: 'Active' },
    { value: 0, viewValue: 'Inactive' }
  ];


  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subDataFour: Subscription;

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('sl') sl: any;
  @ViewChild('allColumn') allColumn: any;

  displayedColumns = ['actions', 'sl', 'Name',
    'description', 'company', 'CompanyChecked', 'Created', "updated", 'status',];
  // columns = [
  //   {
  //     columnDef: 'actions',
  //     header: 'Actions',
  //     cell: (element: any) => '',
  //     export: false,
  //   },
  //   {
  //     columnDef: 'sl',
  //     header: 'Sl',
  //     cell: (element: any) => '',
  //     export: false,
  //   },
  //   {
  //     columnDef: 'Name',
  //     header: 'Name.',
  //     cell: (element: any) => `${element.name}`,
  //     export: true,
  //   },
  //   {
  //     columnDef: 'RoleId',
  //     header: 'RoleId',
  //     cell: (element: any) => `${element.id}`,
  //     export: true,
  //   },
  //   {
  //     columnDef: 'description',
  //     header: 'Description',
  //     cell: (element: any) => `${element.description}`,
  //     export: true,
  //   },
  //   {
  //     columnDef: 'Company',
  //     header: 'Company',
  //     cell: (element: any) => `${element.company_name}`,
  //     export: true,
  //   },
  //   {
  //     columnDef: 'status',
  //     header: 'status',
  //     cell: (element: any) => `${element.status === 0 ? 'Inactive' : 'Active'}`,
  //     export: true,
  //   },
  //   {
  //     columnDef: 'CompanyChecked',
  //     header: 'CompanyChecked',
  //     cell: (element: any) => `${element.company_checked === 0 ? 'False' : 'True'}`,
  //     export: true,
  //   },
  //   {
  //     style:true,
  //     columnDef: 'created',
  //     header: 'Created',
  //     cell: (element: any) => {
  //       const datePipe = new DatePipe('en-US');
  //       const formatedData = datePipe.transform(element.created_time, 'MMM d, y - h:mm:ss a');
  //       const createdBy = element.created_by_name;
  //       return `By: ${createdBy} Time: ${formatedData}`;
  //     },
  //     export: true,
  //   },
  //   {
  //     style:true,
  //     columnDef: 'updated',
  //     header: 'Updated',
  //     cell: (element: any) => {
  //       const datePipe = new DatePipe('en-US');
  //       const formatedData = datePipe.transform(element.updated_time, 'MMM d, y - h:mm:ss a');
  //       const updatedBy = element.updated_by_name;
  //       return `By: ${updatedBy} Time: ${formatedData}`;
  //     },
  //     export: true,
  //   },

  // ];
  // displayedColumns = this.columns.map(c => c.columnDef);

  // dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(this.allRole);
  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private uiService: UiService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private changeDetectorRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,

  ) {
    this.dataSource = new MatTableDataSource([]);
    this.searchForm = this.fb.group({
      name: '',
      status: '',
    });
  }

  ngOnInit(): void {
    this.getAllcompany()
    this.getAllRole();
    // this.dataSource.paginator = this.paginator;


  }


  getAllRole() {
    this.subDataFour = this.authService.getAllrole().subscribe({
      next: (res) => {
        if (res) {
          this.allRole = res
          console.log(res);

          this.getAllRoleWithCompanyName(res)

          this.updateDataSource(this.allRole)
        } else {
          console.log('Error! Please try again.')
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  onSearchClick() {
    const formData = this.searchForm.value;
    this.searchData = formData;
    console.log('this.searchData', this.searchData);
    // this.getAllRole(x);
    this.getAllRoleBySearch();

  }
  onClearFilter() {
    this.searchForm.reset();
    this.searchData = {};
    // this.getAllRole(null);
    this.getAllRole();
  }

  getAllRoleBySearch() {
    this.subDataFour = this.authService.getAllroleBySearch(this.searchData).subscribe({
      next: (res) => {
        if (res) {
          this.allRole = res

          console.log(res);

          this.getAllRoleWithCompanyName(res)

          this.updateDataSource(this.allRole)
        } else {
          console.log('Error! Please try again.')
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }


  updateDataSource(newData: any[]) {
    this.dataSource.data = newData;
    this.dataSource.paginator = this.paginator;
    console.log(' this.dataSource', this.dataSource);
    this.changeDetectorRef.detectChanges();
  }


  getAllRoleWithCompanyName(allRole) {
    this.spinner.show();
    const rolesWithCompanyName = allRole.map((role) => {
      console.log('role.company_id', role.company_id)

      const matchingCompany = this.allCompany?.find((company) => role.company_id == company.id
      );
      console.log('matchingRole', matchingCompany);

      if (matchingCompany) {
        console.log('asdsdsdf');

        this.spinner.hide();
        return { ...role, company_name: matchingCompany.name };
      } else {
        return role;
      }
    });

    this.allRole = rolesWithCompanyName;

    const storedRole = parseInt(sessionStorage.getItem('role'));

    if (storedRole === 1) {
      this.allRole = this.allRole
    }
    else if (storedRole === 2) {
      this.allRole = this.allRole.filter(role => role.id !== 1)
      console.log('this.allRole', this.allRole);
    }
    else if (storedRole === 3) {
      this.allRole = this.allRole.filter(role => role.id !== 1 && role.id !== 2);
      console.log('this.allRole', this.allRole);
    }
    else if (storedRole === 4) {
      this.allRole = this.allRole.filter(role => role.id !== 1 && role.id !== 2 && role.id !== 3);
      console.log('this.allRole', this.allRole);
    }
    console.log('this.allCompany101', this.allRole);
  }
  ////get all company 
  getAllcompany() {
    this.authService.getAllCompanyWithoutPegi().subscribe({
      next: (res) => {
        if (res) {
          this.allCompany = res
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
    console.log('data open to dialog', data)
    const dialogRef = this.dialog.open(RoleDialogComponent, {
      maxWidth: '600px',
      width: '95%',
      data: data,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult && dialogResult.data) {
        if (data) {
          console.log('edit data', data);

          this.updateRoleById(data.id, dialogResult.data);
        } else {
          this.addRole(dialogResult.data);
        }
      }
    });
  }


  addRole(data: any) {
    this.subDataOne = this.authService.addRole(data)
      .subscribe({
        next: (res) => {
          if (res) {
            console.log('Role added successfully')
            this.uiService.success('Role added successfully');
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



  public updateRoleById(id: string, data: any) {
    this.subDataTwo = this.authService.updateRoleById(id, data).subscribe({
      next: (res) => {
        console.log(res);
        this.uiService.success('Role updated successfully');
        if (res) {
          this.getAllRole()
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  deleteRole(id: string) {
    this.subDataThree = this.authService.deleteRoleById(id).subscribe({
      next: (res) => {
        console.log('result', res);
        this.uiService.success('Role Deleted successfully');
        if (res) {
          this.getAllRole()
        }
      },
      error: (err) => {
        console.log('error', err);
        this.uiService.wrong('Role Delete failure');
      },
    });
  }

  addPermission(data) {
    this.router.navigate(["/role/permission", data.id]);
  }


  exportCSV() {
    // Define the columns you want to export
    const columns = ['Name', 'Description', 'Company Name', 'Created_time', 'status'];

    // Convert table data to an array of arrays
    const tableData = [columns]; // Start with the header row
    // Populate the data rows
    for (const item of this.allRole) {
      const rowData = [
        item.name,
        item.description,
        Array.isArray(item.company_name) ? item.company_name.join(' ') : item.company_name,
        item.created_time,
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

  shouldShowEditDeleteButton(roleId: number): boolean {
    return roleId >= 1 && roleId <= 5;
  }
  showPermission(roleId: number): boolean {
    console.log()
    const userType = sessionStorage.getItem('user_type');
    
    if (userType === 'super_admin' || userType === 'user_admin') {
      return true;
    }
    else {
      return false;
    }
  }

  whatRowShow() {
    if (parseInt(sessionStorage.getItem('role')) === 1) {
      this.allRoleShow = true;
    }
  }
  /**
   * COMPONENT DIALOG VIEW
   */



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
        this.deleteRole(data.id);
      }
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


}

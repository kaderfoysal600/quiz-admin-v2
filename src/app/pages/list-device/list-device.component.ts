import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DeviceDialogComponent } from 'src/app/dialog/device-dialog/device-dialog.component';
import { AuthService } from 'src/app/service/auth.service';
import { UiService } from 'src/app/service/ui.service';
import { saveAs } from 'file-saver';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from 'src/app/shared/dialog/confirm-dialog/confirm-dialog.component';
import { DeviceAlarmComponent } from 'src/app/dialog/device-alarm/device-alarm.component';
@Component({
  selector: 'app-list-device',
  templateUrl: './list-device.component.html',
  styleUrls: ['./list-device.component.scss']
})
export class ListDeviceComponent implements OnInit {

  searchForm: FormGroup;
  searchData = null;


  //storeData
  allDevice: any = null;

  dataSource
  displayedColumns = [ 'action', 'SlNo','Name', 'ModelNo',  'Description',
    'HowManyPhase', 'Temperature', 'Humidity', 'Smoke', 'Liquidity', 'Created', 'Updated' , 'status'];
  allStatus: any[] = [
    { value: 1, viewValue: 'Active' },
    { value: 0, viewValue: 'Inactive' }
  ];
  searchClicked = false;

  // Pagination
  page: number = 1;
  itemsPerPage = 5;
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
    private _snackBar: MatSnackBar,

  ) {
    this.searchForm = this.fb.group({
      Name: '',
      status: '',
      ModelNo: '',
    });
  }

  ngOnInit(): void {
    this.getAllDevice(null);
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

    this.getAllDevice(x);
    this.page = 1
  }
  onClearFilter() {
    this.searchForm.reset();
    this.searchData = {};
    this.getAllDevice(null);
    this.showPegination = true;
  }

  getAllDevice(page) {
    this.updateDataSource(this.allDevice)

    this.subDataOne = this.authService.getAllDevice(page, this.itemsPerPage, this.searchData).subscribe({
      next: (res) => {
        if (res) {
          console.log('allPermissionGroupItemSearch', res);
          this.allDevice = res['data']
          if (res['totalData'] !== 0) {
            this.totalItems = res['totalData'];
          } else if (res['totalData'] === 0) {
            this.showPegination = false;
            console.log('this.showPegination ', this.showPegination)
          }

          this.updateDataSource(this.allDevice)

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
    const dialogRef = this.dialog.open(DeviceDialogComponent, {
      maxWidth: '600px',
      width: '95%',
      data: data,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult && dialogResult.data) {
        if (data) {
          this.updateDevice(data.id, dialogResult.data);
        } else {
          this.addDevice(dialogResult.data);
        }
      }
    });
  }

  addDevice(data: any) {
    this.subDataTwo =
      this.authService.addDevice(data)
        .subscribe({
          next: (res) => {
            console.log('res', res)
            if (res) {
              console.log('Device Added SuccessFully', res)
              this.uiService.success('Device Added SuccessFully');
              this._snackBar.open('Device Added SuccessFully', '', {
                duration: 2000,
                panelClass: ['green-snackbar']
              })
              this.getAllDevice(this.currPage)
            } else {
              console.log('Error! Please try again.')
              this._snackBar.open('Error! Please try again.', '', {
                duration: 2000,
                panelClass: ['red-snackbar']
              })
            }
          },
          error: (err) => {
            console.log(err)
            this._snackBar.open('Error! Please try again.', '', {
              duration: 2000,
              panelClass: ['red-snackbar']
            })
          }
        })
  }

  public updateDevice(id: string, data: any) {
    this.subDataThree =
      this.authService.updateDevice(id, data).subscribe({
        next: (res) => {
          console.log(res);
          this.uiService.success('Company Updated successfully');
          if (res) {
            this.getAllDevice(this.currPage)
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  deleteDevice(id: string) {
    console.log('id', id)
    this.subDataFour = this.authService.deleteDevice(id).subscribe({
      next: (res) => {
        console.log('res', res);
        this.uiService.success('Compay deleted successfully');
        if (res) {
          this.getAllDevice(this.currPage)
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
        this.deleteDevice(data.id);
      }
    });
  }

  public openAlarmDialog(data?: any) {
    const dialogRef = this.dialog.open(DeviceAlarmComponent, {
      maxWidth: '1000px',
      data: data
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.deleteDevice(data.id);
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
    const columns = ['ModelNo', 'Name', 'Description',
    'HowManyPhase', 'Temperature', 'Humidity', 'Smoke', 'Liquidity', 'Created_time', 'Created_by', 'status'];

    // Convert table data to an array of arrays
    const tableData = [columns]; // Start with the header row

    // Populate the data rows
    for (const item of this.allDevice) {
      const rowData = [
        item.ModelNo,
        item.Name,
        item.Description,
        item.HowManyPhase,
        item.Temperature,
        item.Humidity,
        item.Smoke,
        item.Liquidity,
        item.Created_time,
        item.Created_by,
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

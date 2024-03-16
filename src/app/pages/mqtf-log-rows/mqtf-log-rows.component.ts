import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MqtfRowViewComponent } from 'src/app/dialog/mqtf-row-view/mqtf-row-view.component';
import { AuthService } from 'src/app/service/auth.service';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-mqtf-log-rows',
  templateUrl: './mqtf-log-rows.component.html',
  styleUrls: ['./mqtf-log-rows.component.scss']
})
export class MqtfLogRowsComponent implements OnInit {
allMqtfLogRows

//search
searchForm: FormGroup;
searchData = null;
searchClicked = false;

//data from api
allCompany
serverCompanyDevice
  // Pagination
  page: number = 1;
  itemsPerPage = 6;
  totalItems: any;
  currPage: number = 1;
  showPegination = true;


  constructor(
    public authService: AuthService,
    private dialog: MatDialog,
    private fb: FormBuilder,
  ) {
    this.searchForm = this.fb.group({
      device_id: '',
      user_company:''
    });
   }

  ngOnInit(): void {
    this.getAllMqtfLogRows(1)
    this.getAllcompany()
    this.getAllCompanyDevice()
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

    this.getAllMqtfLogRows(x);
    this.page = 1
  }

  onClearFilter() {
    this.searchForm.reset();
    this.searchData = {};
    // this.getAllDevice(null);
    this.showPegination = true;
  }

  getAllcompany() {
    this.authService.getAllCompanyWithoutPegi().subscribe({
      next: (res) => {
        if (res) {
          this.allCompany = res
          console.log('this.allCompany', this.allCompany);
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

  getAllCompanyDevice() {
    this.authService.getAllCompanyDeviceWithoutId().subscribe({
      next: (res) => {
        if (res) {
          console.log(res)

          this.serverCompanyDevice = res['data'];

          // this.getAllCompanyDevice(this.Id)
          console.log('serverDevice', this.serverCompanyDevice)
        } else {
          console.log('Error! Please try again.')
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }



  public getAllMqtfLogRows(page) {
    this.authService.getAllMqtfLogRows(page, this.itemsPerPage ,  this.searchData).subscribe({
      next: (res: any) => {
        console.log('res', res);
        this.allMqtfLogRows = res['data'];
        this.totalItems = res['totalData']
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
  public openVisibilityDialog(data?: any) {
    this.dialog.open(MqtfRowViewComponent, {
      maxWidth: '650px',
      data: {
        data: data,
      }
    });
    // dialogRef.afterClosed().subscribe(dialogResult => {

    // });
  }


  exportCSV() {
    // Define the columns you want to export
    const columns = ['DeviceID', 'Company', 'log', 'Insert Time'];

    // Convert table data to an array of arrays
    const tableData = [columns]; // Start with the header row
    // Populate the data rows
    for (const item of this.allMqtfLogRows) {
      const x = item

      
      const rowData = [
        x.DeviceID,
        x.companyName,
        x.log,
        x.insert_time,
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
}

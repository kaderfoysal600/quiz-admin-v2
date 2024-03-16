import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-edit-company-device',
  templateUrl: './edit-company-device.component.html',
  styleUrls: ['./edit-company-device.component.scss']
})
export class EditCompanyDeviceComponent implements OnInit {
  //store data
  serverDevice;
  companyDeviceData;
  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  deviceForm?: FormGroup;

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.initDataForm();
    this.getAllDevice();
    if (this.data) {
      console.log('datttaatata', this.data);
      
      this.companyDeviceData = this.data;
      this.setFormValue();
    }
  }
  /**
* INIT FORM & Submit
* initDataForm()
* setFormValue()
* onSubmit()
*/
  private initDataForm() {
    this.deviceForm = this.fb.group({
      comapnyId: 2,
      ModelNo:  ['', [
        Validators.required,
      ]],
      DeviceWarranty :0,
      DeviceWarrantyStartDate: null,
      DeviceWarrantyEndDate: null,
      DeviceWarrantyRemarks: null,
      DeviceID: ['', [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9]*$"),
      ]],
    });
  }

  private setFormValue() {
    this.deviceForm.patchValue(this.companyDeviceData);
  }

  onSubmit() {
    if (this.deviceForm.invalid) {
      return;
    }

    const formData = this.deviceForm.value
    this.dialogRef.close({
      data: formData
      
    });
  }


  getAllDevice() {
    this.authService.getAllDevice2().subscribe({
      next: (res) => {
        if (res) {
          console.log(res)

          this.serverDevice = res;
          console.log('serverDevice', this.serverDevice)
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
 * ON CLOSE DIALOG
 */
onClose() {
  this.dialogRef.close();
}
}

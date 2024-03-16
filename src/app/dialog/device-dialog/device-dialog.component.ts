import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-device-dialog',
  templateUrl: './device-dialog.component.html',
  styleUrls: ['./device-dialog.component.scss']
})
export class DeviceDialogComponent implements OnInit {
  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  deviceForm?: FormGroup;

  // Static Data
  allStatus: any[] = [
    { value: 1, viewValue: 'Active' },
    { value: 0, viewValue: 'Inactive' }
  ];
  howManyPhases: any[] = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
  ];
  sensorCount: any[] = [
    { value: 1 },
    { value: 2 },
    { value: 4 },
    { value: 5 },
    { value: 6 },
    { value: 7 },
    { value: 8 },
    { value: 9 },
    { value: 10 },
  ];


  // Store Data+
  deviceData: any;
  allPermissionGroup: any;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    // Init Data Form
    this.initDataForm();
    if (this.data) {
      this.deviceData = this.data;
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
      ModelNo: ['', [
        Validators.required, Validators.pattern("^[a-zA-Z0-9]*$"),
        Validators.minLength(10), Validators.maxLength(30)
      ]],
      Name: ['', Validators.required],
      Description: [''],
      HowManyPhase: ['', [Validators.required, Validators.min(1), Validators.max(3)]],
      VoltageRed: [0],
      VoltageGreen: [0],
      VoltageYellow: [0],
      CurrentRed: [0],
      CurrentGreen: [0],
      CurrentYellow: [0],
      FrequencyRed: [0],
      FrequencyGreen: [0],
      FrequencyYellow: [0],
      Temperature: [''],
      Humidity: [''],
      Smoke: [''],
      Liquidity: [''],
      status: [''],
      Created_by: [sessionStorage.getItem('id')],
      Updated_by: [null]
    });
  }

  private setFormValue() {
    this.deviceForm.patchValue({ ...this.deviceData, Updated_by: [sessionStorage.getItem('id')] });
  }

  onSubmit() {
    if (this.deviceForm.invalid) {
      return;
    }
    const checkboxData = {
      VoltageRed: this.deviceForm.get('VoltageRed').value ? 1 : 0,
      VoltageGreen: this.deviceForm.get('VoltageGreen').value ? 1 : 0,
      VoltageYellow: this.deviceForm.get('VoltageYellow').value ? 1 : 0,
      CurrentRed: this.deviceForm.get('CurrentRed').value ? 1 : 0,
      CurrentGreen: this.deviceForm.get('CurrentGreen').value ? 1 : 0,
      CurrentYellow: this.deviceForm.get('CurrentYellow').value ? 1 : 0,
      FrequencyRed: this.deviceForm.get('FrequencyRed').value ? 1 : 0,
      FrequencyGreen: this.deviceForm.get('FrequencyGreen').value ? 1 : 0,
      FrequencyYellow: this.deviceForm.get('FrequencyYellow').value ? 1 : 0,
    };
    const formData = { ...this.deviceForm.value, ...checkboxData };
    this.dialogRef.close({
      data: formData

    });
    console.log('device data from frontend', this.deviceForm.value);
    console.log('VoltageRed', this.deviceForm.get('VoltageRed').value);
    console.log('FrequencyYellow', this.deviceForm.get('FrequencyYellow').value);

  }



  resetEditForm() {
    this.deviceData = this.data;
    this.setFormValue();
  }

  resetAddForm() {
    this.deviceForm.reset();
  }

  /**
   * ON CLOSE DIALOG
   */
  onClose() {
    this.dialogRef.close();
  }

}

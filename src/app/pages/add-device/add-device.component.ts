import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { EditCompanyDeviceComponent } from 'src/app/dialog/edit-company-device/edit-company-device.component';
import { AuthService } from 'src/app/service/auth.service';
import { ConfirmDialogComponent } from 'src/app/shared/dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss'],
})
export class AddDeviceComponent implements OnInit {
  Id: any;
  companyName: string;
  warranty1 = 0;
  dataForm: FormGroup;
  serverDevice;
  companyDeviceFromApi;

  editDeletePermission = false;
  constructor(
    private _route: ActivatedRoute,
    private fb: FormBuilder,
    public authService: AuthService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.checkEditDeletePermission();
    this.getAllDevice();

    this._route.paramMap.subscribe((params) => {
      this.Id = params.get('id');
      console.log('this.Id', this.Id);

      this.getAllCompany();

      if (this.Id) {
        this.getAllCompanyDeviceById(this.Id);
      }
    });

    this.dataForm = this.fb.group({
      credentials: this.fb.array([this.createCredentialFormGroup()]),
    });
    console.log('this.dataForm in oninit', this.dataForm);
  }

  checkEditDeletePermission() {
    const userType = sessionStorage.getItem('user_type');
    if (userType === 'super_admin' || userType === 'user_admin') {
      this.editDeletePermission = true;
    }
  }

  createCredentialFormGroup() {
    return this.fb.group({
      questionStartDate: [null, [Validators.required]],
      question: [null, [Validators.required]],
      options: this.fb.array([
        this.createAnswerFormGroup(),
        this.createAnswerFormGroup(),
        this.createAnswerFormGroup(),
        this.createAnswerFormGroup(),
      ]),
      correctOption: [null],
    });
  }

  addCreds() {
    //
    console.log('this.dataForm cred', this.dataForm);
    const creds = this.dataForm.get('credentials') as FormArray;
    (this.dataForm.get('credentials') as FormArray).markAsUntouched();
    // this.dataForm.markAsUntouched();
    if (creds.controls.length === 0) {
      (this.dataForm.get('credentials') as FormArray).clear();
      console.log('eeeeeeeeeeeeeeee');
    }
    creds.push(this.createCredentialFormGroup());
  }

  createAnswerFormGroup() {
    return this.fb.group({
      value: [null, [Validators.required]],
    });
  }

  addAnswer(i: number) {
    const options = (this.dataForm.get('credentials') as FormArray)
      .at(i)
      .get('options') as FormArray;
    options.push(this.createAnswerFormGroup());
  }

  removeAnswer(i: number, j: number) {
    const options = (this.dataForm.get('credentials') as FormArray)
      .at(i)
      .get('options') as FormArray;
    options.removeAt(j);
  }

  get credentials() {
    return (this.dataForm.get('credentials') as FormArray).controls;
  }

  onSubmit() {
    console.log('this.dataForm.value = ', this.dataForm.value.credentials);
    console.log(this.dataForm);
    if (this.dataForm.invalid) {
      console.log('invalied data form');
    }

    if (this.dataForm.valid) {
      console.log(this.dataForm);
      console.log('this.Id', this.Id);

      this.addCompanyDeviceNew();
    }
  }

  addCompanyDeviceNew() {
    this.authService
      .addQuiz(this.dataForm.value.credentials, this.Id)
      .subscribe({
        next: (res) => {
          if (res) {
            console.log('addCompanyDevice added successfully');
            console.log('res');

            this._snackBar.open('Company device added Successfully', '', {
              duration: 2000,
              panelClass: ['green-snackbar'],
            });

            this.dataForm.reset();
            (this.dataForm.get('credentials') as FormArray).reset();
            (this.dataForm.get('credentials') as FormArray).clear();
            this.dataForm.updateValueAndValidity();
            // (this.dataForm.get('credentials') as FormArray).controls.forEach(control => {
            //   control.markAsUntouched();
            //   control.get('ModelNo').updateValueAndValidity();
            //   control.get('DeviceId').updateValueAndValidity();
            // });
            // this.dataForm.markAsPristine();
            // this.dataForm.updateValueAndValidity();
            // console.log('this.dataForm.value = ', this.dataForm.value.credentials.length);
            // console.log('this.dataForm', this.dataForm);

            this.getAllCompanyDeviceById(this.Id);
            this.addCompanyDeviceDetect(res['data']);
          } else {
            console.log('Error! Please try again.');
            this._snackBar.open('Error! Please try again.', '', {
              duration: 2000,
              panelClass: ['red-snackbar'],
            });
          }
        },
        error: (err) => {
          console.log(err);
          this._snackBar.open(err.error.message, '', {
            duration: 2000,
            panelClass: ['red-snackbar'],
          });
        },
      });
  }

  addCompanyDeviceDetect(itemToAdd) {
    const shouldAdd1 = itemToAdd.map((item) => {
      item = {
        ...item,
        createdBy: sessionStorage.getItem('id'),
      };
      return item;
    });
    this.authService.addCompanyDeviceDetect(shouldAdd1).subscribe({
      next: (res) => {
        if (res) {
          console.log('AddCompanyDeviceDetected successfully');
          console.log('res', res);
        } else {
          console.log('Error! Please try again.');
        }
      },
      error: (err) => {
        console.log(err);
        this._snackBar.open(err, '', {
          duration: 2000,
          panelClass: ['red-snackbar'],
        });
      },
    });
  }

  getAllDevice() {
    this.spinner.show();
    this.authService.getAllDevice2().subscribe({
      next: (res) => {
        if (res) {
          console.log(res);
          this.spinner.hide();

          this.serverDevice = res;

          // this.getAllCompanyDevice(this.Id)
          console.log('serverDevice', this.serverDevice);
        } else {
          console.log('Error! Please try again.');
          this.spinner.hide();
        }
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide();
      },
    });
  }

  getAllCompany() {
    this.spinner.show();
    this.authService.getCompanyById(this.Id).subscribe({
      next: (res) => {
        if (res) {
          this.spinner.hide();
          console.log('ressss', res);
          this.companyName = res['name'];
        } else {
          this.spinner.hide();
          console.log('ressss', res);
          console.log('Error! Please try again.');
        }
      },
      error: (err) => {
        this.spinner.hide();
        console.log(err);
      },
    });
  }

  getAllCompanyDeviceById(id) {
    this.spinner.show();
    this.authService.getAllNewCompanyDeviceById(id).subscribe({
      next: (res) => {
        if (res) {
          this.spinner.hide();
          this.companyDeviceFromApi = res['data'];
          console.log('this.companyDeviceFromApi', this.companyDeviceFromApi);
          // this.setFormValue();
        } else {
          this.spinner.hide();
          console.log('Error! Please try again.');
        }
      },
      error: (err) => {
        this.spinner.hide();
        console.log(err);
      },
    });
  }

  onWarrantyChange(index: number) {
    const creds = this.dataForm.get('credentials') as FormArray;
    const warrantyControl = creds.at(index).get('warranty');
    warrantyControl ? 0 : 1;
  }

  removeCredential(index: number) {
    const creds = this.dataForm.get('credentials') as FormArray;
    creds.removeAt(index);
  }
  deleteNewCompanyDevice(id: string) {
    console.log('id', id);
    this.authService.deleteNewComapanyDevice(id).subscribe({
      next: (res) => {
        console.log('res', res);
        this.detectDeleteCompanyDevice(res['data']);
        this._snackBar.open('Company device added Successfully', '', {
          duration: 2000,
          panelClass: ['green-snackbar'],
        });
        if (res) {
          this.getAllCompanyDeviceById(this.Id);
        }
      },
      error: (err) => {
        console.log(err);
        this._snackBar.open(err, '', {
          duration: 2000,
          panelClass: ['red-snackbar'],
        });
      },
    });
  }

  detectDeleteCompanyDevice(itemToDelete) {
    const shouldDelete = {
      ...itemToDelete,
      deletedBy: sessionStorage.getItem('id'),
    };

    this.authService.deleteCompanyDeviceDetect(shouldDelete).subscribe({
      next: (res) => {
        if (res) {
          console.log('deleteCompanyDeviceDetected successfully');
          console.log('res', res);
        } else {
          console.log('Error! Please try again.');
        }
      },
      error: (err) => {
        console.log(err);
        this._snackBar.open(err, '', {
          duration: 2000,
          panelClass: ['red-snackbar'],
        });
      },
    });
  }

  public openConfirmDialog(data?: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want delete this data?',
      },
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.deleteNewCompanyDevice(data.id);
      }
    });
  }

  public openEditControllerDialog(data?: any) {
    const dialogRef = this.dialog.open(EditCompanyDeviceComponent, {
      maxWidth: '600px',
      width: '95%',
      data: data,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult && dialogResult.data) {
        if (data) {
          this.updateNewCompanyDevice(data.id, dialogResult.data);
        }
      }
    });
  }

  public updateNewCompanyDevice(id: string, data: any) {
    this.spinner.show();
    this.authService.updateNewCompanyDevice(id, data).subscribe({
      next: (res) => {
        console.log(res);

        if (res) {
          this.spinner.hide();
          this.getAllCompanyDeviceById(this.Id);
        }
      },
      error: (err) => {
        this.spinner.hide();
        console.log(err);
      },
    });
  }
}

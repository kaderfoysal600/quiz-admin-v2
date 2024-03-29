import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-permission-group-dialog',
  templateUrl: './permission-group-dialog.component.html',
  styleUrls: ['./permission-group-dialog.component.scss']
})
export class PermissionGroupDialogComponent implements OnInit {
// Data Form
@ViewChild('formElement') formElement: NgForm;
dataForm?: FormGroup;
// Store Data+
permissionGroupData: any;
allStatus: any[] = [
  {value: 1, viewValue: 'Active'},
  {value: 0, viewValue: 'Inactive'}
];
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
    this.permissionGroupData = this.data;
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
  this.dataForm = this.fb.group({
    name: [null, Validators.required],
    description: [null, Validators.required],
    status: [null, [Validators.required]],
    created_by:[[sessionStorage.getItem('id')]],
    updated_by: [null],
  });
}

private setFormValue() {
  const newStatusValue = this.data.status;
  this.dataForm.patchValue({ ...this.permissionGroupData ,status: newStatusValue ,  updated_by:[sessionStorage.getItem('id')]});
  //  let newStatus = this.dataForm.controls['status'].patchValue(this.data.status); 
   console.log('newStatus', this.data.status);
   
}

onSubmit() {
  if (this.dataForm.invalid) {
    return;
  }
  this.dialogRef.close({
    data: this.dataForm.value,

  });
  console.log('user data from frontend', this.dataForm.value);
}


resetEditForm() {
  this.permissionGroupData = this.data;
  this.setFormValue();
}

resetAddForm() {
  this.dataForm.reset();
}

/**
 * ON CLOSE DIALOG
 */
onClose() {
  this.dialogRef.close();
}

}

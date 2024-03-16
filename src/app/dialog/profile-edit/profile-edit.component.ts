import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  //storeData
  profileUserData
  allGender: string[] = ['Male', 'Female', 'Other',];

  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    console.log(this.data);
        // Init Data Form
        this.initDataForm();
        if (this.data) {
          this.profileUserData = this.data;
          this.setFormValue();
        }
    
  }



  private initDataForm() {
    this.dataForm = this.fb.group({
      first_name: [null],
      last_name: [null],
      mobile: [null],
      gender:[null],
    });
  }

  private setFormValue() {
    this.dataForm.patchValue(this.profileUserData );
  }


  onSubmit() {
    if (this.dataForm.invalid) {
      return;
    };
    this.dialogRef.close({
      data: this.dataForm.value
    });

    console.log('user data from frontend', this.dataForm.value);
  }
/**
 * ON CLOSE DIALOG
 */
onClose() {
  this.dialogRef.close();
}


}

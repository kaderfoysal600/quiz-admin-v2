import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

 // Data Form
 @ViewChild('formElement') formElement: NgForm;
 dataForm?: FormGroup;

   // Static Data
   allStatus: any[] = [
     {value: 1, viewValue: 'Active'},
     {value: 0, viewValue: 'Inactive'}
   ];
   // selectedFood = this.allStatus[1].value;

 // Store Data+
 companyData: any;
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
     this.companyData = this.data;
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
       contactName: [null, Validators.required],
       contactNumber: [null],
       contactEmail: [null],
       contactAddress: [null],
       connectionAddress: [null],
       maxUser: [null],
       maxRole: [null],
       maxDevice: [null],
       remarks: [null],
       status: [null, Validators.required],
       created_by:[sessionStorage.getItem('id')],
       updated_by:[null]
     });
   }
 
   private setFormValue() {
     this.dataForm.patchValue({...this.companyData,  updated_by:sessionStorage.getItem('id')});
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
    this.companyData = this.data;
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

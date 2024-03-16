import { HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-sub-division',
  templateUrl: './sub-division.component.html',
  styleUrls: ['./sub-division.component.scss'],
})
export class SubDivisionComponent implements OnInit {
  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;
  // Store Data+
  subDivisionData: any;
  allDivision;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    // Init Data Form
    this.initDataForm();
    if (this.data) {
      this.subDivisionData = this.data;
      this.setFormValue();
    }
    this.allSubCategory();
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
      description: [null],
      category_Id: [null],
    });
  }
  private allSubCategory() {
            // Get the token from sessionStorage
  const token = sessionStorage.getItem('token');

  // Check if token exists
  if (!token) {
    console.log('Token not found. Please log in.');
    // this.spinner.hide();
    return;
  }

  // Create headers with Authorization token
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  console.log('Headers:', headers); 
    this.authService.getAllDivision(headers).subscribe({
      next: (res: any) => {
        console.log(res);
        this.allDivision = res;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  private setFormValue() {
    this.dataForm.patchValue({
      ...this.subDivisionData,
    });
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
    this.subDivisionData = this.data;
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

import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth.service';
interface Status1 {
  value: number;
  viewValue: string;
}
@Component({
  selector: 'app-role-dialog',
  templateUrl: './role-dialog.component.html',
  styleUrls: ['./role-dialog.component.scss']
})
export class RoleDialogComponent implements OnInit {
  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;
  // Store Data+
  roleData: any;
  allRoles: any;
  allCompany
  originalData
  allStatus: Status1[] = [
    { value: 0, viewValue: 'Inactive' },
    { value: 1, viewValue: 'Active' }
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
      this.roleData = this.data;
      this.setFormValue();
    }
    this.getAllRole()
    this.getAllcompany();
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
      company_id: [null],
      company_checked: [null],
      created_by:[[sessionStorage.getItem('id')]],
      updated_by: [null],
    });
    this.originalData = this.allCompany

  }

  private setFormValue() {
    this.dataForm.patchValue({...this.roleData , updated_by:[sessionStorage.getItem('id')]} );
  }

  onSubmit() {
    if (this.dataForm.invalid) {
      return;
    };
    const company_id = this.dataForm.get('company_id').value;
    this.dialogRef.close({
      data: {
        ...this.dataForm.value,
        company_id: company_id !== undefined ? company_id : null
      },

    });

    console.log('user data from frontend', this.dataForm.value);
  }

  resetEditForm() {
    this.roleData = this.data;
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


  private getAllRole() {
    this.authService.getAllrole().subscribe({
      next: (res: any) => {
        console.log(res);
        this.allRoles = res;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  ////get all company 
  getAllcompany() {
    this.authService.getAllCompanyWithoutPegi().subscribe({
      next: (res) => {
        if (res) {
          this.allCompany = res;
          this.originalData = res;
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

  isCompanySelected() {
    return this.dataForm.get('company_id').value == null;
  }

  clearCheck() {
    if (this.dataForm.get('company_id').value !== null) {
      return this.dataForm.get('company_checked').setValue(0);
    }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    let searchText = filterValue.trim().toLowerCase();
    if (searchText) {
      this.allCompany = this.originalData.filter(item => item.name.toLowerCase().includes(searchText));
    } else {
      this.allCompany = this.originalData;
    }
  }

  
}

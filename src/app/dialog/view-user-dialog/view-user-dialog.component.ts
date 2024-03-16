import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-user-dialog',
  templateUrl: './view-user-dialog.component.html',
  styleUrls: ['./view-user-dialog.component.scss']
})
export class ViewUserDialogComponent implements OnInit {

  userData
  user_type = sessionStorage.getItem('user_type');
  showCompanyName = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.userData = this.data?.data
    }
    this.check()
    console.log('this.data)', this.data);
  }

  check(){
    if(this.user_type === "super_admin" || this.user_type === "user_admin"){
      this.showCompanyName = false;
    }else{
      this.showCompanyName = true;
    }
  }

    /**
   * ON CLOSE DIALOG
   */
    onClose() {
      this.dialogRef.close();
    }

}

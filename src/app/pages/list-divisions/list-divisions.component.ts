import { DatePipe } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DivisionComponent } from 'src/app/dialog/division/division.component';
import { AuthService } from 'src/app/service/auth.service';
import { UiService } from 'src/app/service/ui.service';
import { ConfirmDialogComponent } from 'src/app/shared/dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-divisions',
  templateUrl: './list-divisions.component.html',
  styleUrls: ['./list-divisions.component.scss'],
})
export class ListDivisionsComponent implements OnInit {
  statusSelected = false;
  allDivision;
  buttonDisabled: Boolean = false;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subDataFour: Subscription;
  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private uiService: UiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllDivisions();
  }
  getAllDivisions() {
    
  // Get the token from sessionStorage
  const token = sessionStorage.getItem('token');
  console.log('token', token);
  

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

  console.log('Headers:', headers); // Log headers for debugging
    this.subDataOne = this.authService.getAllDivision(headers).subscribe({
      next: (res) => {
        if (res) {
          this.allDivision = res;
          console.log('res', res);
        } else {
          console.log('Error! Please try again.');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  public openEditControllerDialog(data?: any) {
    console.log('dialogResult.data', data);
    const dialogRef = this.dialog.open(DivisionComponent, {
      maxWidth: '600px',
      width: '95%',
      data: data,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult && dialogResult.data) {
        if (data) {
          this.updateDivisionId(data.id, dialogResult.data);
        } else {
          this.addDivision(dialogResult.data);
        }
      }
    });
  }
  subCategory(data) {
    console.log('data', data._id);

    this.router.navigate(['/list-sub-divisions', data._id]);
  }
  addDivision(data: any) {
    this.subDataTwo = this.authService.addDivisions(data).subscribe({
      next: (res) => {
        if (res) {
          console.log('Division added successfully');
          this.uiService.success('Division added successfully');

          this.getAllDivisions();
        } else {
          console.log('Error! Please try again.');
        }
      },
      error: (err) => {
        console.log(err);
        this.uiService.wrong('Error! Please try again.');
      },
    });
  }

  public updateDivisionId(id: string, data: any) {
    this.subDataThree = this.authService
      .updateDivisionById(id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.uiService.success('Divivision Updated successfully');
          if (res) {
            this.getAllDivisions();
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  deleteDivision(id: string) {
    console.log('idsss', id);

    this.subDataFour = this.authService.deleteDivision(id).subscribe({
      next: (res) => {
        console.log('result', res);
        this.uiService.success('Division deleted successfully');
        if (res) {
          this.getAllDivisions();
        }
      },
      error: (err) => {
        console.log(err);
        this.uiService.wrong('Division delete failure');
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
        this.deleteDivision(data.id);
      }
    });
  }
}

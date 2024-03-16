import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubDivisionComponent } from 'src/app/dialog/sub-division/sub-division.component';
import { AuthService } from 'src/app/service/auth.service';
import { UiService } from 'src/app/service/ui.service';
import { ConfirmDialogComponent } from 'src/app/shared/dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-sub-division',
  templateUrl: './list-sub-division.component.html',
  styleUrls: ['./list-sub-division.component.scss'],
})
export class ListSubDivisionComponent implements OnInit {
  statusSelected = false;
  allSubDivision;
  buttonDisabled: Boolean = false;
  Id: any;
  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subDataFour: Subscription;
  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private uiService: UiService,
    private _route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.getAllSubDivisions();
    this._route.paramMap.subscribe((params) => {
      this.Id = params.get('id');
      console.log('this.Id', this.Id);
      if (this.Id) {
        this.getAllSubDivisions(this.Id);
      }
    });
  }
  getAllSubDivisions(cat_id) {
    this.subDataOne = this.authService.getAllSubCategory(cat_id).subscribe({
      next: (res) => {
        if (res) {
          this.allSubDivision = res['sub_categories']
          ;
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
  
  addQuestion(data) {
    console.log('data', data._id);

    this.router.navigate(['/add-question', data._id]);
  }
  public openEditControllerDialog(data?: any) {
    console.log('dialogResult.data', data);
    const dialogRef = this.dialog.open(SubDivisionComponent, {
      maxWidth: '600px',
      width: '95%',
      data: data,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult && dialogResult.data) {
        if (data) {
          this.updateSubDivisionId(data.id, dialogResult.data);
        } else {
          this.addSubDivision(dialogResult.data);
        }
      }
    });
  }

  addSubDivision(data: any) {
    this.subDataTwo = this.authService.addSubCategory(data).subscribe({
      next: (res) => {
        if (res) {
          console.log('Sub Division added successfully');
          this.uiService.success('sub Division added successfully');

          this.getAllSubDivisions(this.Id);
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

  public updateSubDivisionId(id: string, data: any) {
    this.subDataThree = this.authService
      .updateSubDivisionById(id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.uiService.success('Sub Divivision Updated successfully');
          if (res) {
            this.getAllSubDivisions(this.Id);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  deleteSubDivision(id: string) {
    console.log('idsss', id);

    this.subDataFour = this.authService.deleteSubDivision(id).subscribe({
      next: (res) => {
        console.log('result', res);
        this.uiService.success('Sub Division deleted successfully');
        if (res) {
          this.getAllSubDivisions(this.Id);
        }
      },
      error: (err) => {
        console.log(err);
        this.uiService.wrong('SAub Division delete failure');
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
        this.deleteSubDivision(data.id);
      }
    });
  }
}

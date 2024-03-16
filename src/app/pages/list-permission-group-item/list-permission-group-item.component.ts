import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { PermissionGroupItemDialogComponent } from 'src/app/dialog/permission-group-item-dialog/permission-group-item-dialog.component';
import { AuthService } from 'src/app/service/auth.service';
import { UiService } from 'src/app/service/ui.service';
import { UserDataService } from 'src/app/shared/service/user-data.service';
import { TableUtil } from 'src/app/shared/pdfxl/tableUtl';
import { TableXl } from 'src/app/shared/pdfxl/tableXl';
import * as XLSX from 'xlsx-js-style';
import { MatSort } from '@angular/material/sort';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { saveAs } from 'file-saver';
import { ConfirmDialogComponent } from 'src/app/shared/dialog/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-list-permission-group-item',
  templateUrl: './list-permission-group-item.component.html',
  styleUrls: ['./list-permission-group-item.component.scss'],
})
export class ListPermissionGroupItemComponent implements OnInit {
  allSubSubCategory;

  allPermissionGroupItem: any = null;
  allPermissionGroup: any = null;
  loggedInUserRolePermission: any;

  //store data for search
  filteredData: any;
  groupId: any;
  filterStatus: any;
  showFilterStatus: any;

  //show search data

  // Pagination
  page: number = 1;
  itemsPerPage = 20;
  totalItems: any;
  currPage: number = 1;
  showPegination = true;

  dataSource;
  displayedColumns = ['action', 'Sl', 'name', 'description'];
  allStatus: any[] = [
    { value: 1, viewValue: 'Active' },
    { value: 0, viewValue: 'Inactive' },
  ];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('table') table: MatTable<any>;
  @ViewChild('input', { static: false }) input: ElementRef;
  selectedGroup: any;
  selectedStatus: any;

  //dragable
  dragPossible = false;
  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subDataFour: Subscription;
  private subDataFive: Subscription;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private uiService: UiService,
    private userDataService: UserDataService,
    private changeDetectorRef: ChangeDetectorRef,
    public http: HttpClient,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loggedInUserRolePermission =
      this.userDataService.getLoggedInUserRolePermission();
    this.getAllSubSubCategory();
  }

  public openEditControllerDialog(data?: any) {
    const dialogRef = this.dialog.open(PermissionGroupItemDialogComponent, {
      maxWidth: '600px',
      width: '95%',
      data: data,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult && dialogResult.data) {
        if (data) {
          this.updatePermissionGroupItem(data.id, dialogResult.data);
        } else {
          this.addPermissionGroupItem(dialogResult.data);
        }
      }
    });
  }

  addPermissionGroupItem(data: any) {
    this.subDataTwo = this.authService.addSubSubCategory(data).subscribe({
      next: (res) => {
        console.log('res', res);
        if (res) {
          console.log('Permission Group Item added successfully', res);
          this.uiService.success('Permission Group Item added successfully');
        } else {
          console.log('Error! Please try again.');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  public updatePermissionGroupItem(id: string, data: any) {
    this.subDataThree = this.authService
      .updatePermissionGroupItem(id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.uiService.success('Permission Group Item Updated successfully');
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  deletePermissionGroupItem(id: string) {
    console.log('id', id);
    this.subDataFour = this.authService
      .deletePermissionGroupItem(id)
      .subscribe({
        next: (res) => {
          console.log('res', res);
          this.uiService.success('Permission Group Item deleted successfully');
        },
        error: (err) => {
          console.log(err);
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
        this.deletePermissionGroupItem(data.id);
      }
    });
  }

  getAllSubSubCategory() {
    this.authService.getAllSubSubCategory().subscribe({
      next: (res) => {
        if (res) {
          console.log('all sub Category', res);
          this.allSubSubCategory = res;
        } else {
          console.log('Error! Please try again.');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addDevice(data) {
    console.log('data', data._id);

    this.router.navigate(['/comapny/device', data._id]);
  }

  //extra pdf

  /**
   * ON DESTROY
   */
  ngOnDestroy() {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
    if (this.subDataTwo) {
      this.subDataTwo.unsubscribe();
    }
    if (this.subDataThree) {
      this.subDataThree.unsubscribe();
    }
    if (this.subDataFour) {
      this.subDataFour.unsubscribe();
    }
    if (this.subDataFive) {
      this.subDataFive.unsubscribe();
    }
  }
}

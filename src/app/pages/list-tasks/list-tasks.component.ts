import { TaskComponent } from './../../dialog/task/task.component';
import { DatePipe } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { TaskService } from 'src/app/service/task.service';
import { UiService } from 'src/app/service/ui.service';
import { ConfirmDialogComponent } from 'src/app/shared/dialog/confirm-dialog/confirm-dialog.component';
interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date; 
  status: 'completed' | 'not completed'; 
}
@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss'],
})
export class ListTasksComponent implements OnInit {
  statusSelected = false;
  allTask;
  buttonDisabled: Boolean = false;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subDataFour: Subscription;
  displayedColumns = ['actions', 'name', 'slug']; // Add 'slug' column
  dataSource = new MatTableDataSource<any>([]);
  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private uiService: UiService,
    private router: Router,
    private taskService: TaskService,
  ) {}

  ngOnInit(): void {
    this.taskService.tasks$.subscribe(tasks => {
      this.dataSource.data = tasks;
      this.allTask= tasks
      console.log('all-data',  tasks);
      
    });
  }
  // getAllTasks() {
    

  

  //   this.subDataOne = this.authService.getAllDivision().subscribe({
  //     next: (res) => {
  //       if (res) {
  //         this.allTask = res;
  //         console.log('res', res);
  //       } else {
  //         console.log('Error! Please try again.');
  //       }
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }
  public openEditControllerDialog(data?: any) {
    console.log('dialogResult.data', data);
    const dialogRef = this.dialog.open(TaskComponent, {
      maxWidth: '600px',
      width: '95%',
      data: data,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult && dialogResult.data) {
        if (data) {
          console.log('datasss', data);
          console.log('dialogResult', dialogResult.data);
          
          this.updateDivisionId(data.id, dialogResult.data);
        } else {
          this.addTask(dialogResult.data);
        }
      }
    });
  }
  addTask(data: Task) { // Corrected signature
    this.taskService.addTask(data); // Use service method
    this.uiService.success('Task added successfully');
  }

  updateDivisionId(id: string, data: Task) {
    this.taskService.updateTask(id , data);  // Use service method
    this.uiService.success('Task updated successfully');
  }

  deleteDivision(id: string) {
    this.taskService.deleteTask(id);  // Use service method
    this.uiService.success('Task deleted successfully');
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

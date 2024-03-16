import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
})
export class MemberComponent implements OnInit {
  allMember;
  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllMember();
  }
  getAllMember() {
    this.authService.getAllMember().subscribe({
      next: (res) => {
        if (res) {
          this.allMember = res;
          console.log('allMember', res);
          this.spinner.hide();
        } else {
          console.log('Error! Please try again.');
        }
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide();
      },
    });
  }
}

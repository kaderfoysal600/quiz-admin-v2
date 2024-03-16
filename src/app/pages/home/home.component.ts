import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { UiService } from 'src/app/service/ui.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  allDivision;
  allSubDivision;
  filteredSubDivision;
  constructor(
    private authService: AuthService,
    private uiService: UiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllDivisions();
    this.getAllSubDivisions();
  }

  getAllDivisions() {
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

  console.log('Headers:', headers); // Log headers for debugging
    this.authService.getAllDivision(headers).subscribe({
      next: (res) => {
        if (res) {
          this.allDivision = res;
          console.log('res', res);
          this.getallSub();
        } else {
          console.log('Error! Please try again.');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAllSubDivisions() {
    this.authService.getAllSubDivision().subscribe({
      next: (res) => {
        if (res) {
          this.allSubDivision = res;
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
  getallSub() {
    this.filteredSubDivision = this.allSubDivision;
  }
  getSubDivisionById(id) {
    this.filteredSubDivision = this.allSubDivision.filter(
      (sub) => sub.division_id === id
    );
  }

  seeMore(data) {
    this.router.navigate(['/ashon-detail', data.id]);
  }
}

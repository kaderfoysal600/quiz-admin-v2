import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-ashon-detail',
  templateUrl: './ashon-detail.component.html',
  styleUrls: ['./ashon-detail.component.scss'],
})
export class AshonDetailComponent implements OnInit {
  Id;
  allSubDivision;
  singleSub;
  allMember;
  filteredMember;
  constructor(
    private _route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this._route.paramMap.subscribe((params) => {
      this.Id = params.get('id');
      console.log('Id', this.Id);
    });
    this.getAshonById();
    this.getAllMember();
  }

  getAshonById() {
    this.authService.getAllSubDivision().subscribe({
      next: (res) => {
        if (res) {
          console.log('edittttt', res);

          this.allSubDivision = res;
          this.singleSub = this.allSubDivision.find(
            (subDivision) => subDivision?.id == this.Id
          );
          console.log('singleSub', this.singleSub);
        } else {
          console.log('Error! Please try again.');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAllMember() {
    this.authService.getAllMember().subscribe({
      next: (res) => {
        if (res) {
          this.allMember = res;
          this.getFilteredMember();
          console.log('allMember', res);
        } else {
          console.log('Error! Please try again.');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getFilteredMember() {
    this.filteredMember = this.allMember.filter((member) => {
      return member.sub_division_id == this.singleSub?.id;
    });
    console.log('filteredMember', this.filteredMember);
  }
}

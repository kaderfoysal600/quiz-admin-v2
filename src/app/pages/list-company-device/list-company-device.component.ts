import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-list-company-device',
  templateUrl: './list-company-device.component.html',
  styleUrls: ['./list-company-device.component.scss']
})
export class ListCompanyDeviceComponent implements OnInit {

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.listCompanyDevice()
  }
  listCompanyDevice() {
    this.authService.listCompanyDevice().subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

}

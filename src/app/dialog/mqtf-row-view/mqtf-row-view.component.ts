import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-mqtf-row-view',
  templateUrl: './mqtf-row-view.component.html',
  styleUrls: ['./mqtf-row-view.component.scss']
})
export class MqtfRowViewComponent implements OnInit {
parsData 
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.parsData  = { ...this.data.data, log: JSON.parse(this.data.data.log) };
    console.log('this.parsData', this.parsData);
    
  }

}

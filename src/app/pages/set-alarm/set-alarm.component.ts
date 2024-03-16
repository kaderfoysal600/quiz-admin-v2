import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-set-alarm',
  templateUrl: './set-alarm.component.html',
  styleUrls: ['./set-alarm.component.scss']
})
export class SetAlarmComponent implements OnInit {
  isChecked = true;
  formGroup: FormGroup;
  constructor(formBuilder: FormBuilder) { 
    this.formGroup = formBuilder.group({
      minTemp1: '',
      maxTemp1: '',
      alarmTemp1: '',
    });
  }
  onFormSubmit() {
    alert(JSON.stringify(this.formGroup.value, null, 2));
  }

  ngOnInit(): void {
  }
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-device-alarm',
  templateUrl: './device-alarm.component.html',
  styleUrls: ['./device-alarm.component.scss']
})
export class DeviceAlarmComponent implements OnInit {

  isChecked = true;
  formGroup: FormGroup;
  temperatureFormGroups: FormGroup[] = [];
  constructor(
    formBuilder: FormBuilder,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { 
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
    console.log('device data ', this.data);
    this.generateTemperatureFormGroups();
    
  }
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }


  //temp



  generateTemperatureFormGroups(): void {
    for (let i = 1; i <= this.data.Temperature; i++) {
      const formGroup = this.fb.group({
        minTemp: [null, Validators.required],
        maxTemp: [null, Validators.required],
        alarmTemp: ''
      });
      this.temperatureFormGroups.push(formGroup);
    }
  }

  getTemperatureSettings(): { title: string }[] {
    return Array.from({ length: this.data.Temperature }, (_, index) => ({ title: `Temperature ${index + 1}` }));
  }

  getTemperatureFormGroup(setting: { title: string }): FormGroup {
    const index = this.getTemperatureSettings().findIndex(s => s.title === setting.title);
    return this.temperatureFormGroups[index];
  }

  onTemperatureFormSubmit(): void {
    // Handle temperature form submission logic
  }

  // formatLabel(value: number): string {
  //   // Your label formatting logic
  //   return value.toString();
  // }
}

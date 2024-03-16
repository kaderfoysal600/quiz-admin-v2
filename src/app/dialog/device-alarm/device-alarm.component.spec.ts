import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceAlarmComponent } from './device-alarm.component';

describe('DeviceAlarmComponent', () => {
  let component: DeviceAlarmComponent;
  let fixture: ComponentFixture<DeviceAlarmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceAlarmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceAlarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

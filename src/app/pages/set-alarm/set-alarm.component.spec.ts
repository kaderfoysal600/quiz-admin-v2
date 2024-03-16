import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetAlarmComponent } from './set-alarm.component';

describe('SetAlarmComponent', () => {
  let component: SetAlarmComponent;
  let fixture: ComponentFixture<SetAlarmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetAlarmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetAlarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

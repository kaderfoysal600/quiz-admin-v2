import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MqtfLogsComponent } from './mqtf-logs.component';

describe('MqtfLogsComponent', () => {
  let component: MqtfLogsComponent;
  let fixture: ComponentFixture<MqtfLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MqtfLogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MqtfLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

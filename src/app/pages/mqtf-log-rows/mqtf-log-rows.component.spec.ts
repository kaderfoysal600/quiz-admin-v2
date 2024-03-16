import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MqtfLogRowsComponent } from './mqtf-log-rows.component';

describe('MqtfLogRowsComponent', () => {
  let component: MqtfLogRowsComponent;
  let fixture: ComponentFixture<MqtfLogRowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MqtfLogRowsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MqtfLogRowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

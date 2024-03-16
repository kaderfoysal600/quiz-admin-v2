import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MqtfRowViewComponent } from './mqtf-row-view.component';

describe('MqtfRowViewComponent', () => {
  let component: MqtfRowViewComponent;
  let fixture: ComponentFixture<MqtfRowViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MqtfRowViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MqtfRowViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompanyDeviceComponent } from './edit-company-device.component';

describe('EditCompanyDeviceComponent', () => {
  let component: EditCompanyDeviceComponent;
  let fixture: ComponentFixture<EditCompanyDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCompanyDeviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCompanyDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

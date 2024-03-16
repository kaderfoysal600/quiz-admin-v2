import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCompanyDeviceComponent } from './list-company-device.component';

describe('ListCompanyDeviceComponent', () => {
  let component: ListCompanyDeviceComponent;
  let fixture: ComponentFixture<ListCompanyDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCompanyDeviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCompanyDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

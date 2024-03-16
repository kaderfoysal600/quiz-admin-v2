import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AshonDetailComponent } from './ashon-detail.component';

describe('AshonDetailComponent', () => {
  let component: AshonDetailComponent;
  let fixture: ComponentFixture<AshonDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AshonDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AshonDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

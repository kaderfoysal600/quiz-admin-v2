import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubDivisionComponent } from './sub-division.component';

describe('SubDivisionComponent', () => {
  let component: SubDivisionComponent;
  let fixture: ComponentFixture<SubDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubDivisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

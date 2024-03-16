import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSubDivisionComponent } from './list-sub-division.component';

describe('ListSubDivisionComponent', () => {
  let component: ListSubDivisionComponent;
  let fixture: ComponentFixture<ListSubDivisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSubDivisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSubDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

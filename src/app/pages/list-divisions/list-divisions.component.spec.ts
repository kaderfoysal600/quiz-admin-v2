import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDivisionsComponent } from './list-divisions.component';

describe('ListDivisionsComponent', () => {
  let component: ListDivisionsComponent;
  let fixture: ComponentFixture<ListDivisionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDivisionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDivisionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

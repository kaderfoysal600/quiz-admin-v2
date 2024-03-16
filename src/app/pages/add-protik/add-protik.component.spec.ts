import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProtikComponent } from './add-protik.component';

describe('AddProtikComponent', () => {
  let component: AddProtikComponent;
  let fixture: ComponentFixture<AddProtikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProtikComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProtikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

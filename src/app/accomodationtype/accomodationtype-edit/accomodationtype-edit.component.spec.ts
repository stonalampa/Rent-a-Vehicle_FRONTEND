import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomodationtypeEditComponent } from './accomodationtype-edit.component';

describe('AccomodationtypeEditComponent', () => {
  let component: AccomodationtypeEditComponent;
  let fixture: ComponentFixture<AccomodationtypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccomodationtypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccomodationtypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

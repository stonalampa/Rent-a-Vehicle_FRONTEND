import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomodationDetailsComponent } from './accomodation-details.component';

describe('AccomodationDetailsComponent', () => {
  let component: AccomodationDetailsComponent;
  let fixture: ComponentFixture<AccomodationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccomodationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccomodationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

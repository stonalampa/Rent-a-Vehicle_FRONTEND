import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomodationtypeComponent } from './accomodationtype.component';

describe('AccomodationtypeComponent', () => {
  let component: AccomodationtypeComponent;
  let fixture: ComponentFixture<AccomodationtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccomodationtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccomodationtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

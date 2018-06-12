import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomodationAddComponent } from './accomodation-add.component';

describe('AccomodationAddComponent', () => {
  let component: AccomodationAddComponent;
  let fixture: ComponentFixture<AccomodationAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccomodationAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccomodationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

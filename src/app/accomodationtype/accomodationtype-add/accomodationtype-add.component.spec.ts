import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomodationtypeAddComponent } from './accomodationtype-add.component';

describe('AccomodationtypeAddComponent', () => {
  let component: AccomodationtypeAddComponent;
  let fixture: ComponentFixture<AccomodationtypeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccomodationtypeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccomodationtypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

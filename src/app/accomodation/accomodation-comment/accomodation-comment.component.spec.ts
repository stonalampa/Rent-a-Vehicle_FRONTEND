import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomodationCommentComponent } from './accomodation-comment.component';

describe('AccomodationCommentComponent', () => {
  let component: AccomodationCommentComponent;
  let fixture: ComponentFixture<AccomodationCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccomodationCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccomodationCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

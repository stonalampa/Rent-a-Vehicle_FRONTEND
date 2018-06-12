import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomReservationEditComponent } from './room-reservation-edit.component';

describe('RoomReservationEditComponent', () => {
  let component: RoomReservationEditComponent;
  let fixture: ComponentFixture<RoomReservationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomReservationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomReservationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

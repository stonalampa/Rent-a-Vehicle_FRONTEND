import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomReservationAddComponent } from './room-reservation-add.component';

describe('RoomReservationAddComponent', () => {
  let component: RoomReservationAddComponent;
  let fixture: ComponentFixture<RoomReservationAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomReservationAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomReservationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

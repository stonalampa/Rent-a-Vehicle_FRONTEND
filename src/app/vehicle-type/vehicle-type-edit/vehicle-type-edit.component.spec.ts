import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTypeEditComponent } from './vehicle-type-edit.component';

describe('VehicleTypeEditComponent', () => {
  let component: VehicleTypeEditComponent;
  let fixture: ComponentFixture<VehicleTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTypeAddComponent } from './vehicle-type-add.component';

describe('VehicleTypeAddComponent', () => {
  let component: VehicleTypeAddComponent;
  let fixture: ComponentFixture<VehicleTypeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleTypeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

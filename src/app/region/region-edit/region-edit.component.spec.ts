import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionEditComponent } from './region-edit.component';

describe('RegionEditComponent', () => {
  let component: RegionEditComponent;
  let fixture: ComponentFixture<RegionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

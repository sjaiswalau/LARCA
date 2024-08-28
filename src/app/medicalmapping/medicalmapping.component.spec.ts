import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalmappingComponent } from './medicalmapping.component';

describe('MedicalmappingComponent', () => {
  let component: MedicalmappingComponent;
  let fixture: ComponentFixture<MedicalmappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalmappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalmappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

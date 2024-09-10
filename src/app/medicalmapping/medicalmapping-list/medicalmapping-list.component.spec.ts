import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalMappingListComponent } from './medicalmapping-list.component';

describe('MedicalmappingComponent', () => {
  let component: MedicalMappingListComponent;
  let fixture: ComponentFixture<MedicalMappingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedicalMappingListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalMappingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

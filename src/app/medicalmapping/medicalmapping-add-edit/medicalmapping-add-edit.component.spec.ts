import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalmappingAddEditComponent } from './medicalmapping-add-edit.component';

describe('MedicalmappingAddEditComponent', () => {
  let component: MedicalmappingAddEditComponent;
  let fixture: ComponentFixture<MedicalmappingAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalmappingAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalmappingAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

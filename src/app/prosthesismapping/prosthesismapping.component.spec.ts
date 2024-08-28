import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsthesismappingComponent } from './prosthesismapping.component';

describe('ProsthesismappingComponent', () => {
  let component: ProsthesismappingComponent;
  let fixture: ComponentFixture<ProsthesismappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProsthesismappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProsthesismappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasePayControlComponent } from './casepaycontrol.component';

describe('CasePayControlComponent', () => {
  let component: CasePayControlComponent;
  let fixture: ComponentFixture<CasePayControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasePayControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasePayControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

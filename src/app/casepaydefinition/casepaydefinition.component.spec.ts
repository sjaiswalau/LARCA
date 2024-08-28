import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasePayDefinitionComponent } from './casepaydefinition.component';

describe('CasePayDefinitionComponent', () => {
  let component: CasePayDefinitionComponent;
  let fixture: ComponentFixture<CasePayDefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasePayDefinitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasePayDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyRequirementsComponent } from './pharmacy-requirements.component';

describe('PharmacyRequirementsComponent', () => {
  let component: PharmacyRequirementsComponent;
  let fixture: ComponentFixture<PharmacyRequirementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacyRequirementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

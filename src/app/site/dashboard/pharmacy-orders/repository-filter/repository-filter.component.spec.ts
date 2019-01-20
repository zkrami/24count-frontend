import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryFilterComponent } from './repository-filter.component';

describe('RepositoryFilterComponent', () => {
  let component: RepositoryFilterComponent;
  let fixture: ComponentFixture<RepositoryFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepositoryFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryItemsComponent } from './repository-items.component';

describe('RepositoryItemsComponent', () => {
  let component: RepositoryItemsComponent;
  let fixture: ComponentFixture<RepositoryItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepositoryItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

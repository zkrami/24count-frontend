import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailsInputComponent } from './item-details-input.component';

describe('ItemDetailsInputComponent', () => {
  let component: ItemDetailsInputComponent;
  let fixture: ComponentFixture<ItemDetailsInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemDetailsInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDetailsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

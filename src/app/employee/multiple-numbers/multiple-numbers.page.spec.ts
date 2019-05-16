import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleNumbersPage } from './multiple-numbers.page';

describe('MultipleNumbersPage', () => {
  let component: MultipleNumbersPage;
  let fixture: ComponentFixture<MultipleNumbersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleNumbersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleNumbersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

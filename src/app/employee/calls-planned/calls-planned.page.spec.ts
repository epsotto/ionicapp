import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallsPlannedPage } from './calls-planned.page';

describe('CallsPlannedPage', () => {
  let component: CallsPlannedPage;
  let fixture: ComponentFixture<CallsPlannedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallsPlannedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallsPlannedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

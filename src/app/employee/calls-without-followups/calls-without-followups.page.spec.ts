import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallsWithoutFollowupsPage } from './calls-without-followups.page';

describe('CallsWithoutFollowupsPage', () => {
  let component: CallsWithoutFollowupsPage;
  let fixture: ComponentFixture<CallsWithoutFollowupsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallsWithoutFollowupsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallsWithoutFollowupsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

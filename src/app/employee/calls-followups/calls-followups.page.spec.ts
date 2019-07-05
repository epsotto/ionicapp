import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallsFollowupsPage } from './calls-followups.page';

describe('CallsFollowupsPage', () => {
  let component: CallsFollowupsPage;
  let fixture: ComponentFixture<CallsFollowupsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallsFollowupsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallsFollowupsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

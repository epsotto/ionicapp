import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallCommentsPage } from './call-comments.page';

describe('CallCommentsPage', () => {
  let component: CallCommentsPage;
  let fixture: ComponentFixture<CallCommentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallCommentsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallCommentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

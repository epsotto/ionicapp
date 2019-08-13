import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallsArrangeFsvPage } from './calls-arrange-fsv.page';

describe('CallsArrangeFsvPage', () => {
  let component: CallsArrangeFsvPage;
  let fixture: ComponentFixture<CallsArrangeFsvPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallsArrangeFsvPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallsArrangeFsvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

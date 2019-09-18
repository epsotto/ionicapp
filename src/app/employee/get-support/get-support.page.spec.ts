import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSupportPage } from './get-support.page';

describe('GetSupportPage', () => {
  let component: GetSupportPage;
  let fixture: ComponentFixture<GetSupportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetSupportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetSupportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

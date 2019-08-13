import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverduesPage } from './overdues.page';

describe('OverduesPage', () => {
  let component: OverduesPage;
  let fixture: ComponentFixture<OverduesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverduesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverduesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

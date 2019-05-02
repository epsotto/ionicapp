import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOpportunityPage } from './view-opportunity.page';

describe('ViewOpportunityPage', () => {
  let component: ViewOpportunityPage;
  let fixture: ComponentFixture<ViewOpportunityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOpportunityPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOpportunityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

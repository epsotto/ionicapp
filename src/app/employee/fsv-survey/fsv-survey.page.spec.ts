import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsvSurveyPage } from './fsv-survey.page';

describe('FsvSurveyPage', () => {
  let component: FsvSurveyPage;
  let fixture: ComponentFixture<FsvSurveyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsvSurveyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsvSurveyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

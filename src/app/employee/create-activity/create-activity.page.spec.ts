import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActivityPage } from './create-activity.page';

describe('CreateActivityPage', () => {
  let component: CreateActivityPage;
  let fixture: ComponentFixture<CreateActivityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateActivityPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateActivityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetDetailPage } from './set-detail.page';

describe('SetDetailPage', () => {
  let component: SetDetailPage;
  let fixture: ComponentFixture<SetDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

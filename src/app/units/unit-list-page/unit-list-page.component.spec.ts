import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitListPageComponent } from './unit-list-page.component';

describe('UnitListPageComponent', () => {
  let component: UnitListPageComponent;
  let fixture: ComponentFixture<UnitListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitGenerateComponent } from './unit-generate.component';

describe('UnitGenerateComponent', () => {
  let component: UnitGenerateComponent;
  let fixture: ComponentFixture<UnitGenerateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitGenerateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

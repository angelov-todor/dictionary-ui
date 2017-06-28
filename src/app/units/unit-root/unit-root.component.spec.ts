import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitRootComponent } from './unit-root.component';

describe('UnitRootComponent', () => {
  let component: UnitRootComponent;
  let fixture: ComponentFixture<UnitRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

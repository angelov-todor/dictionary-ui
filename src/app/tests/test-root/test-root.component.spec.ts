import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRootComponent } from './test-root.component';

describe('TestRootComponent', () => {
  let component: TestRootComponent;
  let fixture: ComponentFixture<TestRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestRootComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

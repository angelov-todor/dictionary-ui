import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestGenerateComponent } from './test-generate.component';

describe('TestGenerateComponent', () => {
  let component: TestGenerateComponent;
  let fixture: ComponentFixture<TestGenerateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestGenerateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

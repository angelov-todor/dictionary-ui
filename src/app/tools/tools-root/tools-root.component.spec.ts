import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsRootComponent } from './tools-root.component';

describe('ToolsRootComponent', () => {
  let component: ToolsRootComponent;
  let fixture: ComponentFixture<ToolsRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SokobanGameComponent } from './sokoban-game.component';

describe('SokobanGameComponent', () => {
  let component: SokobanGameComponent;
  let fixture: ComponentFixture<SokobanGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SokobanGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SokobanGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

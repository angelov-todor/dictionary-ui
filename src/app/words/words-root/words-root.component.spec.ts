import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsRootComponent } from './words-root.component';

describe('WordsRootComponent', () => {
  let component: WordsRootComponent;
  let fixture: ComponentFixture<WordsRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordsRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordsRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CognitiveSkillsRootComponent } from './cognitive-skills-root.component';

describe('CognitiveSkillsRootComponent', () => {
  let component: CognitiveSkillsRootComponent;
  let fixture: ComponentFixture<CognitiveSkillsRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CognitiveSkillsRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CognitiveSkillsRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

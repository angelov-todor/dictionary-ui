import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CognitiveSkillViewComponent } from './cognitive-skill-view.component';

describe('CognitiveSkillViewComponent', () => {
  let component: CognitiveSkillViewComponent;
  let fixture: ComponentFixture<CognitiveSkillViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CognitiveSkillViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CognitiveSkillViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

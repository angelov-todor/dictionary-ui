import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CognitiveSkillListComponent } from './cognitive-skill-list.component';

describe('CognitiveSkillListComponent', () => {
  let component: CognitiveSkillListComponent;
  let fixture: ComponentFixture<CognitiveSkillListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CognitiveSkillListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CognitiveSkillListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

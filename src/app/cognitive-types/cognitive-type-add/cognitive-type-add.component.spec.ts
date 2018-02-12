import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CognitiveTypeAddComponent } from './cognitive-type-add.component';

describe('CognitiveTypeAddComponent', () => {
  let component: CognitiveTypeAddComponent;
  let fixture: ComponentFixture<CognitiveTypeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CognitiveTypeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CognitiveTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

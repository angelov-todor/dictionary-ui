import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CognitiveTypesListPageComponent } from './cognitive-types-list-page.component';

describe('CognitiveTypesListPageComponent', () => {
  let component: CognitiveTypesListPageComponent;
  let fixture: ComponentFixture<CognitiveTypesListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CognitiveTypesListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CognitiveTypesListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

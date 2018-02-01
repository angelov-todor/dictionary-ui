import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CognitiveTypeListComponent } from './cognitive-type-list.component';

describe('CognitiveTypeListComponent', () => {
  let component: CognitiveTypeListComponent;
  let fixture: ComponentFixture<CognitiveTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CognitiveTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CognitiveTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

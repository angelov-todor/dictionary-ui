import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageEnrichComponent } from './image-enrich.component';

describe('ImageEnrichComponent', () => {
  let component: ImageEnrichComponent;
  let fixture: ComponentFixture<ImageEnrichComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageEnrichComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageEnrichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

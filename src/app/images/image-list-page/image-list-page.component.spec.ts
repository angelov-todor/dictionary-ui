import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageListPageComponent } from './image-list-page.component';

describe('ImageListPageComponent', () => {
  let component: ImageListPageComponent;
  let fixture: ComponentFixture<ImageListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

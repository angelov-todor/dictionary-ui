import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageRootComponent } from './image-root.component';

describe('ImageRootComponent', () => {
  let component: ImageRootComponent;
  let fixture: ComponentFixture<ImageRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

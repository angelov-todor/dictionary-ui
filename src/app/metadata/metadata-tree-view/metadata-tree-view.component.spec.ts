import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataTreeViewComponent } from './metadata-tree-view.component';

describe('MetadataTreeViewComponent', () => {
  let component: MetadataTreeViewComponent;
  let fixture: ComponentFixture<MetadataTreeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetadataTreeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataTreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

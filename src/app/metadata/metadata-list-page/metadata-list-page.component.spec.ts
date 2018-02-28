import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataListPageComponent } from './metadata-list-page.component';

describe('MetadataListPageComponent', () => {
  let component: MetadataListPageComponent;
  let fixture: ComponentFixture<MetadataListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetadataListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

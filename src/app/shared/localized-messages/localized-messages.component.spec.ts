import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizedMessagesComponent } from './localized-messages.component';

describe('LocalizedMessagesComponent', () => {
  let component: LocalizedMessagesComponent;
  let fixture: ComponentFixture<LocalizedMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalizedMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalizedMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

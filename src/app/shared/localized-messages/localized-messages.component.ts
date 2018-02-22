import { Component, Input } from '@angular/core';
import { LocalizedMessages } from './localized-messages';

@Component({
  selector: 'app-localized-messages',
  template: '<!-- -->'
})
export class LocalizedMessagesComponent {
  @Input() set signup(v) {
    LocalizedMessages.signup = v;
  }
}

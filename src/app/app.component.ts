import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  localesList: object = [
    { code: 'en-US', label: 'EN'},
    { code: 'ru', label: 'RU'}
  ];
}

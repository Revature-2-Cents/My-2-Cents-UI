import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document,) {}
  title = 'My-2-Cents-UI';

  logout(): void {
    console.log(this.doc.location);
    this.auth.logout({ returnTo: this.doc.location.origin });
    alert('Successfully logout!');
  }
}

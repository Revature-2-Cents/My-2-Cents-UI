import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-track-multiple-accounts',
  templateUrl: './track-multiple-accounts.component.html',
  styleUrls: ['./track-multiple-accounts.component.css'],
})
export class TrackMultipleAccountsComponent implements OnInit {
  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  ngOnInit(): void {
    this.GetUserInfo;
  }

  GetUserInfo() {
    this.auth.user$.subscribe((profile) => {
      console.log(profile);
    });
  }

  logout(): void {
    console.log(this.doc.location);
    this.auth.logout({ returnTo: this.doc.location.origin });
    alert('Successfully logout!');
  }
}

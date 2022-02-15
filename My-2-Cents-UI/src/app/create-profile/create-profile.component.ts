import { DOCUMENT } from '@angular/common';
import { Component, Inject, Injectable, Input, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';
import { UserLoginInfo } from '../Login';
import { My2CentsService } from '../my2-cents.service';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private my2centsService: My2CentsService,
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document) { }

    @Input() userId: number = -1;
  ngOnInit(): void {
  }

}

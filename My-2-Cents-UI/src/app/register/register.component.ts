import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { My2CentsService } from '../my2-cents.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
@Input() userId: number = -1;
  constructor(
    private http: HttpClient,
    private my2centsservice: My2CentsService
  ) { }

  ngOnInit(): void {
    console.log(this.userId);
  }

  CreateNewAccount(totalBalance: number, accountType: number, ) {
    return
  }

}

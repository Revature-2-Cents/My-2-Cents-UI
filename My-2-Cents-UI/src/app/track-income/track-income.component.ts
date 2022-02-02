import { Component, OnInit } from '@angular/core';
import { Expenses, Mock_Items } from '../mock-incomes'

@Component({
  selector: 'app-track-income',
  templateUrl: './track-income.component.html',
  styleUrls: ['./track-income.component.css']
})
export class TrackIncomeComponent implements OnInit {

  Items : Expenses[] = Mock_Items;
  ShowDetails = false;

  constructor() { }

  ngOnInit(): void {
  }

  ToggleDetails(): void{
    this.ShowDetails = !this.ShowDetails;
  }


}

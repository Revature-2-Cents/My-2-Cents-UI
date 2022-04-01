import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js';

@Component({
  selector: 'app-budget-chart',
  templateUrl: './budget-chart.component.html',
  styleUrls: ['./budget-chart.component.css']
})
export class BudgetChartComponent implements OnInit, DoCheck {

  want: number = 0;
  save: number = 0;

  @Input()
  userIncome: number;
  @Input()
  userExpenses: number;
  @Input()
  buttonCheck : boolean;
  // @Input()
  // useChart: boolean;
  need: number = 0;

  

  

  constructor() { }

  ngDoCheck(): void {
    if (this.buttonCheck)
    {
      console.log("buttonCheck returned true")
      this.buttonCheck = false;
      this.calculate();
      
      // this.createChart();
      
    }
    else
    {
      console.log("buttonCheck returned false")
    }
    }

  

  ngOnInit(): void {
    this.calculate();
    this.createChart();
  }


  update()
  {
    
  }

  calculate()
  {
    if (this.userExpenses <= this.userIncome * 0.5)
    {
      this.need = this.userExpenses;
      this.want = this.userIncome * (0.3 + (0.5 - (this.userExpenses / this.userIncome)));
      this.save = this.userIncome * 0.2;
    }
    else if (this.userExpenses <= this.userIncome * 0.8) 
    {
      this.need = this.userExpenses;
      this.want = this.userIncome * (0.8 - (this.userExpenses / this.userIncome));
      this.save = this.userIncome * 0.2;
    }
    else if (this.userExpenses <= this.userIncome * 0.99)
    {
      this.need = this.userExpenses;
      this.want = 0;
      this.save = this.userIncome * (1 - (this.userExpenses / this.userIncome));
    }
    else
    {
      this.need = this.userExpenses;
      this.want = 0;
      this.save = 0;
    }
    console.log(this.need, this.want, this.save)
  }

  createChart()
  {
    // if (this.buttonCheck)
    // {
    //   console.log("I got this far")
    //   myChart.destroy();
      
    // }
    const ctx = document.getElementById('myChart');
    const myChart = new Chart("myChart", {
      type: 'doughnut',
      data: {
        labels: ['Expenses', 'Wants', 'Save'],
        datasets: [{
          data: [this.need, this.want, this.save],
          backgroundColor: [
            'rgba(255, 25, 4, 0.5)', //#ff1904
            'rgba(25, 4, 255, 0.5)', //#1904ff
            'rgba(4, 255, 25, 0.5)'  //#04ff19
          ],
          hoverBackgroundColor:[
            'rgba(65, 50, 230, 1)', //#4132e6
            'rgba(50, 230, 65, 1)', //#32e641
            'rgba(230, 65, 50, 1)', //#e64132
          ],
          hoverBorderColor:[
            'rgba(255, 25, 4, 0.5)', //#ff1904
            'rgba(25, 4, 255, 0.5)', //#1904ff
            'rgba(4, 255, 25, 0.5)'  //#04ff19
          ],
          borderColor: [
            'rgba(65, 50, 230, 1)', //#4132e6
            'rgba(50, 230, 65, 1)', //#32e641
            'rgba(230, 65, 50, 1)', //#e64132
            
          ],
          borderWidth: 2
        }]
      }
    });
  }

}

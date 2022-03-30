import { Component, Input, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js';

@Component({
  selector: 'app-budget-chart',
  templateUrl: './budget-chart.component.html',
  styleUrls: ['./budget-chart.component.css']
})
export class BudgetChartComponent implements OnInit {

  want: number;
  save: number;

  @Input()
  userIncome: number;
  @Input()
  userExpenses: number;
  // @Input()
  // useChart: boolean;

  

  constructor() { }

  

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
      this.want = this.userIncome * (0.3 + (0.5 - (this.userExpenses / this.userIncome)));
      this.save = this.userIncome * 0.2;
    }
    else if (this.userExpenses <= this.userIncome * 0.8) 
    {
      this.want = this.userIncome * (0.8 - (this.userExpenses / this.userIncome));
      this.save = this.userIncome * 0.2;
    }
    else if (this.userExpenses <= this.userIncome * 0.99)
    {
      this.want = 0;
      this.save = this.userIncome * (1 - (this.userExpenses / this.userIncome));
    }
    else
    {
      this.want = 0;
      this.save = 0;
    }
  }

  createChart()
  {
    const ctx = document.getElementById('myChart');
    const myChart = new Chart("myChart", {
      type: 'doughnut',
      data: {
        // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        labels: ['Expenses', 'Wants', 'Save'],
        datasets: [{
          label: '# of Votes',
          // data: [this.income, this.expenses],
          data: [this.userExpenses, this.want, this.save],
          backgroundColor: [
            // 'rgba(255, 99, 132, 1)',
            // 'rgba(54, 162, 235, 1)',
            // 'rgba(255, 206, 86, 1)'
            'rgba(255, 25, 4, 0.5)', //#ff1904
            'rgba(25, 4, 255, 0.5)', //#1904ff
            'rgba(4, 255, 25, 0.5)'  //#04ff19
          ],
          borderColor: [
            'rgba(65, 50, 230, 1)', //#4132e6
            'rgba(50, 230, 65, 1)', //#32e641
            'rgba(230, 65, 50, 1)', //#e64132
            
            // 'rgba(75, 192, 192, 1)',
            // 'rgba(153, 102, 255, 1)',
            // 'rgba(255, 159, 64, 1)'
          ],
          // data: [12, 19, 3, 5, 2, 3],
          // backgroundColor: [
          //   'rgba(255, 99, 132, 0.2)',
          //   'rgba(54, 162, 235, 0.2)',
          //   'rgba(255, 206, 86, 0.2)',
          //   'rgba(75, 192, 192, 0.2)',
          //   'rgba(153, 102, 255, 0.2)',
          //   'rgba(255, 159, 64, 0.2)'
          // ],
          // borderColor: [
          //   'rgba(255, 99, 132, 1)',
          //   'rgba(54, 162, 235, 1)',
          //   'rgba(255, 206, 86, 1)',
          //   'rgba(75, 192, 192, 1)',
          //   'rgba(153, 102, 255, 1)',
          //   'rgba(255, 159, 64, 1)'
          // ],
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    });
  }

}

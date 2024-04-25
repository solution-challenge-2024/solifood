import { Component } from "@angular/core";
import { ChartModule } from "angular-highcharts";
import { Chart } from "angular-highcharts";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [ChartModule],
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent {
  totalOrders = 340;
  addedToCart = 76;
  totalBasktes = 30;
  revenue = 3403;

  lineChart = new Chart({
    chart: {
      type: "line",
    },
    title: {
      text: "Orders",
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },

    series: [
      {
        name: "Orders by Month",
        data: [10, 2, 3, 6, 9, 17, 20, 10, 5, 2, 16, 4],
      } as any,
    ],
  });
}

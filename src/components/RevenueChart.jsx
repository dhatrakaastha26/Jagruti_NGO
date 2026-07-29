import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function RevenueChart() {

  const data = {

    labels:["Mon","Tue","Wed","Thu","Fri","Sat"],

    datasets:[
      {
        label:"Revenue",

        data:[500,700,400,900,800,1200],

        backgroundColor:"#198754"
      }
    ]
  };

  return(

    <div className="card shadow border-0">

      <div className="card-body">

        <h5 className="mb-3">Weekly Revenue</h5>

        <Bar data={data} />

      </div>

    </div>

  )

}

export default RevenueChart;
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function SalesChart() {

  const data = {
    labels: ["Jan","Feb","Mar","Apr","May","Jun"],

    datasets: [
      {
        label: "Sales",

        data: [120, 190, 300, 250, 400, 550],

        borderColor: "#0d6efd",

        backgroundColor: "rgba(13,110,253,.2)",

        tension: .4,

        fill: true
      }
    ]
  };

  return (
    <div className="card shadow border-0">

      <div className="card-body">

        <h5 className="mb-3">Sales Overview</h5>

        <Line data={data} />

      </div>

    </div>
  );
}

export default SalesChart;
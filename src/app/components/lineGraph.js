"use client";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Tooltip,
    PointElement,
    LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register ChartJS components using ChartJS.register
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip
);

const LineGraph = ({height, width}) => {
    return (
        <div className="line-graph">
            <Line
                options={{ maintainAspectRatio: false }}
                width={width}
                height={height}
                data={{
                    labels: [
                        "2023-01",
                        "2023-02",
                        "2023-03",
                        "2023-04",
                        "2023-05",
                        "2023-06",
                        "2023-07",
                    ],
                    datasets: [
                        {
                            data: [100, 120, 115, 134, 168, 132, 200],
                            borderColor: "#4BC355",
                        },
                    ],
                }}
            />
        </div>
    );
};
export default LineGraph;
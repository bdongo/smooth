import './PieChart.css'
import React from "react";
import { Pie } from "react-chartjs-2";
import Chart from 'chart.js/auto';

const PieChart = ({ value = 0}) => {
    // calculate the percentage of the duration out of 12 hours
    const percentage = (value / 12) * 100;

    // set the fill color based on the percentage
    const data = {
        // labels: [`Average Time: ${value} hours`],
        datasets: [
            {
                data: [percentage, 100 - percentage],
                backgroundColor: [`#FF5F1F`, 'rgba(0, 0, 0, 0.1)'],
                borderWidth: 0,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
    };

    return (
        <div className="chart-container">
            <Pie data={data} options={options} />
        </div>
    );
};

export default PieChart;
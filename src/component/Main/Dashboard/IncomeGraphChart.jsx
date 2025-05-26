import React from 'react';
import { Area } from '@ant-design/plots';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

// Register Chart.js modules
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const IncomeGraphChart = () => {
  // Ant Design Area Chart config
  const config = {
    data: {
      type: 'fetch',
      value: 'https://assets.antv.antgroup.com/g2/stocks.json',
      transform: [{ type: 'filter', callback: (d) => d.symbol === 'GOOG' }],
    },
    xField: (d) => new Date(d.date),
    yField: 'price',
    style: {
      fill: 'linear-gradient(-90deg, #0077b5 100%, #0077b5 30% )',
    },
    axis: {
      y: { labelFormatter: '~s' },
    },
    line: {
      style: {
        stroke: '#0077b5',
        strokeWidth: 2,
      },
    },
  };

  // Chart.js Pie Chart data config
  const pieData = {
    labels: ['Total new User', 'Total orders'],
    datasets: [
      {
        label: 'Job Application Sources',
        data: [70, 30],
        backgroundColor: ['#0077b5', '#ea7689'],
        hoverBackgroundColor: ['#0077b5', '#ea7689'],
      },
    ],
  };

  // Optional: Pie chart options
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Application Sources Breakdown',
      },
    },
  };

  return (
    <div className='my-5'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        {/* Area Chart */}
        <div className='md:col-span-2'>
          <div className=' border-2 p-2 rounded-lg border-[#02aef4] bg-white'>
            <h2 className='text-2xl font-semibold mb-2'>Income Ratio</h2>
            <Area {...config} />
          </div>
        </div>

        {/* Pie Chart */}
        <div className='md:col-span-1'>
          <div className=' border-2 p-2 rounded-lg border-[#02aef4] bg-white'>
            <h2 className='text-2xl font-semibold mb-2'>User Activity</h2>
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeGraphChart;

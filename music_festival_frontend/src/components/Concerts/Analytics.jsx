import axios from "axios";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartToolTip,
    ArcElement,
    LineElement,
    PointElement
} from 'chart.js';
import { Bar, Pie } from "react-chartjs-2";
import React, { useState, useEffect } from "react";
import "./Analytics.css";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
);

ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
);

const Analytics = () => {
  const [tickets, setTickets] = useState();
  const [ticketsPrice, setTicketsPrice] = useState();
  const [chartOptions, setChartOptions] = useState({});
  const [user, setUser] = useState();
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const [groupBy, setGroupBy] = useState('location'); // Default group by location

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/tickets', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        const dataGroupedBy = response.data.reduce((accumulator, ticket) => {
          const key = groupBy === 'location' ? ticket.concert.location : ticket.concert.band.name;
          if (!accumulator[key]) {
            accumulator[key] = [];
          }
          accumulator[key].push(ticket.price || 0);
          return accumulator;
        }, {});

        const chartData = {
          labels: Object.keys(dataGroupedBy),
          datasets: [
            {
              label: 'Income',
              data: Object.values(dataGroupedBy).map(prices => prices.reduce((a, b) => a + b, 0)),
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.4)'
            },
          ]
        };

        setChartData(chartData);
      } catch (error) {
        console.error('Failed to fetch tickets:', error);
      }
    };
    fetchData();
  }, [groupBy]);

  const handleGroupByChange = (event) => {
    setGroupBy(event.target.value);
  };

  return (
    <div className="analytics">
      <div className="group-by-select">
        <label htmlFor="group-by">Group By:</label>
        <select id="group-by" value={groupBy} onChange={handleGroupByChange}>
          <option value="location">Location</option>
          <option value="band">Band Name</option>
          <option value="pie">Pie Chart</option>
        </select>
      </div>
      <div className="charts">
        {groupBy === 'location' || groupBy === 'band' ? (
          <div className="chart">
            <h3>Income by {groupBy === 'location' ? 'Location' : 'Band'}</h3>
            <Bar data={chartData} options={chartOptions} />
          </div>
        ) : (
          <div className="chart">
            <h3>Income Distribution by Band</h3>
            <div className="pie-chart">
                <Pie data={chartData} options={chartOptions} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
  
  
};

export default Analytics;

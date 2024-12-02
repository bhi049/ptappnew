import React, { useEffect, useState } from 'react';
import { getTrainings } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import _ from 'lodash';

function StatisticsPage() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    try {
      const data = await getTrainings();
      const trainings = data._embedded?.trainings || [];

      // Ryhmitellään harjoitukset tyypin (activity) mukaan ja lasketaan kestot yhteen
      const groupedData = _(trainings)
        .groupBy('activity')
        .map((items, activity) => ({
          activity,
          duration: _.sumBy(items, 'duration'),
        }))
        .value();

      setChartData(groupedData);
    } catch (error) {
      console.error('Error fetching trainings:', error);
      alert('Harjoitusten noutaminen epäonnistui tilastoja varten.');
    }
  };

  return (
    <div>
      <h2>Harjoitustilastot</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="activity" />
          <YAxis label={{ value: 'Kesto (min)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Bar dataKey="duration" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StatisticsPage;

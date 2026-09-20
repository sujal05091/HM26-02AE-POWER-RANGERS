import React from 'react';
import { NeuCard } from '../../components/NeumorphicUI';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const AnalyticsHotspots = () => {
  const categoryData = [
    { name: 'Pothole', count: 18 },
    { name: 'Garbage Overflow', count: 14 },
    { name: 'Drainage', count: 9 },
    { name: 'Streetlight', count: 7 },
    { name: 'Illegal Dump', count: 4 }
  ];

  const wardData = [
    { name: 'Ward 42', count: 15 },
    { name: 'Ward 38', count: 11 },
    { name: 'Ward 41', count: 8 }
  ];

  const COLORS = ['#2563eb', '#16a34a', '#d97706', '#7c3aed', '#dc2626'];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
      {/* Category Breakdown Bar Chart */}
      <NeuCard>
        <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1rem', color: '#1e293b' }}>Complaints by Category</h3>
        <div style={{ width: '100%', height: 260 }}>
          <ResponsiveContainer>
            <BarChart data={categoryData}>
              <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip />
              <Bar dataKey="count" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </NeuCard>

      {/* Ward Workload Distribution Pie Chart */}
      <NeuCard>
        <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1rem', color: '#1e293b' }}>Ward Workload Distribution</h3>
        <div style={{ width: '100%', height: 260 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={wardData} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {wardData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </NeuCard>
    </div>
  );
};

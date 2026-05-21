import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';

export default function DashboardCharts({ records }) {
  
  // --- 1. CALCULATE STATS CORRECTLY ---
  
  // Count Patients per Stage
  const stageCounts = { 'I': 0, 'II': 0, 'III': 0, 'IV': 0 };
  records.forEach(r => {
    // Ensure we handle case insensitivity (i vs I)
    if (r.stage) {
      const stageKey = r.stage.toUpperCase();
      if (stageCounts[stageKey] !== undefined) {
        stageCounts[stageKey]++;
      }
    }
  });
  
  const barData = [
    { name: 'Stage I', count: stageCounts['I'] },
    { name: 'Stage II', count: stageCounts['II'] },
    { name: 'Stage III', count: stageCounts['III'] },
    { name: 'Stage IV', count: stageCounts['IV'] },
  ];

  // Count Patients per Status
  const statusCounts = { 'Active': 0, 'Observation': 0, 'Discharged': 0 };
  
  records.forEach(r => {
    // FIX: Check if key exists, not just if value is truthy
    if (r.status && statusCounts.hasOwnProperty(r.status)) {
      statusCounts[r.status]++;
    }
  });

  const pieData = [
    { name: 'Active', value: statusCounts['Active'] },
    { name: 'Observ.', value: statusCounts['Observation'] },
    { name: 'Discharged', value: statusCounts['Discharged'] },
  ];

  // Colors for the charts
  const COLORS = ['#2563eb', '#06b6d4', '#8b5cf6', '#f43f5e'];

  // --- 2. RENDER CHARTS ---
  return (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '40px' }}>
      
      {/* CHART 1: Cancer Stages (Bar Chart) */}
      <div style={chartCardStyle}>
        <h3 style={chartTitleStyle}>📊 Patients by Stage</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData}>
            <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              cursor={{ fill: '#f1f5f9' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            <Bar dataKey="count" fill="#2563eb" radius={[6, 6, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* CHART 2: Treatment Status (Pie Chart) */}
      <div style={chartCardStyle}>
        <h3 style={chartTitleStyle}>🩺 Treatment Status</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

// Internal Styles
const chartCardStyle = {
  flex: '1',
  minWidth: '300px',
  background: 'rgba(255, 255, 255, 0.6)',
  borderRadius: '24px',
  padding: '20px',
  border: '1px solid #fff',
  boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
};

const chartTitleStyle = {
  marginBottom: '20px',
  color: '#0f172a',
  fontSize: '1rem',
  fontWeight: '700'
};
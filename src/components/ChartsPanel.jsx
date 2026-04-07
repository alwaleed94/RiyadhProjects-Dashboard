import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

const COLORS = ["#22c55e", "#0ea5e9", "#f59e0b", "#8b5cf6", "#ef4444"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{ background: 'white', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
        <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>{`التصنيف: ${data.name}`}</p>
        <p style={{ margin: '0 0 5px 0' }}>{`عدد المشاريع: ${data.value}`}</p>
        <p style={{ margin: '0', fontSize: '12px' }}>
          <strong>المشاريع:</strong><br />
          {data.projects.join(', ')}
        </p>
      </div>
    );
  }
  return null;
};

export default function ChartsPanel({ projects }) {
  const numericProjects = projects.filter((p) => typeof p.progress === "number");

  const categoryMap = {};
  projects.forEach((p) => {
    if (!categoryMap[p.category]) {
      categoryMap[p.category] = { count: 0, projects: [] };
    }
    categoryMap[p.category].count++;
    categoryMap[p.category].projects.push(p.name);
  });

  const categoryData = Object.entries(categoryMap).map(([name, data]) => ({
    name,
    value: data.count,
    projects: data.projects
  }));

  return (
    <section className="charts-grid">
      <div className="dashboard-panel">
        <h2>نسب الإنجاز</h2>
        <div style={{ width: "100%", height: 320 }}>
          <ResponsiveContainer>
            <BarChart data={numericProjects}>
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={80} 
                interval={0}
                fontSize={12}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="progress" fill="#22c55e" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="dashboard-panel">
        <h2>توزيع المشاريع حسب التصنيف</h2>
        <div style={{ width: "100%", height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: 340, height: 320, minWidth: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} dataKey="value" nameKey="name" outerRadius={100} label>
                    {categoryData.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  {/* لا يوجد Tooltip */}
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ marginLeft: 32, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {categoryData.map((entry, index) => (
                <div key={entry.name} style={{ display: 'flex', alignItems: 'center', fontSize: 15 }}>
                  <span style={{
                    display: 'inline-block',
                    width: 16,
                    height: 16,
                    borderRadius: 3,
                    background: COLORS[index % COLORS.length],
                    marginLeft: 8,
                    border: '1px solid #ddd'
                  }} />
                  <span style={{ fontWeight: 500 }}>{entry.name}</span>
                  <span style={{ marginRight: 6, color: '#666', fontSize: 13 }}>({entry.value})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
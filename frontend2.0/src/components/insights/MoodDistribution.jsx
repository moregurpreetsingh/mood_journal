import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import './insights.css';

const chartColors = [
  '#2563eb', // Primary blue
  '#16a34a', // Success green
  '#f59e0b', // Amber
  '#dc2626', // Danger red
  '#7c3aed', // Purple
];

export function MoodDistribution({ distData }) {
  return (
    <div className="insight-card" aria-label="Mood distribution">
      <header className="insight-card-header">
        <h3>Mood Distribution</h3>
      </header>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '0.875rem' }}
            />
            <Pie
              data={distData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              label={(v) => v.value > 0 ? `${v.name}` : ''}
            >
              {distData.map((_, i) => (
                <Cell key={i} fill={chartColors[i % chartColors.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
  
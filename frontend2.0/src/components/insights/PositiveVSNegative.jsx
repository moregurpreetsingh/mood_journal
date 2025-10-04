import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import './insights.css';

const chartColors = ['#16a34a', '#f59e0b', '#dc2626']; // green, amber, red

export function PositiveVsNegative({ posNegByDay }) {
  return (
    <div className="insight-card insight-card-wide" aria-label="Positive vs negative moods by day">
      <header className="insight-card-header">
        <h3>Positive vs Negative Moods</h3>
      </header>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={posNegByDay} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
            <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
            <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
            <YAxis allowDecimals={false} stroke="#6b7280" fontSize={12} />
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
            <Bar dataKey="positive" stackId="cat" fill={chartColors[0]} />
            <Bar dataKey="neutral" stackId="cat" fill={chartColors[1]} />
            <Bar dataKey="negative" stackId="cat" fill={chartColors[2]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
  
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import './insights.css';

const chartColor = '#2563eb'; // Using primary color from CSS variables

export function EmojiFrequency({ freqData }) {
  return (
    <div className="insight-card" aria-label="Emoji mood frequency">
      <header className="insight-card-header">
        <h3>Emoji Frequency</h3>
      </header>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={freqData} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
            <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
            <XAxis dataKey="mood" stroke="#6b7280" fontSize={12} />
            <YAxis allowDecimals={false} stroke="#6b7280" fontSize={12} />
            <Tooltip 
              formatter={(val, _n, payload) => [`${val}`, payload?.payload?.label]} 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Bar dataKey="count" fill={chartColor} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
  
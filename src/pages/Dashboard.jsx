import React from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Star
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Dashboard = () => {
  // Mock data for demonstration
  const marketMetrics = [
    { label: 'Total Value Locked', value: '$2.45B', change: '+12.3%', positive: true },
    { label: 'Active Protocols', value: '147', change: '+5', positive: true },
    { label: 'Daily Volume', value: '$856M', change: '-2.1%', positive: false },
    { label: 'Active Users', value: '89.2K', change: '+18.5%', positive: true },
  ];

  const tvlData = [
    { date: 'Jan', tvl: 1200 },
    { date: 'Feb', tvl: 1350 },
    { date: 'Mar', tvl: 1580 },
    { date: 'Apr', tvl: 1720 },
    { date: 'May', tvl: 1990 },
    { date: 'Jun', tvl: 2450 },
  ];

  const protocolDistribution = [
    { name: 'DEX', value: 35, color: '#F59E0B' },
    { name: 'Lending', value: 25, color: '#10B981' },
    { name: 'Yield Farming', value: 20, color: '#3B82F6' },
    { name: 'Derivatives', value: 12, color: '#8B5CF6' },
    { name: 'Others', value: 8, color: '#EF4444' },
  ];

  const topProtocols = [
    { name: 'PancakeSwap', tvl: '$1.2B', change: '+8.2%', rating: 4.8 },
    { name: 'Venus', tvl: '$892M', change: '+5.1%', rating: 4.6 },
    { name: 'Alpaca Finance', tvl: '$456M', change: '-1.2%', rating: 4.4 },
    { name: 'Biswap', tvl: '$321M', change: '+12.8%', rating: 4.2 },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-gradient mb-4">
          Welcome to DeFiPulse BSC
        </h1>
        <p className="text-xl text-text-light/70 max-w-2xl mx-auto">
          Your compass for actionable DeFi insights and community intelligence on Binance Smart Chain
        </p>
      </div>

      {/* Market Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {marketMetrics.map((metric, index) => (
          <div key={index} className="card p-6 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div className={`flex items-center text-sm ${metric.positive ? 'text-success' : 'text-error'}`}>
                {metric.positive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                {metric.change}
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-text-light mb-1">{metric.value}</p>
              <p className="text-sm text-text-light/70">{metric.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* TVL Chart */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-text-light mb-6">Total Value Locked Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={tvlData}>
              <defs>
                <linearGradient id="tvlGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(43, 96%, 50%)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(43, 96%, 50%)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 10%, 15%)" />
              <XAxis dataKey="date" stroke="hsl(220, 15%, 85%)" />
              <YAxis stroke="hsl(220, 15%, 85%)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(240, 10%, 8%)', 
                  border: '1px solid hsl(240, 10%, 15%)',
                  borderRadius: '8px',
                  color: 'hsl(220, 15%, 85%)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="tvl" 
                stroke="hsl(43, 96%, 50%)" 
                fillOpacity={1} 
                fill="url(#tvlGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Protocol Distribution */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-text-light mb-6">Protocol Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={protocolDistribution}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {protocolDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(240, 10%, 8%)', 
                  border: '1px solid hsl(240, 10%, 15%)',
                  borderRadius: '8px',
                  color: 'hsl(220, 15%, 85%)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Protocols */}
      <div className="card p-6">
        <h3 className="text-xl font-semibold text-text-light mb-6">Top Protocols by TVL</h3>
        <div className="space-y-4">
          {topProtocols.map((protocol, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-all">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-text-light">{protocol.name}</h4>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-text-light/70">{protocol.rating}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-text-light">{protocol.tvl}</p>
                <p className={`text-sm ${protocol.change.startsWith('+') ? 'text-success' : 'text-error'}`}>
                  {protocol.change}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
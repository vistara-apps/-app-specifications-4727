import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  Shield, 
  TrendingUp, 
  ExternalLink,
  ChevronDown,
  AlertTriangle
} from 'lucide-react';

const ProtocolDiscovery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRisk, setSelectedRisk] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'dex', name: 'DEX' },
    { id: 'lending', name: 'Lending' },
    { id: 'yield', name: 'Yield Farming' },
    { id: 'derivatives', name: 'Derivatives' },
    { id: 'insurance', name: 'Insurance' },
  ];

  const riskLevels = [
    { id: 'all', name: 'All Risk Levels' },
    { id: 'low', name: 'Low Risk', color: 'text-success' },
    { id: 'medium', name: 'Medium Risk', color: 'text-warning' },
    { id: 'high', name: 'High Risk', color: 'text-error' },
  ];

  const protocols = [
    {
      id: 1,
      name: 'PancakeSwap',
      category: 'dex',
      description: 'The leading decentralized exchange on BSC with automated market making',
      tvl: '$1.2B',
      apy: '15.2%',
      risk: 'low',
      rating: 4.8,
      audited: true,
      launched: '2020-09-20',
      website: 'https://pancakeswap.finance',
      tokens: ['CAKE', 'BNB'],
      features: ['AMM', 'Farming', 'Lottery', 'NFTs']
    },
    {
      id: 2,
      name: 'Venus Protocol',
      category: 'lending',
      description: 'Algorithmic money market and synthetic stablecoin protocol',
      tvl: '$892M',
      apy: '8.7%',
      risk: 'medium',
      rating: 4.6,
      audited: true,
      launched: '2020-10-01',
      website: 'https://venus.io',
      tokens: ['XVS', 'VAI'],
      features: ['Lending', 'Borrowing', 'Stablecoin']
    },
    {
      id: 3,
      name: 'Alpaca Finance',
      category: 'yield',
      description: 'Leveraged yield farming protocol with lending services',
      tvl: '$456M',
      apy: '22.1%',
      risk: 'high',
      rating: 4.4,
      audited: true,
      launched: '2021-02-14',
      website: 'https://alpacafinance.org',
      tokens: ['ALPACA'],
      features: ['Leveraged Farming', 'Lending', 'Automated Vaults']
    },
    {
      id: 4,
      name: 'Biswap',
      category: 'dex',
      description: 'Multi-type referral system and the lowest transaction fees',
      tvl: '$321M',
      apy: '18.9%',
      risk: 'medium',
      rating: 4.2,
      audited: true,
      launched: '2021-04-01',
      website: 'https://biswap.org',
      tokens: ['BSW'],
      features: ['DEX', 'Farming', 'Launchpad', 'Referrals']
    },
    {
      id: 5,
      name: 'Belt Finance',
      category: 'yield',
      description: 'Automated portfolio manager and yield optimizer',
      tvl: '$189M',
      apy: '12.4%',
      risk: 'low',
      rating: 4.0,
      audited: true,
      launched: '2021-03-15',
      website: 'https://belt.fi',
      tokens: ['BELT'],
      features: ['Yield Optimization', 'Auto-compounding', 'Multi-strategy']
    },
    {
      id: 6,
      name: 'Ellipsis Finance',
      category: 'dex',
      description: 'Curve Wars on BSC with stable coin trading',
      tvl: '$98M',
      apy: '28.3%',
      risk: 'high',
      rating: 3.8,
      audited: false,
      launched: '2021-03-01',
      website: 'https://ellipsis.finance',
      tokens: ['EPS'],
      features: ['Stableswap', 'Cross-chain', 'Voting']
    }
  ];

  const filteredProtocols = protocols.filter(protocol => {
    const matchesSearch = protocol.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         protocol.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || protocol.category === selectedCategory;
    const matchesRisk = selectedRisk === 'all' || protocol.risk === selectedRisk;
    
    return matchesSearch && matchesCategory && matchesRisk;
  });

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low': return 'text-success';
      case 'medium': return 'text-warning';
      case 'high': return 'text-error';
      default: return 'text-text-light';
    }
  };

  const getRiskBg = (risk) => {
    switch (risk) {
      case 'low': return 'bg-success/10 border-success/20';
      case 'medium': return 'bg-warning/10 border-warning/20';
      case 'high': return 'bg-error/10 border-error/20';
      default: return 'bg-gray-800/30 border-gray-700';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold text-gradient mb-2">Protocol Discovery & Vetting</h1>
        <p className="text-text-light/70 max-w-2xl mx-auto">
          Discover and analyze DeFi protocols on BSC with comprehensive due diligence and risk assessment
        </p>
      </div>

      {/* Filters */}
      <div className="card p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-light/50" />
            <input
              type="text"
              placeholder="Search protocols..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-text-light placeholder-text-light/50 focus:outline-none focus:border-primary"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full appearance-none px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-text-light focus:outline-none focus:border-primary cursor-pointer"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-light/50 pointer-events-none" />
          </div>

          {/* Risk Filter */}
          <div className="relative">
            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              className="w-full appearance-none px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-text-light focus:outline-none focus:border-primary cursor-pointer"
            >
              {riskLevels.map(risk => (
                <option key={risk.id} value={risk.id}>{risk.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-light/50 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Protocol Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProtocols.map((protocol, index) => (
          <div key={protocol.id} className="card p-6 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-text-light mb-1">{protocol.name}</h3>
                <div className="flex items-center space-x-3">
                  <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-md uppercase">
                    {protocol.category}
                  </span>
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-md border text-xs font-medium ${getRiskBg(protocol.risk)}`}>
                    <span className={getRiskColor(protocol.risk)}>
                      {protocol.risk.charAt(0).toUpperCase() + protocol.risk.slice(1)} Risk
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {protocol.audited ? (
                  <Shield className="h-5 w-5 text-success" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-warning" />
                )}
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-text-light">{protocol.rating}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-text-light/70 mb-4">{protocol.description}</p>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-text-light/50 mb-1">Total Value Locked</p>
                <p className="text-lg font-semibold text-text-light">{protocol.tvl}</p>
              </div>
              <div>
                <p className="text-sm text-text-light/50 mb-1">Est. APY</p>
                <p className="text-lg font-semibold text-success">{protocol.apy}</p>
              </div>
            </div>

            {/* Features */}
            <div className="mb-4">
              <p className="text-sm text-text-light/50 mb-2">Features</p>
              <div className="flex flex-wrap gap-2">
                {protocol.features.map((feature, idx) => (
                  <span key={idx} className="px-2 py-1 text-xs bg-gray-800/50 text-text-light rounded-md">
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Tokens */}
            <div className="mb-4">
              <p className="text-sm text-text-light/50 mb-2">Tokens</p>
              <div className="flex space-x-2">
                {protocol.tokens.map((token, idx) => (
                  <span key={idx} className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md font-medium">
                    {token}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-700">
              <div className="text-sm text-text-light/50">
                Launched: {new Date(protocol.launched).toLocaleDateString()}
              </div>
              <div className="flex space-x-2">
                <button className="flex items-center space-x-1 px-3 py-2 text-sm bg-gray-800 hover:bg-gray-700 text-text-light rounded-lg transition-colors">
                  <ExternalLink className="h-4 w-4" />
                  <span>Visit</span>
                </button>
                <button className="btn-primary">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  Analyze
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProtocols.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-text-light/30 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-light mb-2">No protocols found</h3>
          <p className="text-text-light/70">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  );
};

export default ProtocolDiscovery;
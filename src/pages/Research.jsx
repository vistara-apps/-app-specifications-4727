import React, { useState } from 'react';
import { 
  FileText, 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  Clock, 
  User, 
  Lock,
  Plus,
  Search,
  Filter,
  ChevronDown
} from 'lucide-react';
import { useAccount } from 'wagmi';
import { usePaymentContext } from '../hooks/usePaymentContext';

const Research = () => {
  const { address } = useAccount();
  const { createSession } = usePaymentContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [paidAccess, setPaidAccess] = useState(false);

  const categories = [
    { id: 'all', name: 'All Research' },
    { id: 'protocol-analysis', name: 'Protocol Analysis' },
    { id: 'risk-assessment', name: 'Risk Assessment' },
    { id: 'market-trends', name: 'Market Trends' },
    { id: 'strategy-guides', name: 'Strategy Guides' },
    { id: 'educational', name: 'Educational' },
  ];

  const articles = [
    {
      id: 1,
      title: 'Deep Dive: PancakeSwap V3 Concentrated Liquidity Analysis',
      author: 'DeFi Researcher',
      category: 'protocol-analysis',
      publishDate: '2024-01-15',
      readTime: '12 min',
      upvotes: 89,
      downvotes: 3,
      isPremium: false,
      excerpt: 'Comprehensive analysis of PancakeSwap V3 concentrated liquidity features, capital efficiency improvements, and yield optimization strategies for liquidity providers.',
      tags: ['PancakeSwap', 'V3', 'Liquidity', 'AMM'],
      difficulty: 'Advanced'
    },
    {
      id: 2,
      title: 'Risk Assessment: Venus Protocol Liquidation Mechanisms',
      author: 'Risk Analyst Pro',
      category: 'risk-assessment',
      publishDate: '2024-01-12',
      readTime: '8 min',
      upvotes: 156,
      downvotes: 8,
      isPremium: true,
      excerpt: 'In-depth analysis of Venus Protocol liquidation engine, collateral requirements, and risk mitigation strategies for borrowers and lenders.',
      tags: ['Venus', 'Liquidation', 'Risk', 'Lending'],
      difficulty: 'Intermediate'
    },
    {
      id: 3,
      title: 'BSC DeFi Market Trends Q1 2024: What to Expect',
      author: 'Market Analyst',
      category: 'market-trends',
      publishDate: '2024-01-10',
      readTime: '15 min',
      upvotes: 234,
      downvotes: 12,
      isPremium: true,
      excerpt: 'Quarterly analysis of BSC DeFi ecosystem growth, emerging protocols, TVL trends, and predictions for the upcoming quarter.',
      tags: ['BSC', 'Market Analysis', 'Trends', 'Q1 2024'],
      difficulty: 'Beginner'
    },
    {
      id: 4,
      title: 'Yield Farming Strategy: Maximizing Returns with Belt Finance',
      author: 'Yield Strategist',
      category: 'strategy-guides',
      publishDate: '2024-01-08',
      readTime: '10 min',
      upvotes: 78,
      downvotes: 5,
      isPremium: false,
      excerpt: 'Step-by-step guide to optimizing yield farming strategies using Belt Finance auto-compounding vaults and multi-strategy approaches.',
      tags: ['Belt Finance', 'Yield Farming', 'Strategy', 'Auto-compound'],
      difficulty: 'Intermediate'
    },
    {
      id: 5,
      title: 'Understanding Impermanent Loss in BSC AMMs',
      author: 'DeFi Educator',
      category: 'educational',
      publishDate: '2024-01-05',
      readTime: '6 min',
      upvotes: 312,
      downvotes: 7,
      isPremium: false,
      excerpt: 'Educational guide explaining impermanent loss, how it affects liquidity providers, and strategies to minimize its impact in BSC AMMs.',
      tags: ['Impermanent Loss', 'AMM', 'Education', 'Liquidity'],
      difficulty: 'Beginner'
    },
    {
      id: 6,
      title: 'Advanced Leveraged Farming with Alpaca Finance',
      author: 'Leverage Expert',
      category: 'strategy-guides',
      publishDate: '2024-01-03',
      readTime: '18 min',
      upvotes: 167,
      downvotes: 15,
      isPremium: true,
      excerpt: 'Comprehensive guide to leveraged yield farming strategies, risk management, and advanced techniques using Alpaca Finance platform.',
      tags: ['Alpaca Finance', 'Leveraged Farming', 'Advanced', 'Risk Management'],
      difficulty: 'Advanced'
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handlePremiumAccess = async () => {
    if (!address) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      await createSession();
      setPaidAccess(true);
      alert('Premium access unlocked! You can now view all premium research.');
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-success';
      case 'Intermediate': return 'text-warning';
      case 'Advanced': return 'text-error';
      default: return 'text-text-light';
    }
  };

  const getDifficultyBg = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-success/10 border-success/20';
      case 'Intermediate': return 'bg-warning/10 border-warning/20';
      case 'Advanced': return 'bg-error/10 border-error/20';
      default: return 'bg-gray-800/30 border-gray-700';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Curated Research Repository</h1>
          <p className="text-text-light/70">
            High-quality, community-driven research and educational resources for BSC DeFi
          </p>
        </div>
        <button className="btn-primary mt-4 md:mt-0">
          <Plus className="h-4 w-4 mr-2" />
          Submit Research
        </button>
      </div>

      {/* Filters */}
      <div className="card p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-light/50" />
            <input
              type="text"
              placeholder="Search research articles..."
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
        </div>
      </div>

      {/* Premium Access Notice */}
      {!paidAccess && (
        <div className="card p-6 border border-primary/30">
          <div className="flex items-start space-x-4">
            <Lock className="h-6 w-6 text-primary mt-1" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-text-light mb-2">Unlock Premium Research</h3>
              <p className="text-text-light/70 mb-4">
                Get access to exclusive in-depth research, advanced analysis, and expert insights with premium membership.
              </p>
              <button
                onClick={handlePremiumAccess}
                className="btn-primary"
                disabled={!address}
              >
                {!address ? 'Connect Wallet First' : 'Unlock Premium Access ($0.001)'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Articles Grid */}
      <div className="space-y-6">
        {filteredArticles.map((article, index) => (
          <div key={article.id} className="card p-6 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
            <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6">
              {/* Content */}
              <div className="flex-1">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {article.isPremium && !paidAccess && (
                      <Lock className="h-5 w-5 text-primary" />
                    )}
                    <h3 className="text-xl font-semibold text-text-light">{article.title}</h3>
                  </div>
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-md border text-xs font-medium ${getDifficultyBg(article.difficulty)}`}>
                    <span className={getDifficultyColor(article.difficulty)}>
                      {article.difficulty}
                    </span>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center space-x-4 text-sm text-text-light/50 mb-3">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{article.readTime} read</span>
                  </div>
                  <span>{new Date(article.publishDate).toLocaleDateString()}</span>
                </div>

                {/* Excerpt */}
                <p className="text-text-light/70 mb-4">
                  {article.isPremium && !paidAccess ? 
                    `${article.excerpt.substring(0, 100)}... [Premium content - unlock to read more]` :
                    article.excerpt
                  }
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 text-xs bg-gray-800/50 text-text-light rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors">
                        <ThumbsUp className="h-4 w-4" />
                        <span className="text-sm">{article.upvotes}</span>
                      </button>
                      <button className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors">
                        <ThumbsDown className="h-4 w-4" />
                        <span className="text-sm">{article.downvotes}</span>
                      </button>
                    </div>
                  </div>
                  
                  <button 
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      article.isPremium && !paidAccess ? 
                      'bg-gray-700 text-text-light/50 cursor-not-allowed' :
                      'btn-primary'
                    }`}
                    disabled={article.isPremium && !paidAccess}
                  >
                    {article.isPremium && !paidAccess ? (
                      <>
                        <Lock className="h-4 w-4 mr-2" />
                        Premium Only
                      </>
                    ) : (
                      'Read Article'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-text-light/30 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-light mb-2">No articles found</h3>
          <p className="text-text-light/70">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  );
};

export default Research;
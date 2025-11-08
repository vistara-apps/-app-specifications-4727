import React, { useState } from 'react';
import { 
  MessageCircle, 
  Calendar, 
  Clock, 
  Users, 
  Star,
  Send,
  ThumbsUp,
  User,
  Radio,
  Play,
  Lock,
  Plus
} from 'lucide-react';
import { useAccount } from 'wagmi';
import { usePaymentContext } from '../hooks/usePaymentContext';

const ExpertQA = () => {
  const { address } = useAccount();
  const { createSession } = usePaymentContext();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [questionText, setQuestionText] = useState('');
  const [paidAccess, setPaidAccess] = useState(false);

  const sessions = {
    upcoming: [
      {
        id: 1,
        title: 'BSC DeFi Security Best Practices',
        expert: 'Alex Chen',
        expertTitle: 'Security Researcher at PeckShield',
        date: '2024-01-20',
        time: '15:00 UTC',
        duration: '60 min',
        participants: 234,
        isAMA: true,
        topic: 'Security',
        description: 'Deep dive into BSC DeFi security, common vulnerabilities, and how to protect your funds.',
        questions: 45,
        status: 'upcoming'
      },
      {
        id: 2,
        title: 'Yield Farming Strategies for 2024',
        expert: 'Sarah Johnson',
        expertTitle: 'DeFi Strategist at Yearn Finance',
        date: '2024-01-22',
        time: '18:00 UTC',
        duration: '45 min',
        participants: 189,
        isAMA: false,
        topic: 'Yield Farming',
        description: 'Explore advanced yield farming strategies and risk management techniques.',
        questions: 28,
        status: 'upcoming'
      }
    ],
    live: [
      {
        id: 3,
        title: 'PancakeSwap V3 Trading Strategies',
        expert: 'Mike Rodriguez',
        expertTitle: 'Head of Research at DeFiPulse',
        date: '2024-01-18',
        time: '16:00 UTC',
        duration: '60 min',
        participants: 312,
        isAMA: true,
        topic: 'Trading',
        description: 'Live Q&A about PancakeSwap V3 concentrated liquidity and trading strategies.',
        questions: 67,
        status: 'live'
      }
    ],
    past: [
      {
        id: 4,
        title: 'Venus Protocol Risk Management',
        expert: 'Dr. Emily Watson',
        expertTitle: 'Risk Analyst at Compound Labs',
        date: '2024-01-15',
        time: '14:00 UTC',
        duration: '50 min',
        participants: 198,
        isAMA: false,
        topic: 'Risk Management',
        description: 'Understanding liquidation risks and collateral management in Venus Protocol.',
        questions: 34,
        status: 'past',
        recording: 'https://example.com/recording'
      },
      {
        id: 5,
        title: 'Cross-Chain DeFi on BSC',
        expert: 'James Kim',
        expertTitle: 'Bridge Protocol Developer',
        date: '2024-01-12',
        time: '17:00 UTC',
        duration: '40 min',
        participants: 156,
        isAMA: true,
        topic: 'Cross-Chain',
        description: 'Exploring cross-chain opportunities and risks in the BSC ecosystem.',
        questions: 52,
        status: 'past',
        recording: 'https://example.com/recording2'
      }
    ]
  };

  const sampleQuestions = [
    {
      id: 1,
      text: 'What are the main security considerations when using new DeFi protocols on BSC?',
      author: 'CryptoTrader123',
      upvotes: 23,
      timestamp: '2 hours ago',
      answered: true,
      answer: 'Always check for audits, start with small amounts, verify contract addresses, and understand the protocol mechanics before investing.'
    },
    {
      id: 2,
      text: 'How do you calculate impermanent loss for concentrated liquidity positions?',
      author: 'DeFiNewbie',
      upvotes: 18,
      timestamp: '1 hour ago',
      answered: false
    },
    {
      id: 3,
      text: 'What are the best practices for managing liquidation risk in Venus?',
      author: 'RiskManager',
      upvotes: 31,
      timestamp: '45 minutes ago',
      answered: true,
      answer: 'Maintain healthy collateral ratios (recommended 200%+), monitor positions regularly, and have a liquidation contingency plan.'
    }
  ];

  const handlePremiumAccess = async () => {
    if (!address) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      await createSession();
      setPaidAccess(true);
      alert('Premium access unlocked! You can now submit questions and access exclusive content.');
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    }
  };

  const handleSubmitQuestion = () => {
    if (!paidAccess) {
      handlePremiumAccess();
      return;
    }
    
    if (!questionText.trim()) return;
    
    // Here you would submit the question to your backend
    alert('Question submitted successfully!');
    setQuestionText('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'live': return 'text-error';
      case 'upcoming': return 'text-primary';
      case 'past': return 'text-text-light/50';
      default: return 'text-text-light';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'live': return 'bg-error/10 border-error/20';
      case 'upcoming': return 'bg-primary/10 border-primary/20';
      case 'past': return 'bg-gray-800/30 border-gray-700';
      default: return 'bg-gray-800/30 border-gray-700';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold text-gradient mb-2">Expert Q&A Sessions</h1>
        <p className="text-text-light/70 max-w-2xl mx-auto">
          Get direct insights from DeFi experts, protocol founders, and industry leaders
        </p>
      </div>

      {/* Tabs */}
      <div className="card p-1">
        <div className="flex space-x-1">
          {[
            { id: 'upcoming', label: 'Upcoming' },
            { id: 'live', label: 'Live' },
            { id: 'past', label: 'Past Sessions' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-text-dark'
                  : 'text-text-light hover:bg-gray-800/50'
              }`}
            >
              {tab.label}
              {tab.id === 'live' && sessions.live.length > 0 && (
                <span className="ml-2 inline-flex items-center justify-center w-2 h-2 bg-error rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Premium Access Notice */}
      {!paidAccess && (
        <div className="card p-6 border border-primary/30">
          <div className="flex items-start space-x-4">
            <Lock className="h-6 w-6 text-primary mt-1" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-text-light mb-2">Premium Q&A Access</h3>
              <p className="text-text-light/70 mb-4">
                Submit questions directly to experts, get early access to sessions, and view exclusive content.
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

      {/* Session Content */}
      <div className="space-y-6">
        {sessions[activeTab].map((session, index) => (
          <div key={session.id} className="card p-6 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
            <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6">
              {/* Session Info */}
              <div className="flex-1">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-text-light">{session.title}</h3>
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-md border text-xs font-medium ${getStatusBg(session.status)}`}>
                        {session.status === 'live' && <Radio className="h-3 w-3" />}
                        <span className={getStatusColor(session.status)}>
                          {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                        </span>
                      </div>
                      {session.isAMA && (
                        <span className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-md font-medium">
                          AMA
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-text-light/70">
                      <User className="h-4 w-4" />
                      <span className="font-medium">{session.expert}</span>
                      <span>•</span>
                      <span className="text-sm">{session.expertTitle}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-text-light">Expert</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-text-light/70 mb-4">{session.description}</p>

                {/* Meta Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-text-light/50">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(session.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-text-light/50">
                    <Clock className="h-4 w-4" />
                    <span>{session.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-text-light/50">
                    <Users className="h-4 w-4" />
                    <span>{session.participants} attendees</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-text-light/50">
                    <MessageCircle className="h-4 w-4" />
                    <span>{session.questions} questions</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-3">
                  {session.status === 'upcoming' && (
                    <button className="btn-primary">
                      <Calendar className="h-4 w-4 mr-2" />
                      Join Session
                    </button>
                  )}
                  {session.status === 'live' && (
                    <button className="bg-error hover:bg-error/80 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                      <Radio className="h-4 w-4 mr-2" />
                      Join Live
                    </button>
                  )}
                  {session.status === 'past' && (
                    <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-text-light rounded-lg transition-colors">
                      <Play className="h-4 w-4" />
                      <span>Watch Recording</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Question Submission */}
      {activeTab === 'upcoming' && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-text-light mb-4">Submit Your Question</h3>
          <div className="space-y-4">
            <textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="What would you like to ask our experts?"
              className="w-full h-24 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-text-light placeholder-text-light/50 focus:outline-none focus:border-primary resize-none"
              disabled={!paidAccess}
            />
            <div className="flex items-center justify-between">
              <p className="text-sm text-text-light/50">
                {paidAccess ? 'Questions are moderated before the session' : 'Premium access required to submit questions'}
              </p>
              <button
                onClick={handleSubmitQuestion}
                disabled={!questionText.trim() && paidAccess}
                className="btn-primary"
              >
                {!paidAccess ? (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    Unlock to Submit
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Question
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sample Questions for Live/Past Sessions */}
      {(activeTab === 'live' || activeTab === 'past') && sampleQuestions.length > 0 && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-text-light mb-4">
            {activeTab === 'live' ? 'Live Questions' : 'Popular Questions'}
          </h3>
          <div className="space-y-4">
            {sampleQuestions.map((question, index) => (
              <div key={question.id} className="p-4 bg-gray-800/30 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-text-light font-medium">{question.text}</p>
                  <div className="flex items-center space-x-2 ml-4">
                    <button className="flex items-center space-x-1 px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 transition-colors">
                      <ThumbsUp className="h-3 w-3" />
                      <span className="text-xs">{question.upvotes}</span>
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-text-light/50 mb-2">
                  <span>By {question.author}</span>
                  <span>•</span>
                  <span>{question.timestamp}</span>
                  {question.answered && (
                    <>
                      <span>•</span>
                      <span className="text-success">Answered</span>
                    </>
                  )}
                </div>
                {question.answered && (
                  <div className="mt-2 p-3 bg-gray-700/50 rounded text-text-light/80">
                    {question.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpertQA;
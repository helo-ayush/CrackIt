import React, { useState, useEffect } from 'react';
import { 
  Home,
  Search,
  Calendar,
  Users,
  Trophy,
  Settings,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  Zap,
  TrendingUp,
  Clock,
  Code,
  Award,
  ChevronRight,
  Plus,
  Filter,
  MoreVertical,
  Eye,
  MessageSquare,
  Share2,
  Star,
  CheckCircle
} from 'lucide-react';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState(3);

  // Navigation items
  const navItems = [
    { id: 'overview', icon: <Home className="w-5 h-5" />, label: 'Overview', route: '/dashboard' },
    { id: 'hackathons', icon: <Search className="w-5 h-5" />, label: 'Discover', route: '/dashboard/discover' },
    { id: 'my-events', icon: <Calendar className="w-5 h-5" />, label: 'My Events', route: '/dashboard/my-events' },
    { id: 'teams', icon: <Users className="w-5 h-5" />, label: 'Teams', route: '/dashboard/teams' },
    { id: 'submissions', icon: <Code className="w-5 h-5" />, label: 'Submissions', route: '/dashboard/submissions' },
    { id: 'leaderboard', icon: <Trophy className="w-5 h-5" />, label: 'Leaderboard', route: '/dashboard/leaderboard' },
  ];

  const bottomNavItems = [
    { id: 'settings', icon: <Settings className="w-5 h-5" />, label: 'Settings', route: '/dashboard/settings' },
  ];

  // Mock data
  const stats = [
    { label: 'Active Hackathons', value: '3', change: '+2 this week', icon: <Zap className="w-6 h-6" />, gradient: 'from-purple-500 to-pink-600' },
    { label: 'Team Members', value: '12', change: '+3 new', icon: <Users className="w-6 h-6" />, gradient: 'from-blue-500 to-purple-600' },
    { label: 'Submissions', value: '8', change: '2 pending', icon: <Code className="w-6 h-6" />, gradient: 'from-green-500 to-blue-600' },
    { label: 'Awards Won', value: '5', change: 'Top 10%', icon: <Award className="w-6 h-6" />, gradient: 'from-yellow-500 to-orange-600' },
  ];

  const upcomingHackathons = [
    {
      id: 1,
      title: 'AI Innovation Challenge 2025',
      date: 'Oct 15-17, 2025',
      participants: 234,
      prize: '$50,000',
      status: 'Registered',
      image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      tags: ['AI', 'Machine Learning']
    },
    {
      id: 2,
      title: 'Web3 Builder Sprint',
      date: 'Oct 20-22, 2025',
      participants: 189,
      prize: '$30,000',
      status: 'Open',
      image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      tags: ['Blockchain', 'Web3']
    },
    {
      id: 3,
      title: 'Climate Tech Hackathon',
      date: 'Nov 1-3, 2025',
      participants: 312,
      prize: '$75,000',
      status: 'Open',
      image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      tags: ['Climate', 'Sustainability']
    },
  ];

  const recentActivity = [
    { id: 1, type: 'submission', text: 'Submitted project to AI Challenge', time: '2 hours ago', icon: <CheckCircle className="w-5 h-5" />, color: 'text-green-400' },
    { id: 2, type: 'team', text: 'John Doe joined your team', time: '5 hours ago', icon: <Users className="w-5 h-5" />, color: 'text-blue-400' },
    { id: 3, type: 'message', text: 'New message from organizer', time: '1 day ago', icon: <MessageSquare className="w-5 h-5" />, color: 'text-purple-400' },
    { id: 4, type: 'award', text: 'Won 2nd place in Web Dev Sprint', time: '2 days ago', icon: <Trophy className="w-5 h-5" />, color: 'text-yellow-400' },
  ];

  const teamMembers = [
    { id: 1, name: 'Sarah Chen', role: 'Frontend Dev', avatar: 'SC', status: 'online' },
    { id: 2, name: 'Mike Johnson', role: 'Backend Dev', avatar: 'MJ', status: 'online' },
    { id: 3, name: 'Alex Kumar', role: 'UI/UX Designer', avatar: 'AK', status: 'away' },
    { id: 4, name: 'Emma Wilson', role: 'Data Scientist', avatar: 'EW', status: 'offline' },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-black/20 backdrop-blur-2xl border-r border-white/10 transition-all duration-300 z-40 ${isSidebarOpen ? 'w-64' : 'w-20'} hidden md:block`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            {isSidebarOpen && (
              <div className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  CrackIt
                </span>
                <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full inline-block ml-1 animate-pulse"></div>
              </div>
            )}
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center ${isSidebarOpen ? 'px-4' : 'justify-center'} py-3 rounded-xl transition-all duration-300 group ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className={`${activeTab === item.id ? 'scale-110' : ''} transition-transform duration-300`}>
                  {item.icon}
                </span>
                {isSidebarOpen && (
                  <span className="ml-3 font-medium">{item.label}</span>
                )}
              </button>
            ))}
          </nav>

          {/* Bottom Navigation */}
          <div className="p-4 border-t border-white/10 space-y-2">
            {bottomNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center ${isSidebarOpen ? 'px-4' : 'justify-center'} py-3 rounded-xl transition-all duration-300 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.icon}
                {isSidebarOpen && (
                  <span className="ml-3 font-medium">{item.label}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsMobileMenuOpen(false)}></div>
        <div className={`absolute left-0 top-0 h-full w-80 bg-gradient-to-b from-slate-900 to-purple-900 border-r border-white/10 transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  CrackIt
                </span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-lg bg-white/10">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 p-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                  className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span className="ml-3 font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-black/20 backdrop-blur-2xl border-b border-white/10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                <p className="text-sm text-gray-400">Welcome back, Alex!</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="hidden lg:flex items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-2 w-64">
                <Search className="w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search hackathons..." 
                  className="ml-2 bg-transparent outline-none text-white placeholder-gray-400 w-full"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
                <Bell className="w-6 h-6" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-pink-500 to-red-500 rounded-full text-xs flex items-center justify-center font-bold">
                    {notifications}
                  </span>
                )}
              </button>

              {/* User Menu */}
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-3 py-2 cursor-pointer hover:bg-white/20 transition-colors">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold">
                  A
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">Alex Kumar</p>
                  <p className="text-xs text-gray-400">alex@email.com</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 bg-gradient-to-br ${stat.gradient} rounded-2xl`}>
                    {stat.icon}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-4xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-gray-300">{stat.change}</p>
                </div>
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-300`}></div>
              </div>
            ))}
          </div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Upcoming Hackathons */}
            <div className="lg:col-span-2 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Upcoming Hackathons</h2>
                <button className="flex items-center text-purple-400 hover:text-purple-300 transition-colors">
                  <span className="text-sm font-medium">View All</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
              <div className="space-y-4">
                {upcomingHackathons.map((hackathon) => (
                  <div key={hackathon.id} className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div 
                        className="w-16 h-16 rounded-2xl flex-shrink-0"
                        style={{ background: hackathon.image }}
                      ></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                            {hackathon.title}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            hackathon.status === 'Registered' 
                              ? 'bg-green-500/20 text-green-300'
                              : 'bg-blue-500/20 text-blue-300'
                          }`}>
                            {hackathon.status}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {hackathon.date}
                          </span>
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {hackathon.participants}
                          </span>
                          <span className="flex items-center">
                            <Trophy className="w-4 h-4 mr-1" />
                            {hackathon.prize}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {hackathon.tags.map((tag, idx) => (
                            <span key={idx} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity & Team */}
            <div className="space-y-6">
              {/* Recent Activity */}
              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className={`p-2 rounded-xl bg-white/10 ${activity.color}`}>
                        {activity.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white font-medium">{activity.text}</p>
                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Team Members */}
              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Team Members</h2>
                  <button className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg transition-all">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold text-sm">
                          {member.avatar}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-900 ${
                          member.status === 'online' ? 'bg-green-400' :
                          member.status === 'away' ? 'bg-yellow-400' : 'bg-gray-400'
                        }`}></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white">{member.name}</p>
                        <p className="text-xs text-gray-400">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-2xl border border-white/10 rounded-3xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Ready to start building?</h3>
                <p className="text-gray-300">Join a hackathon or create your own challenge today</p>
              </div>
              <div className="flex space-x-4">
                <button className="group relative bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                  <span className="flex items-center">
                    <Plus className="w-5 h-5 mr-2" />
                    Create Event
                  </span>
                </button>
                <button className="bg-white/10 backdrop-blur-lg border border-white/20 text-white font-semibold py-3 px-6 rounded-2xl hover:bg-white/20 transition-all duration-300">
                  Browse Hackathons
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
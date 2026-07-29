"use client"

import React from 'react';
import { 
  Trophy, 
  Gamepad2, 
  Zap, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Plus
} from 'lucide-react';
import DashboardLayout from '@/app/(admin)/layout';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ElementType;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, isPositive, icon: Icon }) => (
  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800/80 transition-colors hover:border-slate-700">
    <div className="flex items-center justify-between mb-3">
      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
        {title}
      </span>
      <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
        <Icon size={18} />
      </div>
    </div>
    <div className="flex items-baseline justify-between">
      <h3 className="text-xl font-bold text-slate-100">{value}</h3>
      <span className={`flex items-center text-xs font-bold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
        {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {change}
      </span>
    </div>
  </div>
);

export const DashboardPage: React.FC = () => {
  const players = [
    { id: 1, rank: 1, name: "NeonStriker", game: "Cyberpunk 2077", score: "98,450", status: "In Game" },
    { id: 2, rank: 2, name: "PixelQueen", game: "Valorant", score: "89,120", status: "Online" },
    { id: 3, rank: 3, name: "VaporMaster", game: "Retro Racer", score: "76,800", status: "Offline" },
    { id: 4, rank: 4, name: "ShadowHunter", game: "Apex Legends", score: "64,300", status: "Online" },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">System Overview</h1>
          <p className="text-xs text-slate-400 mt-0.5">Real-time gaming performance & metrics</p>
        </div>

        <button className="py-2 px-4 bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-2 self-start sm:self-auto">
          <Plus size={16} />
          <span>New Match</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Score" value="1,245,800" change="+12.5%" isPositive={true} icon={Zap} />
        <StatCard title="Active Games" value="48 Games" change="+4" isPositive={true} icon={Gamepad2} />
        <StatCard title="Online Players" value="3,420" change="-2.1%" isPositive={false} icon={Trophy} />
        <StatCard title="Win Rate" value="64.8%" change="+5.3%" isPositive={true} icon={TrendingUp} />
      </div>

      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-slate-200">Top Players</h2>
          <button className="text-xs font-semibold text-orange-400 hover:underline">View All</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="pb-2.5 px-3">Rank</th>
                <th className="pb-2.5 px-3">Player</th>
                <th className="pb-2.5 px-3">Primary Game</th>
                <th className="pb-2.5 px-3">Score</th>
                <th className="pb-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-xs">
              {players.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-slate-400">#{p.rank}</td>
                  <td className="py-3 px-3 font-semibold text-slate-200">{p.name}</td>
                  <td className="py-3 px-3 text-slate-400">{p.game}</td>
                  <td className="py-3 px-3 font-mono text-slate-300">{p.score}</td>
                  <td className="py-3 px-3">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-medium ${
                      p.status === 'Online' ? 'bg-emerald-500/10 text-emerald-400' :
                      p.status === 'In Game' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-slate-800 text-slate-500'
                    }`}>
                      <span className={`w-1 h-1 rounded-full ${
                        p.status === 'Online' ? 'bg-emerald-400' : 
                        p.status === 'In Game' ? 'bg-cyan-400' : 'bg-slate-500'
                      }`} />
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
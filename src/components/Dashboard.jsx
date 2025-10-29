import React, { useMemo, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket, Settings, Search, Brain, Activity, CheckCircle, AlertTriangle } from 'lucide-react';

const MetricCard = ({ label, value, sub }) => (
  <div className="rounded-2xl p-4 sm:p-5 bg-white/5 border border-white/10 backdrop-blur shadow-[0_0_40px_-10px] shadow-cyan-500/20">
    <p className="text-xs uppercase tracking-wider text-zinc-400">{label}</p>
    <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
    {sub && <p className="mt-1 text-xs text-zinc-400">{sub}</p>}
  </div>
);

const Arrow = () => (
  <div className="hidden sm:flex items-center justify-center">
    <div className="h-1 w-10 bg-gradient-to-r from-cyan-400/0 via-cyan-400 to-cyan-400/0 rounded-full animate-pulse" />
  </div>
);

const Stage = ({ title, status }) => (
  <div className={`rounded-xl px-4 py-3 bg-white/5 border ${
    status === 'active' ? 'border-cyan-400/40 shadow-[0_0_40px_-12px] shadow-cyan-400/50' : 'border-white/10'
  }`}
  >
    <p className="text-sm font-medium text-white">{title}</p>
    <p className="text-xs text-zinc-400">{status === 'done' ? 'Completed' : status === 'active' ? 'Processing' : 'Queued'}</p>
  </div>
);

const ActivityItem = ({ text, ok = true }) => (
  <div className="flex items-start gap-2 text-sm">
    {ok ? (
      <CheckCircle size={16} className="mt-0.5 text-emerald-400" />
    ) : (
      <AlertTriangle size={16} className="mt-0.5 text-amber-400" />
    )}
    <p className="text-zinc-300">{text}</p>
  </div>
);

export default function Dashboard() {
  const [chain, setChain] = useState('Ethereum');
  const chains = useMemo(() => ['Ethereum', 'Polygon', 'Base'], []);

  return (
    <div className="space-y-6">
      {/* Hero with Spline */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <div className="h-[260px] sm:h-[340px]">
          <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0b0f] via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold">Spin up, simulate, and deploy rollups with one SDK.</h2>
            <p className="text-sm text-zinc-300 mt-1">Developer tool meets futuristic dashboard. Dark mode, neon glow, glassy UI.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-medium shadow-[0_0_40px_-10px] shadow-cyan-500/50 flex items-center gap-2">
              <Rocket size={16} /> Start Simulation
            </button>
            <button className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-zinc-200 flex items-center gap-2">
              <Settings size={16} /> Deploy Anchor
            </button>
            <button className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-zinc-200 hidden md:flex items-center gap-2">
              <Search size={16} /> View Proof
            </button>
            <button className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-zinc-200 hidden lg:flex items-center gap-2">
              <Brain size={16} /> Simulate Audit
            </button>
          </div>
        </div>
      </div>

      {/* Metrics row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <MetricCard label="Batches processed" value="124" sub="+8 today" />
        <MetricCard label="Gas saved" value="93%" sub="vs L1 baseline" />
        <MetricCard label="Avg finality" value="14.2s" sub="last 24h" />
        <MetricCard label="Sequencer" value="Active" sub={<span className='text-emerald-400'>Healthy</span>} />
        <div className="rounded-2xl p-4 sm:p-5 bg-white/5 border border-white/10 backdrop-blur shadow-[0_0_40px_-10px] shadow-fuchsia-500/20">
          <p className="text-xs uppercase tracking-wider text-zinc-400">Base chain</p>
          <select value={chain} onChange={(e)=>setChain(e.target.value)} className="mt-2 w-full bg-transparent text-white border border-white/10 rounded-lg px-3 py-2">
            {chains.map((c) => (<option key={c} value={c} className="bg-[#0b0f17]">{c}</option>))}
          </select>
        </div>
      </div>

      {/* Pipeline + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl p-5 bg-white/5 border border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Pipeline</h3>
            <div className="flex items-center gap-2 text-xs text-cyan-300">
              <Activity size={14} /> live
            </div>
          </div>
          <div className="mt-4 grid grid-cols-4 items-center gap-3">
            <Stage title="Pending Transactions" status="active" />
            <Arrow />
            <Stage title="Batched" status="queued" />
            <Arrow />
            <Stage title="Proof Generated" status="queued" />
            <Arrow />
            <Stage title="Anchored on L1" status="queued" />
          </div>
          <div className="mt-6 h-2 rounded-full bg-zinc-800 overflow-hidden">
            <div className="h-full w-1/3 bg-gradient-to-r from-cyan-500 to-fuchsia-500 animate-pulse" />
          </div>
        </div>
        <div className="rounded-2xl p-5 bg-white/5 border border-white/10">
          <h3 className="text-lg font-semibold mb-3">Activity Log</h3>
          <div className="space-y-3 max-h-56 overflow-auto pr-1">
            <ActivityItem text="[Batch #3] 22 tx batched | Proof verified | Anchored on Sepolia" />
            <ActivityItem text="[Batch #4] 18 tx batched | Gas saved: 93% | Finality: 14.2s" />
            <ActivityItem text="[Health] Sequencer heartbeat 120ms" />
            <ActivityItem text="[Notice] Low L1 gas price window detected" ok={false} />
            <ActivityItem text="[Batch #5] Proof generated in 12.1s" />
          </div>
        </div>
      </div>
    </div>
  );
}

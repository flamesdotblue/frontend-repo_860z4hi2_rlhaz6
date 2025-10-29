import React, { useMemo, useState } from 'react';
import { Puzzle, Download, ExternalLink, PlayCircle, BarChart3, Shield, ClipboardCopy, AlertTriangle, CheckCircle2, Timer } from 'lucide-react';

function Tabs({ tabs, value, onChange }) {
  return (
    <div className="flex items-center gap-2 border-b border-white/10">
      {tabs.map((t) => (
        <button
          key={t.value}
          onClick={() => onChange(t.value)}
          className={`px-4 py-2 rounded-t-lg border ${
            value === t.value
              ? 'bg-white/10 border-white/10 text-white'
              : 'bg-transparent border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

function PluginCard({ name, desc, tag = 'EVM', version = 'v0.1.0' }) {
  return (
    <div className="rounded-xl p-4 border border-white/10 bg-white/5 flex items-start justify-between gap-4">
      <div>
        <p className="text-white font-medium">{name}</p>
        <p className="text-sm text-zinc-400 mt-1">{desc}</p>
        <div className="mt-2 flex items-center gap-2 text-xs text-zinc-400">
          <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/10">{tag}</span>
          <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/10">{version}</span>
        </div>
      </div>
      <button className="px-3 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white text-sm">Install</button>
    </div>
  );
}

function PluginsView() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-zinc-300">
          <Puzzle size={16} className="text-cyan-400" />
          <p className="font-medium">ZeroSync Plugins</p>
        </div>
        <button className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-zinc-200">Install Custom Plugin</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PluginCard name="Polygon CDK" desc="Build high-performance L2s with Polygon's CDK." />
        <PluginCard name="zkSync ZK Stack" desc="ZK-native stack for hyper-scalable rollups." />
        <PluginCard name="Optimism Orbit" desc="OP Stack-based rollup framework." />
        <PluginCard name="Scroll" desc="ZK rollup for EVM-compatible scaling." />
        <PluginCard name="StarkNet" desc="Cairo-powered ZK ecosystem." tag="Non-EVM" version="coming soon" />
      </div>
    </div>
  );
}

function SimulationView() {
  const logs = [
    'Deploying mock rollup contracts',
    'Sequencer started',
    'Batching 22 transactions',
    'Proof generated',
    'Proof anchored on L1 (Sepolia)',
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="rounded-xl p-4 border border-white/10 bg-white/5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-zinc-300">
            <PlayCircle size={16} className="text-emerald-400" />
            <p className="font-medium">Simulation Log</p>
          </div>
          <button className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-sm">Run Full Simulation</button>
        </div>
        <div className="h-64 overflow-auto pr-1 space-y-2 text-sm">
          {logs.map((l, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle2 size={16} className="mt-0.5 text-emerald-400" />
              <p className="text-zinc-200">{l}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-xl p-4 border border-white/10 bg-white/5">
        <div className="flex items-center gap-2 text-zinc-300 mb-2">
          <BarChart3 size={16} className="text-cyan-400" />
          <p className="font-medium">Results</p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg p-3 bg-white/5 border border-white/10">
            <p className="text-zinc-400">Gas saved</p>
            <p className="text-white text-xl font-semibold">93%</p>
          </div>
          <div className="rounded-lg p-3 bg-white/5 border border-white/10">
            <p className="text-zinc-400">Finality time</p>
            <p className="text-white text-xl font-semibold">14.2s</p>
          </div>
          <div className="rounded-lg p-3 bg-white/5 border border-white/10">
            <p className="text-zinc-400">Proof latency</p>
            <p className="text-white text-xl font-semibold">12.1s</p>
          </div>
          <div className="rounded-lg p-3 bg-white/5 border border-white/10">
            <p className="text-zinc-400">Warnings</p>
            <div className="flex items-center gap-2 text-amber-300"><AlertTriangle size={16}/> Low L1 gas price window</div>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <button className="px-3 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white text-sm flex items-center gap-2">
            <PlayCircle size={16}/> Run Full Simulation
          </button>
          <button className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-sm">View Summary Report</button>
        </div>
      </div>
    </div>
  );
}

function AnalyticsView() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl p-4 border border-white/10 bg-white/5">
        <p className="text-zinc-300 font-medium mb-2">Batches processed over time</p>
        <div className="h-40 rounded-lg bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 border border-white/10" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl p-4 border border-white/10 bg-white/5">
          <p className="text-zinc-300 font-medium mb-2">Avg proof generation time</p>
          <div className="h-32 rounded-lg bg-gradient-to-r from-fuchsia-500/20 to-cyan-500/20 border border-white/10" />
        </div>
        <div className="rounded-xl p-4 border border-white/10 bg-white/5">
          <p className="text-zinc-300 font-medium mb-2">Gas efficiency vs L1 baseline</p>
          <div className="h-32 rounded-lg bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 border border-white/10" />
        </div>
      </div>
      <div className="rounded-xl p-4 border border-white/10 bg-white/5 overflow-auto">
        <table className="min-w-full text-sm">
          <thead className="text-zinc-400">
            <tr>
              <th className="text-left font-medium pb-2">Batch</th>
              <th className="text-left font-medium pb-2">Tx Count</th>
              <th className="text-left font-medium pb-2">Gas Saved</th>
              <th className="text-left font-medium pb-2">Finality</th>
              <th className="text-left font-medium pb-2">Proof Status</th>
              <th className="text-left font-medium pb-2">Date</th>
            </tr>
          </thead>
          <tbody className="text-zinc-200">
            <tr className="border-t border-white/10">
              <td className="py-2">12</td>
              <td className="py-2">18</td>
              <td className="py-2">92%</td>
              <td className="py-2">13.4s</td>
              <td className="py-2"><span className="inline-flex items-center gap-1 text-emerald-400"><CheckCircle2 size={14}/> Verified</span></td>
              <td className="py-2">Oct 27</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProofView() {
  const proof = {
    batchId: 4,
    proofHash: '0xabc123...',
    publicInputs: ['0x01', '0x02', '0x03'],
    verificationStatus: 'verified',
  };
  const json = JSON.stringify(proof, null, 2);
  const copy = async () => {
    await navigator.clipboard.writeText(json);
  };
  const download = () => {
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'proof.json';
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-zinc-300">
          <Shield size={16} className="text-emerald-400" />
          <p className="font-medium">Proof Viewer</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={copy} className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-sm flex items-center gap-2"><ClipboardCopy size={16}/> Copy Proof</button>
          <button onClick={download} className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-sm flex items-center gap-2"><Download size={16}/> Export JSON</button>
          <button className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-sm flex items-center gap-2"><ExternalLink size={16}/> View On Explorer</button>
        </div>
      </div>
      <div className="rounded-xl p-4 border border-white/10 bg-white/5">
        <pre className="text-sm text-zinc-100 whitespace-pre-wrap">{json}</pre>
      </div>
    </div>
  );
}

function DocsView() {
  return (
    <div className="rounded-xl p-4 border border-white/10 bg-white/5 space-y-3">
      <p className="text-zinc-300 font-medium">Docs & Tutorials</p>
      <div className="prose prose-invert max-w-none text-sm">
        <h3>Getting Started with ZeroSync CLI</h3>
        <pre className="bg-white/5 p-3 rounded-lg border border-white/10">$ npx zerosync init myrollup</pre>
        <h3>How ProofEngine Works</h3>
        <p>ZeroSync orchestrates batching, proof generation, and L1 anchoring with pluggable engines.</p>
        <h3>Adding Plugins</h3>
        <p>Install ecosystem plugins to customize sequencing, DA layers, and proving backends.</p>
        <h3>Running a Local Simulation</h3>
        <pre className="bg-white/5 p-3 rounded-lg border border-white/10">$ npx zerosync simulate --config zerosync.config.json</pre>
      </div>
    </div>
  );
}

export default function Workspace({ initialTab = 'plugins' }) {
  const [tab, setTab] = useState(initialTab);
  const tabs = useMemo(
    () => [
      { label: 'Plugins', value: 'plugins' },
      { label: 'Simulation & Audit', value: 'sim' },
      { label: 'History & Analytics', value: 'analytics' },
      { label: 'Proof Viewer', value: 'proof' },
      { label: 'Docs', value: 'docs' },
    ],
    []
  );

  return (
    <div className="space-y-4">
      <Tabs tabs={tabs} value={tab} onChange={setTab} />
      {tab === 'plugins' && <PluginsView />}
      {tab === 'sim' && <SimulationView />}
      {tab === 'analytics' && <AnalyticsView />}
      {tab === 'proof' && <ProofView />}
      {tab === 'docs' && <DocsView />}
    </div>
  );
}

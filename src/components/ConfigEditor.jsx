import React, { useMemo, useState } from 'react';
import { CheckCircle2, Download, FileCode, Save, Shield, AlertTriangle } from 'lucide-react';

const defaultConfig = {
  rollup: 'mock-zk',
  baseChain: 'ethereum',
  rpcUrl: 'https://sepolia.infura.io/v3/<key>',
  proofEngine: 'mock',
  batchSize: 10,
};

function validateJson(text) {
  try {
    const parsed = JSON.parse(text);
    return { ok: true, parsed };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

export default function ConfigEditor() {
  const [content, setContent] = useState(JSON.stringify(defaultConfig, null, 2));
  const result = useMemo(() => validateJson(content), [content]);

  const onPretty = () => {
    if (result.ok) setContent(JSON.stringify(result.parsed, null, 2));
  };

  const onExport = () => {
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'zerosync.config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Config Editor</h2>
          <p className="text-sm text-zinc-400">Edit and validate your ZeroSync configuration files.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onPretty} className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-zinc-200 flex items-center gap-2">
            <FileCode size={16} /> Pretty Print
          </button>
          <button onClick={onExport} className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-zinc-200 flex items-center gap-2">
            <Download size={16} /> Export
          </button>
          <button className="px-3 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-medium flex items-center gap-2">
            <Save size={16} /> Save
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 rounded-2xl border border-white/10 bg-white/5 p-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            spellCheck={false}
            className="w-full h-[460px] bg-transparent outline-none resize-none font-mono text-sm text-zinc-100"
          />
        </div>
        <div className="space-y-4">
          <div className={`rounded-2xl p-4 border ${result.ok ? 'border-emerald-400/40 bg-emerald-400/10' : 'border-amber-400/40 bg-amber-400/10'}`}>
            <div className="flex items-center gap-2">
              {result.ok ? (
                <CheckCircle2 size={18} className="text-emerald-400" />
              ) : (
                <AlertTriangle size={18} className="text-amber-400" />
              )}
              <p className="font-medium">{result.ok ? 'Valid JSON' : 'Invalid JSON'}</p>
            </div>
            {!result.ok && (
              <p className="mt-2 text-sm text-amber-200/90">{result.error}</p>
            )}
            {result.ok && (
              <div className="mt-3 space-y-1 text-sm text-zinc-300">
                <p>rollup: <span className="text-white font-medium">{result.parsed.rollup}</span></p>
                <p>baseChain: <span className="text-white font-medium">{result.parsed.baseChain}</span></p>
                <p>proofEngine: <span className="text-white font-medium">{result.parsed.proofEngine}</span></p>
              </div>
            )}
          </div>
          <div className="rounded-2xl p-4 border border-white/10 bg-white/5">
            <div className="flex items-center gap-2 mb-2 text-zinc-300">
              <Shield size={16} className="text-cyan-400" />
              <p className="font-medium">Validation</p>
            </div>
            <ul className="text-sm text-zinc-400 list-disc ml-5 space-y-1">
              <li>rpcUrl must be a valid HTTPS URL</li>
              <li>batchSize should be between 1 and 100</li>
              <li>proofEngine supports mock, groth16, plonk</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

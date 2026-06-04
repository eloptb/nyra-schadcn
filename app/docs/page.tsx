"use client"

import { useState } from "react"

/* ── Helpers ──────────────────────────────────────── */
function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex items-center rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs font-medium text-foreground">
      {children}
    </kbd>
  )
}
function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
      {children}
    </code>
  )
}
function Step({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h3 className="text-base font-semibold text-foreground">{number}. {title}</h3>
      <div className="text-sm text-muted-foreground leading-relaxed">{children}</div>
    </div>
  )
}

const IDE_TABS = ["VS Code", "Claude Code", "Cursor", "Codeium / Windsurf", "Codex", "AWS Kiro"]

const RECENT = [
  { title: "How to print a RE...", date: "1h ago", messages: 2 },
  { title: "quels sont les attri...", date: "May 20", messages: 4 },
  { title: "What's a DIALOG ...", date: "May 18", messages: 2 },
]

const SUGGESTIONS = [
  "How do I declare a RECORD?",
  "What's AUI Tree binding?",
  "How to print a REPORT?",
]

/* ── Docs Assistant view ──────────────────────────── */
function DocsAssistantView() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-120px)]">

      {/* Top bar */}
      <div className="border-b border-border px-6 py-3 flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-60"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          Conversations
        </div>
        <div className="flex items-center gap-2">
          Doc viewer
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-60"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        </div>
      </div>

      {/* Main — dot background */}
      <div
        className="flex-1 flex flex-col items-center justify-start pt-20 pb-12 px-6"
        style={{
          backgroundImage: "radial-gradient(circle, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      >
        <div className="w-full max-w-2xl space-y-8">

          {/* Title */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Ask anything about Genero BDL</h1>
            <p className="text-sm text-muted-foreground">
              Best for <strong className="text-foreground">explanations and BDL concepts</strong> — answers cite the official docs.
            </p>
          </div>

          {/* Search input */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="9" r="7"/><path d="M9 3v1M9 14v1M3 9h1M14 9h1M5 5l.7.7M12.3 12.3l.7.7M5 13l.7-.7M12.3 5.7l.7-.7"/></svg>
            </div>
            <input
              type="text"
              placeholder="Ask anything about Genero BDL..."
              className="w-full rounded-full border border-border bg-card pl-12 pr-14 py-4 text-sm text-foreground placeholder:text-muted-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-accent transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>

          {/* Suggestions */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Try</span>
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-foreground hover:bg-accent hover:border-ring transition-colors"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Info banner */}
          <div className="flex items-center gap-4 rounded-xl border border-ring/30 bg-accent px-5 py-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-ring/30 bg-card text-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-primary">
                Generating or refactoring code? Use Claude Code or Cursor.
              </p>
              <p className="text-xs text-accent-foreground/70 mt-0.5">
                Connect an AI coding agent with our Skills for the best code results.
              </p>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-primary"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>

          {/* Recent conversations */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Recent Conversations
            </p>
            <div className="grid grid-cols-3 gap-3">
              {RECENT.map((item) => (
                <button
                  key={item.title}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-left hover:bg-accent hover:border-ring transition-colors group"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-muted-foreground"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.date} · {item.messages} messages</p>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-muted-foreground group-hover:text-foreground transition-colors"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        Genero Intelligence · powered by Four Js · AI may make mistakes
      </div>
    </div>
  )
}

/* ── AI Agent Setup view ──────────────────────────── */
function AgentSetupView() {
  const [activeIde, setActiveIde] = useState("VS Code")
  return (
    <div>
      {/* IDE Tabs */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex overflow-x-auto">
            {IDE_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveIde(tab)}
                className={`whitespace-nowrap px-4 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeIde === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-10 space-y-10">
        {/* Warning box */}
        <div className="rounded-xl border border-ring/30 bg-accent p-6 space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-primary font-bold text-base mt-0.5">!</span>
            <div className="space-y-2">
              <p className="font-semibold text-accent-foreground">Before you begin</p>
              <p className="text-sm text-accent-foreground/80 leading-relaxed">
                Before connecting to Genero, make sure you can see AI models in the VS Code model picker. If no models are listed,{" "}
                <strong>sign in to VS Code with your GitHub account</strong> — this gives you free access to Copilot with models included. For more models, upgrade to a{" "}
                <strong className="text-primary">GitHub Copilot Pro</strong> or <strong>Pro+</strong> plan.
              </p>
            </div>
          </div>
          <div className="ml-6 w-72 rounded-lg border border-border bg-card shadow-sm overflow-hidden">
            <div className="p-2 space-y-1">
              <div className="flex items-center rounded border border-border px-2 py-1 text-xs text-muted-foreground">Search models</div>
              {[{ name: "Auto", badge: "10% discount" }, { name: "Claude Opus 4.6", badge: "3x" }, { name: "Claude Sonnet 4.6", badge: "1x" }, { name: "GPT-5.4", badge: "1x" }].map((item) => (
                <div key={item.name} className="flex items-center justify-between px-2 py-1 rounded hover:bg-muted text-xs">
                  <span className="text-foreground">{item.name}</span>
                  <span className="text-muted-foreground">{item.badge}</span>
                </div>
              ))}
              <div className="flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground"><span>›</span> Other Models</div>
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <Step number={1} title="Open Command Palette">Press <Kbd>Ctrl+Shift+P</Kbd> (or <Kbd>Cmd+Shift+P</Kbd> on Mac)</Step>
          <Step number={2} title="Add MCP Server">Type <Code>MCP: Add Server</Code> and select the command.</Step>
          <Step number={3} title="Choose HTTP type">Select <strong className="text-foreground">HTTP (http or https)</strong> as the server type.</Step>
          <Step number={4} title="Enter the server URL">
            <p>Copy and paste the URL below:</p>
            <div className="mt-2 flex items-center justify-between rounded-lg border border-border bg-muted px-4 py-3">
              <code className="font-mono text-sm text-foreground">https://service.generointelligence.ai/mcp</code>
              <button className="ml-4 text-xs text-muted-foreground hover:text-foreground transition-colors">Copy</button>
            </div>
          </Step>
          <Step number={5} title="Name the server">Enter a name, for example: <Code>Genero Intelligence</Code></Step>
          <Step number={6} title="Restart VS Code">Reload the window or restart VS Code. The MCP server will connect automatically.</Step>
        </div>
      </div>
    </div>
  )
}

/* ── Page ─────────────────────────────────────────── */
export default function DocsPage() {
  const [activeNav, setActiveNav] = useState<"assistant" | "setup">("assistant")

  return (
    <div className="min-h-screen bg-background">

      {/* ── Header ──────────────────────────────── */}
      <header className="dark bg-sidebar">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded bg-primary flex items-center justify-center">
                <span className="text-primary-foreground text-xs font-bold">G</span>
              </div>
              <span className="text-sidebar-foreground font-semibold text-sm">Welcome back, Elodie</span>
            </div>
            <span className="text-sidebar-foreground/30">|</span>
            <div className="flex items-center gap-3 text-xs text-sidebar-foreground/60">
              <span className="text-secondary font-semibold tracking-wide uppercase text-[11px]">Last 7 days</span>
              <span>·</span><span>0 Requests</span>
              <span>·</span><span>— Top tool</span>
              <span>·</span><span>— Last active</span>
            </div>
          </div>
          <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center text-sidebar-accent-foreground text-xs font-semibold">EP</div>
        </div>

        {/* Sub nav */}
        <div className="mx-auto max-w-5xl px-6 pb-4 flex gap-2">
          <button
            onClick={() => setActiveNav("assistant")}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-colors border ${
              activeNav === "assistant"
                ? "border-sidebar-foreground bg-sidebar-foreground text-sidebar"
                : "border-sidebar-border text-sidebar-foreground/70 hover:text-sidebar-foreground"
            }`}
          >
            💡 Docs Assistant
          </button>
          <button
            onClick={() => setActiveNav("setup")}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-colors border ${
              activeNav === "setup"
                ? "border-sidebar-foreground bg-sidebar-foreground text-sidebar"
                : "border-sidebar-border text-sidebar-foreground/70 hover:text-sidebar-foreground"
            }`}
          >
            ⌘ AI Agent Setup
          </button>
        </div>
      </header>

      {/* ── Content ─────────────────────────────── */}
      {activeNav === "assistant" ? <DocsAssistantView /> : <AgentSetupView />}

    </div>
  )
}

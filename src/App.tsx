import { useState } from 'react'
import { Sparkles, Database, FileText, Github, MessageSquare, Zap, ArrowRight, Play, CheckCircle2, Plug2, Brain, Server, Code2, Figma, Monitor, Settings, Key, Shield, User, MessageCircle, CheckCircle, ExternalLink, Package, GitBranch } from 'lucide-react'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState(0)
  const [selectedExample, setSelectedExample] = useState<number | null>(null)

  const sections = [
    { id: 0, title: 'What is MCP?', icon: Sparkles },
    { id: 1, title: 'Where You See & Use It', icon: Monitor },
    { id: 2, title: 'Setup Flow', icon: Settings },
    { id: 3, title: 'Credentials', icon: Key },
    { id: 4, title: 'Real Examples', icon: Zap },
    { id: 5, title: 'MCP Servers Directory', icon: Package },
    { id: 6, title: 'Two Real Flows', icon: User }
  ]

  interface ExampleStep {
    actor: string
    action: string
  }

  interface Example {
    title: string
    icon: typeof Database
    description: string
    color: string
    interactionPoint: string
    needsCredentials: boolean
    credentialType: string
    setupRole: string
    everydayRole: string
    steps: ExampleStep[]
    docLink?: string
    isConceptual?: boolean
  }

  const examples: Example[] = [
    {
      title: 'Database Access',
      icon: Database,
      description: 'AI reads and writes to your database',
      color: 'from-blue-500 to-cyan-500',
      interactionPoint: 'Claude Desktop chat window',
      needsCredentials: true,
      credentialType: 'Database URL + password',
      setupRole: 'Engineer or DevOps',
      everydayRole: 'Analysts, PMs, Support team',
      docLink: 'https://github.com/modelcontextprotocol/servers#-reference-servers',
      steps: [
        { actor: 'You', action: 'Type in Claude: "Show me all customers who signed up this month"' },
        { actor: 'Claude', action: 'Decides to use the customer-db MCP server' },
        { actor: 'MCP Server', action: 'Connects to database and runs SQL query' },
        { actor: 'MCP Server', action: 'Returns customer data rows' },
        { actor: 'Claude', action: 'Shows you a formatted table with the results' }
      ]
    },
    {
      title: 'File System',
      icon: FileText,
      description: 'AI searches and organizes your documents',
      color: 'from-purple-500 to-pink-500',
      interactionPoint: 'Claude Desktop or any AI app with filesystem MCP support',
      needsCredentials: false,
      credentialType: 'Local file access only',
      setupRole: 'Built into app',
      everydayRole: 'Anyone',
      docLink: 'https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem',
      steps: [
        { actor: 'You', action: 'Ask: "Find all invoices from last quarter"' },
        { actor: 'AI', action: 'Calls file-system MCP server' },
        { actor: 'MCP Server', action: 'Searches your documents folder' },
        { actor: 'MCP Server', action: 'Returns list of matching PDF files' },
        { actor: 'AI', action: 'Shows you the files with summaries' }
      ]
    },
    {
      title: 'GitHub Integration',
      icon: Github,
      description: 'AI creates PRs and manages code',
      color: 'from-gray-700 to-gray-900',
      interactionPoint: 'VSCode chat panel or GitHub assistant',
      needsCredentials: true,
      credentialType: 'GitHub personal access token',
      setupRole: 'Engineer',
      everydayRole: 'Developers, PMs',
      docLink: 'https://github.com/modelcontextprotocol/servers/tree/main/src/git',
      steps: [
        { actor: 'You', action: 'Type: "Create a PR to fix the login bug"' },
        { actor: 'AI', action: 'Uses GitHub MCP server' },
        { actor: 'MCP Server', action: 'Creates new branch via GitHub API' },
        { actor: 'MCP Server', action: 'Commits code fix and creates PR' },
        { actor: 'AI', action: 'Shows you the PR link' }
      ]
    },
    {
      title: 'Slack Integration',
      icon: MessageSquare,
      description: 'AI reads channels and sends messages',
      color: 'from-green-500 to-emerald-500',
      interactionPoint: 'Slack bot or Claude sidebar',
      needsCredentials: true,
      credentialType: 'Slack bot token + workspace consent',
      setupRole: 'Workspace admin',
      everydayRole: 'Any team member',
      docLink: 'https://github.com/zencoderai/slack-mcp-server',
      steps: [
        { actor: 'You', action: 'Ask: "What did #design discuss today?"' },
        { actor: 'AI', action: 'Calls Slack MCP server' },
        { actor: 'MCP Server', action: 'Reads messages from #design channel' },
        { actor: 'MCP Server', action: 'Returns message history' },
        { actor: 'AI', action: 'Summarizes key discussion points' }
      ]
    },
    {
      title: 'VSCode Integration',
      icon: Code2,
      description: 'AI explores and edits your codebase',
      color: 'from-blue-600 to-indigo-600',
      interactionPoint: 'VSCode AI chat panel',
      needsCredentials: false,
      credentialType: 'Local workspace access',
      setupRole: 'Built into VSCode',
      everydayRole: 'Developers',
      docLink: 'https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem',
      steps: [
        { actor: 'You', action: 'Type in VSCode chat: "Find all API calls to /checkout"' },
        { actor: 'VSCode AI', action: 'Uses code-explorer MCP server' },
        { actor: 'MCP Server', action: 'Scans workspace files for patterns' },
        { actor: 'MCP Server', action: 'Returns file paths and code snippets' },
        { actor: 'VSCode AI', action: 'Shows annotated results in chat' }
      ]
    },
    {
      title: 'Figma Integration',
      icon: Figma,
      description: 'AI analyzes and updates designs',
      color: 'from-pink-500 to-rose-500',
      interactionPoint: 'Figma AI sidebar plugin',
      needsCredentials: true,
      credentialType: 'Figma API token (OAuth)',
      setupRole: 'Plugin maker (one-time)',
      everydayRole: 'Designers',
      steps: [
        { actor: 'You', action: 'Ask in Figma: "List all buttons not following design system"' },
        { actor: 'Figma AI', action: 'Calls Figma MCP server' },
        { actor: 'MCP Server', action: 'Fetches components via Figma API' },
        { actor: 'MCP Server', action: 'Analyzes component names and styles' },
        { actor: 'Figma AI', action: 'Shows checklist of inconsistent buttons' }
      ]
    },
    {
      title: 'Figma Library ↔ GitHub Design Tokens',
      icon: GitBranch,
      description: 'Sync design system components to GitHub repo',
      color: 'from-violet-500 to-purple-500',
      interactionPoint: 'Figma plugin side panel',
      needsCredentials: true,
      credentialType: 'GitHub token + Figma API access',
      setupRole: 'Engineer or plugin author',
      everydayRole: 'Designers and Engineers',
      isConceptual: true,
      steps: [
        { actor: 'Designer', action: 'Updates a component in Figma Library (e.g., changes button color)' },
        { actor: 'Designer', action: 'Clicks "Sync to GitHub" in Figma plugin' },
        { actor: 'MCP Server', action: 'Reads component properties via Figma API' },
        { actor: 'MCP Server', action: 'Converts to design tokens (JSON) and commits to GitHub repo' },
        { actor: 'Engineer', action: 'Reviews PR in GitHub, merges to update design system code' }
      ]
    }
  ]

  const startAnimation = () => {
    setActiveSection(1) // Navigate to "Where You Interact" section
    // Scroll to content after a brief delay to let section render
    setTimeout(() => {
      window.scrollTo({ top: 400, behavior: 'smooth' })
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full mb-8 border border-purple-500/30">
              <Sparkles className="w-4 h-4 text-purple-300" />
              <span className="text-sm text-purple-200">For Designers & Non-Technical Folks</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Understanding
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> MCP</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12">
              Model Context Protocol: Think of it as a universal adapter that lets AI assistants connect to your tools and data
            </p>
            <button
              onClick={startAnimation}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105"
            >
              <Play className="w-5 h-5" />
              See It In Action
            </button>
          </div>
        </div>
      </div>

      {/* Conceptual Banner */}
      <div className="bg-blue-900/30 border-b border-blue-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <p className="text-center text-blue-200 text-sm">
            <strong>📚 Learning Demo:</strong> This site explains MCP concepts - it doesn't connect to real tools or data. It's for understanding the flows.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-lg border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-4">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                    activeSection === section.id
                      ? 'bg-purple-500 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {section.title}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Section 0: What is MCP? */}
        {activeSection === 0 && (
          <div className="space-y-12 animate-in fade-in duration-500">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-white mb-6">What is MCP?</h2>
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-500/30 mb-6">
                <p className="text-2xl text-white font-semibold">
                  MCP is the hidden cable between your AI app and your other tools
                </p>
              </div>
              <p className="text-xl text-slate-300 leading-relaxed">
                Imagine you have a super smart AI assistant, but it can only talk to you. It can't access your files, databases, or other tools. That's where MCP comes in.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700 hover:border-purple-500 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                  <Plug2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Universal Connector</h3>
                <p className="text-slate-400">
                  Like USB-C for AI - one standard way to connect AI to any tool or data source
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700 hover:border-purple-500 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Extends AI Powers</h3>
                <p className="text-slate-400">
                  Gives AI the ability to actually do things with your data, not just talk about it
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700 hover:border-purple-500 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                  <Server className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Open Standard</h3>
                <p className="text-slate-400">
                  Anyone can build connections - it's not locked to one company or platform
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border border-purple-500/30">
              <h3 className="text-2xl font-semibold text-white mb-4">The Simple Analogy</h3>
              <p className="text-lg text-slate-300 leading-relaxed">
                Think of MCP like a translator at the United Nations. The AI speaks one language, your database speaks another, your files speak another. MCP translates between them so they can all work together seamlessly.
              </p>
            </div>
          </div>
        )}

        {/* Section 1: Where You Interact */}
        {activeSection === 1 && (
          <div className="space-y-12 animate-in fade-in duration-500">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-white mb-6">Where You See & Use It</h2>
              <p className="text-xl text-slate-300 leading-relaxed mb-4">
                You use MCP in the apps you already know - Claude, VSCode, Figma. MCP is just the invisible cable behind them.
              </p>
              <p className="text-sm text-slate-400 italic mb-4">
                (In technical terms, these are called "host apps" - but just think of them as "the app where you chat with AI")
              </p>
              <div className="bg-green-900/20 rounded-lg p-4 border border-green-500/30">
                <p className="text-green-200 text-sm">
                  <strong>👩‍🎨 If you're a designer or PM:</strong> This is your world. You live here. Everything under "Setup Flow" and the technical side of "Two Real Flows" is done for you by someone else.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 text-center">Claude Desktop</h3>
                <p className="text-slate-400 text-center mb-4">Chat window where you type</p>
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                  <p className="text-sm text-slate-300 italic">"Show me all customers from Europe"</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-purple-400">
                    <ArrowRight className="w-3 h-3" />
                    <span>MCP handles this behind the scenes</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <Code2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 text-center">VSCode</h3>
                <p className="text-slate-400 text-center mb-4">AI chat panel in your editor</p>
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                  <p className="text-sm text-slate-300 italic">"Find all TODO comments"</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-blue-400">
                    <ArrowRight className="w-3 h-3" />
                    <span>MCP scans your codebase</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <Figma className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 text-center">Figma Plugin</h3>
                <p className="text-slate-400 text-center mb-4">AI sidebar in your design</p>
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                  <p className="text-sm text-slate-300 italic">"List buttons with wrong colors"</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-pink-400">
                    <ArrowRight className="w-3 h-3" />
                    <span>MCP analyzes your design</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700">
              <h3 className="text-2xl font-semibold text-white mb-4 text-center">The Complete Flow (All Steps)</h3>
              <p className="text-center text-slate-400 mb-6">This is what happens every time you use MCP - but you only see step 1 and 4!</p>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-[200px]">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6 text-center">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-purple-600 font-bold text-lg mx-auto mb-3">1</div>
                    <User className="w-12 h-12 text-white mx-auto mb-3" />
                    <h4 className="font-semibold text-white mb-2">You</h4>
                    <p className="text-sm text-purple-100">Type or click</p>
                  </div>
                </div>
                <ArrowRight className="w-8 h-8 text-purple-400" />
                <div className="flex-1 min-w-[200px]">
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-6 text-center">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold text-lg mx-auto mb-3">2</div>
                    <MessageCircle className="w-12 h-12 text-white mx-auto mb-3" />
                    <h4 className="font-semibold text-white mb-2">AI App</h4>
                    <p className="text-sm text-blue-100">Decides to use MCP</p>
                  </div>
                </div>
                <ArrowRight className="w-8 h-8 text-blue-400" />
                <div className="flex-1 min-w-[200px]">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl p-6 text-center">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-green-600 font-bold text-lg mx-auto mb-3">3</div>
                    <Server className="w-12 h-12 text-white mx-auto mb-3" />
                    <h4 className="font-semibold text-white mb-2">MCP (invisible)</h4>
                    <p className="text-sm text-green-100">Talks to your tools</p>
                  </div>
                </div>
                <ArrowRight className="w-8 h-8 text-green-400" />
                <div className="flex-1 min-w-[200px]">
                  <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl p-6 text-center">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-amber-600 font-bold text-lg mx-auto mb-3">4</div>
                    <Database className="w-12 h-12 text-white mx-auto mb-3" />
                    <h4 className="font-semibold text-white mb-2">Your Tool</h4>
                    <p className="text-sm text-amber-100">Does the work</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 bg-purple-900/30 rounded-lg p-4 border border-purple-500/30">
                <p className="text-center text-purple-200 text-sm">
                  <strong>You only see:</strong> Step 1 (you type) and Step 4 (you get results). Steps 2 & 3 happen invisibly!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Section 2: Setup Flow */}
        {activeSection === 2 && (
          <div className="space-y-12 animate-in fade-in duration-500">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-white mb-6">Technical Setup (Engineer / IT Only)</h2>
              <p className="text-xl text-slate-300 leading-relaxed mb-4">
                The complete flow from zero to a working MCP connection
              </p>
              <p className="text-sm text-blue-300 mb-6">
                This is the detailed version of the left side (technical person) in "Two Real Flows"
              </p>
              <div className="bg-amber-900/30 rounded-xl p-6 border border-amber-500/30 text-left">
                <h3 className="text-lg font-semibold text-amber-200 mb-3">👤 Who is this for?</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                    <p className="text-sm font-semibold text-red-300 mb-2">Technical Setup (one-time):</p>
                    <p className="text-sm text-slate-300">Engineers, DevOps, or IT admins do this part once. Most designers and non-technical teammates will never see these screens.</p>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                    <p className="text-sm font-semibold text-green-300 mb-2">Everyday Use:</p>
                    <p className="text-sm text-slate-300">Designers, PMs, support, analysts - anyone! You just type in Claude, VSCode, Figma, etc. You don't need to know MCP exists.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">1</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-white mb-3">Choose or Build an MCP Server</h3>
                    <p className="text-slate-300 mb-4">Pick an existing MCP server or build your own</p>
                    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                      <p className="text-sm text-slate-400 mb-2">Popular MCP servers:</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">@modelcontextprotocol/server-postgres</span>
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">@modelcontextprotocol/server-github</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">2</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-white mb-3">Install the MCP Server</h3>
                    <p className="text-slate-300 mb-4">Install using npm, docker, or download a binary</p>
                    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 font-mono text-sm">
                      <p className="text-green-400">$ npm install -g @modelcontextprotocol/server-postgres</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">3</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-white mb-3">Configure the Server</h3>
                    <p className="text-slate-300 mb-4">Point it to your tools (database URL, API endpoints, etc.)</p>
                    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 font-mono text-sm">
                      <p className="text-slate-400">// config.json</p>
                      <p className="text-slate-300">{'{'} "database_url": "postgresql://localhost:5432/mydb" {'}'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">4</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-white mb-3">Add to Host App</h3>
                    <p className="text-slate-300 mb-4">Register the MCP server in your AI app</p>
                    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 font-mono text-sm">
                      <p className="text-slate-400">// Claude Desktop config</p>
                      <p className="text-slate-300">{'{'} "mcpServers": {'{'} "postgres": {'{'} ... {'}'} {'}'} {'}'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">5</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-white mb-3">Test It</h3>
                    <p className="text-slate-300 mb-4">Ask the AI to use the new tool</p>
                    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                      <div className="flex items-start gap-3">
                        <User className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                        <p className="text-slate-300">"Can you query my database?"</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 3: Credentials */}
        {activeSection === 3 && (
          <div className="space-y-12 animate-in fade-in duration-500">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-white mb-6">Credential Management</h2>
              <p className="text-xl text-slate-300 leading-relaxed">
                When, how, and why users need to add credentials
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4">
                  <Settings className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Setup-Time Credentials</h3>
                <p className="text-slate-300 mb-4">Added by technical users during configuration</p>
                <div className="space-y-3">
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                    <p className="text-sm font-semibold text-purple-300 mb-2">When:</p>
                    <p className="text-sm text-slate-400">During initial setup</p>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                    <p className="text-sm font-semibold text-purple-300 mb-2">What:</p>
                    <p className="text-sm text-slate-400">API keys, database passwords, tokens</p>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                    <p className="text-sm font-semibold text-purple-300 mb-2">How:</p>
                    <p className="text-sm text-slate-400">Config files, environment variables</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Runtime Consent</h3>
                <p className="text-slate-300 mb-4">Permission prompts shown to end users</p>
                <div className="space-y-3">
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                    <p className="text-sm font-semibold text-blue-300 mb-2">When:</p>
                    <p className="text-sm text-slate-400">First time AI wants to use a tool</p>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                    <p className="text-sm font-semibold text-blue-300 mb-2">What:</p>
                    <p className="text-sm text-slate-400">Permission to access files, Slack, etc.</p>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                    <p className="text-sm font-semibold text-blue-300 mb-2">How:</p>
                    <p className="text-sm text-slate-400">UI dialog with Allow/Deny buttons</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 rounded-2xl p-8 border border-amber-500/30">
              <h3 className="text-2xl font-semibold text-white mb-4">Why Are Credentials Needed?</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Key className="w-5 h-5 text-amber-400 flex-shrink-0 mt-1" />
                  <p className="text-slate-300"><span className="font-semibold">Access Control:</span> Tools need to verify authorization</p>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-amber-400 flex-shrink-0 mt-1" />
                  <p className="text-slate-300"><span className="font-semibold">Security:</span> Only authorized users can access data</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0 mt-1" />
                  <p className="text-slate-300"><span className="font-semibold">Permissions:</span> Different scopes (read vs write)</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 4: Real Examples */}
        {activeSection === 4 && (
          <div className="space-y-12 animate-in fade-in duration-500">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-white mb-6">Real-World Examples</h2>
              <p className="text-xl text-slate-300 leading-relaxed">
                See exactly where users interact and how MCP flows work
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {examples.map((example, index) => {
                const Icon = example.icon
                const isSelected = selectedExample === index
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedExample(isSelected ? null : index)}
                    className={`text-left bg-slate-800/50 backdrop-blur rounded-2xl p-8 border transition-all transform hover:scale-105 ${
                      isSelected ? 'border-purple-500 ring-2 ring-purple-500/50' : 'border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${example.color} rounded-2xl flex items-center justify-center mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-2xl font-semibold text-white">{example.title}</h3>
                      {example.isConceptual && (
                        <span className="px-2 py-1 bg-amber-500/20 text-amber-300 text-xs rounded-full border border-amber-500/30">
                          Concept Example
                        </span>
                      )}
                    </div>
                    <p className="text-slate-300 text-lg mb-4">{example.description}</p>
                    {example.docLink && (
                      <a
                        href={example.docLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 mb-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-3 h-3" />
                        View Documentation
                      </a>
                    )}
                    
                    <div className="flex items-center gap-2 mb-2">
                      <Monitor className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-purple-300 font-semibold">You interact here:</span>
                      <span className="text-sm text-slate-400">{example.interactionPoint}</span>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      {example.needsCredentials ? (
                        <>
                          <Key className="w-4 h-4 text-amber-400" />
                          <span className="text-sm text-amber-300 font-semibold">Credentials:</span>
                          <span className="text-sm text-slate-400">{example.credentialType}</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-sm text-green-300 font-semibold">No credentials needed</span>
                        </>
                      )}
                    </div>

                    <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700 mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Setup (one-time):</p>
                          <p className="text-sm text-slate-300 font-semibold">{example.setupRole}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Everyday use:</p>
                          <p className="text-sm text-green-300 font-semibold">{example.everydayRole}</p>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-slate-700">
                        <p className="text-xs text-slate-400">
                          <strong className="text-green-300">For non-technical users:</strong> {example.setupRole} does the setup; you just use it in {example.interactionPoint}. No coding required.
                        </p>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="mt-8 pt-8 border-t border-slate-700 space-y-4 animate-in fade-in duration-300">
                        <h4 className="text-lg font-semibold text-purple-300 mb-4">Step-by-Step Flow:</h4>
                        <div className="space-y-3">
                          {example.steps.map((step, stepIndex) => (
                            <div key={stepIndex} className="flex items-start gap-4 bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                {stepIndex + 1}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-purple-300 mb-1">{step.actor}</p>
                                <p className="text-slate-300">{step.action}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 text-purple-400 mt-6 pt-4 border-t border-slate-700/50">
                          <CheckCircle2 className="w-5 h-5" />
                          <span className="font-medium">Click to collapse</span>
                        </div>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-blue-500/30">
              <h3 className="text-2xl font-semibold text-white mb-4">The Magic Moment</h3>
              <p className="text-lg text-slate-300 leading-relaxed mb-4">
                Instead of you copying data from your database, pasting it to AI, getting a response, then manually updating your database... the AI just does it all automatically through MCP.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                It's like having an assistant who can actually open your filing cabinet, read the files, and update them - not just someone you have to dictate everything to.
              </p>
            </div>
          </div>
        )}

        {/* Section 5: MCP Servers Directory */}
        {activeSection === 5 && (
          <div className="space-y-12 animate-in fade-in duration-500">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-white mb-6">MCP Servers Directory</h2>
              <p className="text-xl text-slate-300 leading-relaxed mb-4">
                Explore available MCP servers to connect AI to your tools and data
              </p>
              <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-500/30">
                <p className="text-blue-200 text-sm">
                  <strong>📚 Always up-to-date:</strong> For the complete, live list of all MCP servers, visit the{' '}
                  <a href="https://github.com/modelcontextprotocol/servers" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 underline">
                    official MCP servers repository
                  </a>
                </p>
              </div>
            </div>

            {/* Reference Servers */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-6 border border-purple-500/30">
                <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Server className="w-6 h-6 text-purple-400" />
                  Official Reference Servers
                </h3>
                <p className="text-slate-300 mb-6">Maintained by the MCP team to demonstrate features and best practices</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <a href="https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem" target="_blank" rel="noopener noreferrer" className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 hover:border-purple-500 transition-all group">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-white group-hover:text-purple-300">Filesystem</h4>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-purple-400" />
                    </div>
                    <p className="text-sm text-slate-400">Secure file operations with configurable access controls</p>
                  </a>
                  <a href="https://github.com/modelcontextprotocol/servers/tree/main/src/git" target="_blank" rel="noopener noreferrer" className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 hover:border-purple-500 transition-all group">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-white group-hover:text-purple-300">Git</h4>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-purple-400" />
                    </div>
                    <p className="text-sm text-slate-400">Tools to read, search, and manipulate Git repositories</p>
                  </a>
                  <a href="https://github.com/modelcontextprotocol/servers/tree/main/src/fetch" target="_blank" rel="noopener noreferrer" className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 hover:border-purple-500 transition-all group">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-white group-hover:text-purple-300">Fetch</h4>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-purple-400" />
                    </div>
                    <p className="text-sm text-slate-400">Web content fetching and conversion for efficient LLM usage</p>
                  </a>
                  <a href="https://github.com/modelcontextprotocol/servers/tree/main/src/memory" target="_blank" rel="noopener noreferrer" className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 hover:border-purple-500 transition-all group">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-white group-hover:text-purple-300">Memory</h4>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-purple-400" />
                    </div>
                    <p className="text-sm text-slate-400">Knowledge graph-based persistent memory system</p>
                  </a>
                  <a href="https://github.com/modelcontextprotocol/servers/tree/main/src/sequential-thinking" target="_blank" rel="noopener noreferrer" className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 hover:border-purple-500 transition-all group">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-white group-hover:text-purple-300">Sequential Thinking</h4>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-purple-400" />
                    </div>
                    <p className="text-sm text-slate-400">Dynamic and reflective problem-solving through thought sequences</p>
                  </a>
                  <a href="https://github.com/modelcontextprotocol/servers/tree/main/src/time" target="_blank" rel="noopener noreferrer" className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 hover:border-purple-500 transition-all group">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-white group-hover:text-purple-300">Time</h4>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-purple-400" />
                    </div>
                    <p className="text-sm text-slate-400">Time and timezone conversion capabilities</p>
                  </a>
                </div>
              </div>

              {/* Popular Third-Party Servers */}
              <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-6 border border-blue-500/30">
                <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Package className="w-6 h-6 text-blue-400" />
                  Popular Third-Party Servers
                </h3>
                <p className="text-slate-300 mb-6">Production-ready MCP servers from companies and the community</p>
                <div className="grid md:grid-cols-3 gap-4">
                  <a href="https://github.com/zencoderai/slack-mcp-server" target="_blank" rel="noopener noreferrer" className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 hover:border-blue-500 transition-all group">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-white group-hover:text-blue-300">Slack</h4>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-400" />
                    </div>
                    <p className="text-sm text-slate-400">Channel management and messaging</p>
                  </a>
                  <a href="https://github.com/microsoft/azure-devops-mcp" target="_blank" rel="noopener noreferrer" className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 hover:border-blue-500 transition-all group">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-white group-hover:text-blue-300">Azure DevOps</h4>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-400" />
                    </div>
                    <p className="text-sm text-slate-400">Repos, work items, builds, releases</p>
                  </a>
                  <a href="https://www.atlassian.com/platform/remote-mcp-server" target="_blank" rel="noopener noreferrer" className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 hover:border-blue-500 transition-all group">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-white group-hover:text-blue-300">Atlassian</h4>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-400" />
                    </div>
                    <p className="text-sm text-slate-400">Jira work items and Confluence pages</p>
                  </a>
                  <a href="https://github.com/awslabs/mcp" target="_blank" rel="noopener noreferrer" className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 hover:border-blue-500 transition-all group">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-white group-hover:text-blue-300">AWS</h4>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-400" />
                    </div>
                    <p className="text-sm text-slate-400">AWS services and best practices</p>
                  </a>
                  <a href="https://github.com/microsoft/mcp/tree/main/servers/azure" target="_blank" rel="noopener noreferrer" className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 hover:border-blue-500 transition-all group">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-white group-hover:text-blue-300">Azure</h4>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-400" />
                    </div>
                    <p className="text-sm text-slate-400">Azure Storage, Cosmos DB, CLI</p>
                  </a>
                  <a href="https://github.com/datastax/astra-db-mcp" target="_blank" rel="noopener noreferrer" className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 hover:border-blue-500 transition-all group">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-white group-hover:text-blue-300">Astra DB</h4>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-400" />
                    </div>
                    <p className="text-sm text-slate-400">DataStax NoSQL database operations</p>
                  </a>
                  <a href="https://github.com/box-community/mcp-server-box" target="_blank" rel="noopener noreferrer" className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 hover:border-blue-500 transition-all group">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-white group-hover:text-blue-300">Box</h4>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-400" />
                    </div>
                    <p className="text-sm text-slate-400">Content management with Box AI</p>
                  </a>
                  <a href="https://github.com/apify/apify-mcp-server" target="_blank" rel="noopener noreferrer" className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 hover:border-blue-500 transition-all group">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-white group-hover:text-blue-300">Apify</h4>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-400" />
                    </div>
                    <p className="text-sm text-slate-400">6,000+ web scraping tools</p>
                  </a>
                  <a href="https://github.com/apollographql/apollo-mcp-server" target="_blank" rel="noopener noreferrer" className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 hover:border-blue-500 transition-all group">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-white group-hover:text-blue-300">Apollo GraphQL</h4>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-400" />
                    </div>
                    <p className="text-sm text-slate-400">Connect GraphQL APIs to AI agents</p>
                  </a>
                </div>
              </div>

              {/* Categories Overview */}
              <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-6 border border-green-500/30">
                <h3 className="text-2xl font-semibold text-white mb-4">Server Categories</h3>
                <p className="text-slate-300 mb-6">MCP servers are available for many different use cases:</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <h4 className="font-semibold text-green-300 mb-2">📁 Files & Storage</h4>
                    <p className="text-xs text-slate-400">Filesystem, Google Drive, Box, Dropbox, S3</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <h4 className="font-semibold text-blue-300 mb-2">💻 Developer Tools</h4>
                    <p className="text-xs text-slate-400">GitHub, GitLab, Azure DevOps, Bitbucket</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <h4 className="font-semibold text-purple-300 mb-2">💬 Communication</h4>
                    <p className="text-xs text-slate-400">Slack, Discord, Email, Teams</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <h4 className="font-semibold text-cyan-300 mb-2">🗄️ Databases</h4>
                    <p className="text-xs text-slate-400">PostgreSQL, MySQL, MongoDB, Redis</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <h4 className="font-semibold text-pink-300 mb-2">🎨 Design & Creative</h4>
                    <p className="text-xs text-slate-400">Figma, Canva, Image generation</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <h4 className="font-semibold text-amber-300 mb-2">📊 Analytics & Data</h4>
                    <p className="text-xs text-slate-400">Snowflake, BigQuery, Amplitude</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <h4 className="font-semibold text-orange-300 mb-2">☁️ Cloud Platforms</h4>
                    <p className="text-xs text-slate-400">AWS, Azure, Google Cloud, Kubernetes</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <h4 className="font-semibold text-rose-300 mb-2">🔧 Productivity</h4>
                    <p className="text-xs text-slate-400">Notion, Airtable, Calendars, Tasks</p>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border border-purple-500/30 text-center">
                <h3 className="text-2xl font-semibold text-white mb-4">Explore Hundreds More</h3>
                <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                  The MCP ecosystem includes hundreds of servers for databases, APIs, cloud services, productivity tools, and more. New servers are added regularly by the community.
                </p>
                <a
                  href="https://github.com/modelcontextprotocol/servers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
                >
                  <ExternalLink className="w-5 h-5" />
                  Browse Full MCP Servers Directory
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Section 6: Two Real Flows */}
        {activeSection === 6 && (
          <div className="space-y-12 animate-in fade-in duration-500">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-white mb-6">Two Real Flows: Tech vs Non-Technical</h2>
              <p className="text-xl text-slate-300 leading-relaxed">
                See exactly how MCP works for different roles - what apps and tools each person uses
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column: Technical Person Flow */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-2xl p-6 border border-blue-500/30">
                  <h3 className="text-2xl font-semibold text-white mb-3">👨‍💻 Technical Person (Engineer / IT)</h3>
                  <p className="text-slate-400 mb-6">How they build and set up MCP (usually done once)</p>
                  
                  <div className="space-y-4">
                    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">1</div>
                        <div>
                          <h4 className="font-semibold text-white mb-1">Pick what to connect</h4>
                          <p className="text-sm text-slate-400">Decides: "We want Claude to talk to our customer database (Postgres) and GitHub repos"</p>
                          <p className="text-xs text-blue-300 mt-2">Tools: Planning doc, ticketing system</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">2</div>
                        <div>
                          <h4 className="font-semibold text-white mb-1">Choose or build MCP server</h4>
                          <p className="text-sm text-slate-400">Finds existing "database MCP server" or writes code to build one</p>
                          <p className="text-xs text-blue-300 mt-2">Tools: Terminal, code editor, GitHub</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">3</div>
                        <div>
                          <h4 className="font-semibold text-white mb-1">Configure the MCP server</h4>
                          <p className="text-sm text-slate-400">Adds database URL, password, GitHub token, etc.</p>
                          <p className="text-xs text-blue-300 mt-2">Tools: Config files, environment variables, cloud console</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">4</div>
                        <div>
                          <h4 className="font-semibold text-white mb-1">Connect to AI app</h4>
                          <p className="text-sm text-slate-400">Registers MCP server in Claude Desktop config or internal AI app</p>
                          <p className="text-xs text-blue-300 mt-2">Apps: Claude Desktop, VSCode, custom AI chat app</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">5</div>
                        <div>
                          <h4 className="font-semibold text-white mb-1">Test and hand off</h4>
                          <p className="text-sm text-slate-400">Opens Claude, types "Show me customers from last week", checks it works, tells team "You can now ask Claude about the customer DB"</p>
                          <p className="text-xs text-blue-300 mt-2">Apps: Claude Desktop, Slack (to notify team)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Non-Technical Person Flow */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-6 border border-green-500/30">
                  <h3 className="text-2xl font-semibold text-white mb-3">👩‍🎨 Non-Technical Person (Designer / PM)</h3>
                  <p className="text-slate-400 mb-6">How they see and use it (no coding required)</p>
                  
                  <div className="space-y-4">
                    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">1</div>
                        <div>
                          <h4 className="font-semibold text-white mb-1">Your team already set it up</h4>
                          <p className="text-sm text-slate-400">Your engineer/IT team (or plugin vendor) already did steps 1-5 from the left side</p>
                          <p className="text-xs text-green-300 mt-2">You don't see this happen - it's done behind the scenes</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">2</div>
                        <div>
                          <h4 className="font-semibold text-white mb-1">You see a normal app or plugin</h4>
                          <p className="text-sm text-slate-400">You open Figma and see a plugin called "Design System Assistant", or Claude Desktop that "knows about customers", or a Slack bot</p>
                          <p className="text-xs text-green-300 mt-2">Apps: Figma, Claude Desktop, Slack, VSCode</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">3</div>
                        <div>
                          <h4 className="font-semibold text-white mb-1">Tiny setup you might do</h4>
                          <p className="text-sm text-slate-400">Click "Install plugin" in Figma, or "Authorize Slack workspace", or "Connect to this project" - just normal app permissions, no coding</p>
                          <p className="text-xs text-green-300 mt-2">Just clicking buttons in familiar apps</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">4</div>
                        <div>
                          <h4 className="font-semibold text-white mb-1">You just use it every day</h4>
                          <p className="text-sm text-slate-400 mb-2">Examples:</p>
                          <ul className="text-xs text-slate-400 space-y-1">
                            <li>• In Figma: "Highlight all buttons not using brand color" → MCP checks design system</li>
                            <li>• In Claude: "Summarize churned customers last month" → MCP queries database</li>
                            <li>• In Slack: "/ask-ai what's blocking the design team?" → MCP checks project tracker</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">5</div>
                        <div>
                          <h4 className="font-semibold text-white mb-1">When it breaks, ask tech person</h4>
                          <p className="text-sm text-slate-400">If something fails or you need a new data source, ping your engineer - they go back to the left-side flow</p>
                          <p className="text-xs text-green-300 mt-2">Apps: Slack, email to request help</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-purple-900/30 rounded-2xl p-6 border border-purple-500/30">
              <h3 className="text-xl font-semibold text-white mb-3 text-center">🔑 Key Takeaway</h3>
              <p className="text-slate-300 text-center max-w-3xl mx-auto">
                <strong>Technical setup</strong> (left side) happens once by engineers/IT. <strong>Everyday use</strong> (right side) is for everyone - designers, PMs, support, analysts. You just type in apps you already know. No terminal, no config files, no coding.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 bg-slate-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-slate-400 mb-4">
            Want to learn more? Check out the official MCP documentation
          </p>
          <a
            href="https://modelcontextprotocol.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium"
          >
            Visit modelcontextprotocol.io
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default App

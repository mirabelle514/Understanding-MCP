import { useState, useRef, useEffect } from 'react'
import { Sparkles, Database, FileText, Github, MessageSquare, Zap, ArrowRight, Play, CheckCircle2, Plug2, Brain, Server, Code2, Figma, Monitor, Settings, Key, Shield, User, MessageCircle, CheckCircle, ExternalLink, Package, GitBranch, Globe, Rocket, Lightbulb, Layers, Lock, Network, Terminal, Building2, Cpu, Users, Calendar, Headphones, Send, X, Bot, Loader2 } from 'lucide-react'
import './App.css'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

function App() {
  const [activeSection, setActiveSection] = useState(0)
  const [selectedExample, setSelectedExample] = useState<number | null>(null)
  const [showDemo, setShowDemo] = useState(false)
  const [demoStep, setDemoStep] = useState(0)
  const [selectedClient, setSelectedClient] = useState<'claude' | 'vscode' | 'figma' | null>(null)
  const [showChat, setShowChat] = useState(false)
  const [chatInput, setChatInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [chatMessages, setChatMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: 'Hi! I\'m an AI assistant here to answer your questions about MCP (Model Context Protocol). Ask me anything!' }
  ])
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  const handleSendMessage = async () => {
    if (!chatInput.trim() || isLoading) return

    const userMessage = chatInput.trim()
    const newUserMessage: ChatMessage = { role: 'user', content: userMessage }
    setChatMessages(prev => [...prev, newUserMessage])
    setChatInput('')
    setIsLoading(true)

    try {
      const messagesForApi: ChatMessage[] = [...chatMessages.filter(m => m.role !== 'assistant' || chatMessages.indexOf(m) !== 0), newUserMessage]
      
      const response = await fetch('/api/mcp-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: messagesForApi }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      setChatMessages(prev => [...prev, { role: 'assistant', content: data.message }])
    } catch (error) {
      console.error('Error sending message:', error)
      setChatMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }])
    } finally {
      setIsLoading(false)
    }
  }

  const clientDetails = {
    claude: {
      title: 'Claude Desktop',
      icon: MessageCircle,
      color: 'from-purple-500 to-pink-500',
      description: 'Chat window where you type',
      fullDescription: 'Claude Desktop is Anthropic\'s official desktop app. It\'s like ChatGPT but with MCP superpowers - it can connect to your local files, databases, and other tools.',
      examples: [
        '"Show me all customers from Europe" → MCP queries your database',
        '"Summarize the Q3 report" → MCP reads your local files',
        '"What meetings do I have today?" → MCP checks your calendar'
      ],
      setupInfo: 'Engineers configure MCP servers in Claude\'s config file. Once set up, you just chat normally.'
    },
    vscode: {
      title: 'VSCode',
      icon: Code2,
      color: 'from-blue-500 to-indigo-500',
      description: 'AI chat panel in your editor',
      fullDescription: 'VSCode with AI extensions (like GitHub Copilot Chat or Continue) can use MCP to understand your entire codebase, not just the file you\'re looking at.',
      examples: [
        '"Find all TODO comments" → MCP scans your entire project',
        '"What does the checkout function do?" → MCP reads related files',
        '"Create a PR for this fix" → MCP interacts with GitHub'
      ],
      setupInfo: 'Extensions handle MCP configuration. You just install the extension and start chatting.'
    },
    figma: {
      title: 'Figma Plugin',
      icon: Figma,
      color: 'from-pink-500 to-rose-500',
      description: 'AI sidebar in your design',
      fullDescription: 'Figma plugins with MCP can analyze your designs, check for inconsistencies, and even sync changes to code repositories.',
      examples: [
        '"List buttons with wrong colors" → MCP analyzes your design system',
        '"Check accessibility contrast" → MCP scans all text layers',
        '"Export tokens to GitHub" → MCP syncs to your repo'
      ],
      setupInfo: 'Plugin developers set up MCP. You just install the plugin and use it in your designs.'
    }
  }

  const demoSteps = [
    { label: 'You type a question', detail: '"Show me all customers from Europe"', icon: User, color: 'from-purple-500 to-pink-500' },
    { label: 'AI decides to use MCP', detail: 'Claude recognizes it needs database access', icon: Brain, color: 'from-blue-500 to-cyan-500' },
    { label: 'MCP connects to your tool', detail: 'Database server runs the query', icon: Server, color: 'from-green-500 to-emerald-500' },
    { label: 'You see the results', detail: 'A formatted table appears in chat', icon: CheckCircle2, color: 'from-amber-500 to-orange-500' }
  ]

  const sections = [
    { id: 0, title: 'What is MCP?', icon: Sparkles },
    { id: 1, title: 'Where You See & Use It', icon: Monitor },
    { id: 2, title: 'Setup Flow', icon: Settings },
    { id: 3, title: 'Credentials', icon: Key },
    { id: 4, title: 'Real Examples', icon: Zap },
    { id: 5, title: 'MCP Servers Directory', icon: Package },
    { id: 6, title: 'Two Real Flows', icon: User },
    { id: 7, title: 'MCP Ecosystem', icon: Globe },
    { id: 8, title: 'Future of MCP', icon: Rocket },
    { id: 9, title: 'Why It Matters', icon: Lightbulb }
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
    setShowDemo(true)
    setDemoStep(0)
    // Auto-advance through demo steps
    let step = 0
    const interval = setInterval(() => {
      step++
      if (step < demoSteps.length) {
        setDemoStep(step)
      } else {
        clearInterval(interval)
      }
    }, 1500)
  }

  const closeDemo = () => {
    setShowDemo(false)
    setDemoStep(0)
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

      {/* Interactive Demo Modal */}
      {showDemo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 rounded-2xl p-8 max-w-2xl w-full mx-4 border border-purple-500/30 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">How MCP Works</h3>
              <button
                onClick={closeDemo}
                className="text-slate-400 hover:text-white transition-colors text-2xl"
              >
                &times;
              </button>
            </div>
            
            <div className="space-y-4">
              {demoSteps.map((step, index) => {
                const StepIcon = step.icon
                const isActive = index <= demoStep
                const isCurrent = index === demoStep
                return (
                  <div
                    key={index}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ${
                      isActive 
                        ? `bg-gradient-to-r ${step.color} shadow-lg` 
                        : 'bg-slate-800/50 opacity-40'
                    } ${isCurrent ? 'scale-105' : ''}`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isActive ? 'bg-white/20' : 'bg-slate-700'
                    }`}>
                      <StepIcon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${isActive ? 'text-white/80' : 'text-slate-500'}`}>
                          Step {index + 1}
                        </span>
                        {isActive && index < demoStep && (
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <p className={`font-semibold ${isActive ? 'text-white' : 'text-slate-400'}`}>
                        {step.label}
                      </p>
                      <p className={`text-sm ${isActive ? 'text-white/80' : 'text-slate-500'}`}>
                        {step.detail}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 flex gap-4">
              <button
                onClick={() => {
                  setDemoStep(0)
                  let step = 0
                  const interval = setInterval(() => {
                    step++
                    if (step < demoSteps.length) {
                      setDemoStep(step)
                    } else {
                      clearInterval(interval)
                    }
                  }, 1500)
                }}
                className="flex-1 px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors"
              >
                Replay Demo
              </button>
              <button
                onClick={() => {
                  closeDemo()
                  setActiveSection(1)
                  setTimeout(() => window.scrollTo({ top: 400, behavior: 'smooth' }), 100)
                }}
                className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
              >
                Explore More
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Conceptual Banner */}
      <div className="bg-blue-900/30 border-b border-blue-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <p className="text-center text-blue-200 text-sm">
            <strong>Learning Demo:</strong> This site explains MCP concepts - it doesn't connect to real tools or data. It's for understanding the flows.
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

            {/* Model / Context / Protocol Breakdown */}
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border border-blue-500/30">
              <h3 className="text-2xl font-semibold text-white mb-6">Breaking Down "MCP"</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
                  <div className="text-3xl font-bold text-blue-400 mb-3">M</div>
                  <h4 className="text-lg font-semibold text-white mb-2">Model</h4>
                  <p className="text-slate-400 text-sm">
                    The AI brain (like Claude or GPT-4) that understands your questions and generates responses
                  </p>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
                  <div className="text-3xl font-bold text-cyan-400 mb-3">C</div>
                  <h4 className="text-lg font-semibold text-white mb-2">Context</h4>
                  <p className="text-slate-400 text-sm">
                    The extra information the AI needs - your documents, databases, files, or any data that helps it give meaningful answers
                  </p>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
                  <div className="text-3xl font-bold text-purple-400 mb-3">P</div>
                  <h4 className="text-lg font-semibold text-white mb-2">Protocol</h4>
                  <p className="text-slate-400 text-sm">
                    The rules and standards that let the Model access and use that Context - like a shared language everyone agrees to speak
                  </p>
                </div>
              </div>
            </div>

            {/* Client vs Server */}
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border border-green-500/30">
              <h3 className="text-2xl font-semibold text-white mb-6">The Two Sides of MCP</h3>
              <p className="text-slate-300 mb-6">Every MCP connection has two parts working together:</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-xl font-semibold text-white">MCP Client</h4>
                  </div>
                  <p className="text-slate-400 mb-4">The app where you chat with AI</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span>Claude Desktop</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span>Cursor (code editor)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span>Custom AI chatbots</span>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <Database className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-xl font-semibold text-white">MCP Server</h4>
                  </div>
                  <p className="text-slate-400 mb-4">The connector to your tools and data</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span>Google Drive, Dropbox</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span>GitHub, databases</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span>Local files on your computer</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <p className="text-center text-slate-300 text-sm">
                  <strong className="text-green-300">Simple version:</strong> Client = where you type. Server = what the AI connects to.
                </p>
              </div>
            </div>

            {/* For Technical Folks: MCP vs LSP */}
            <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-600">
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="w-5 h-5 text-slate-400" />
                <h4 className="text-lg font-semibold text-slate-300">For Technical Folks: MCP vs LSP</h4>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                MCP was inspired by the Language Server Protocol (LSP) used in code editors. But while LSP is <em>reactive</em> (responding to what you type), MCP is <em>agent-centric</em>: AI agents can autonomously decide which tools to use, in what order, and how to chain them together. MCP also supports human-in-the-loop workflows where you approve actions before they execute.
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
                  <strong>If you're a designer or PM:</strong> This is your world. You live here. Everything under "Setup Flow" and the technical side of "Two Real Flows" is done for you by someone else.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {(['claude', 'vscode', 'figma'] as const).map((clientKey) => {
                const client = clientDetails[clientKey]
                const ClientIcon = client.icon
                const isExpanded = selectedClient === clientKey
                return (
                  <div key={clientKey} className="relative">
                    <button
                      onClick={() => setSelectedClient(isExpanded ? null : clientKey)}
                      className={`w-full bg-slate-800/50 backdrop-blur rounded-2xl p-8 border transition-all duration-300 text-left ${
                        isExpanded 
                          ? 'border-purple-500 ring-2 ring-purple-500/30' 
                          : 'border-slate-700 hover:border-purple-500/50'
                      }`}
                    >
                      <div className={`w-16 h-16 bg-gradient-to-br ${client.color} rounded-2xl flex items-center justify-center mb-4 mx-auto`}>
                        <ClientIcon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-3 text-center">{client.title}</h3>
                      <p className="text-slate-400 text-center mb-4">{client.description}</p>
                      <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                        <p className="text-sm text-slate-300 italic">{client.examples[0].split(' → ')[0]}</p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-purple-400">
                          <ArrowRight className="w-3 h-3" />
                          <span>{client.examples[0].split(' → ')[1]}</span>
                        </div>
                      </div>
                      <p className="text-center text-xs text-purple-400 mt-4">Click to learn more</p>
                    </button>
                  </div>
                )
              })}
            </div>

            {/* Expanded Client Details */}
            {selectedClient && (
              <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border border-purple-500/30 animate-in fade-in duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    {(() => {
                      const client = clientDetails[selectedClient]
                      const ClientIcon = client.icon
                      return (
                        <>
                          <div className={`w-12 h-12 bg-gradient-to-br ${client.color} rounded-xl flex items-center justify-center`}>
                            <ClientIcon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-white">{client.title}</h3>
                            <p className="text-slate-400">{client.description}</p>
                          </div>
                        </>
                      )
                    })()}
                  </div>
                  <button
                    onClick={() => setSelectedClient(null)}
                    className="text-slate-400 hover:text-white transition-colors text-2xl"
                  >
                    &times;
                  </button>
                </div>

                <p className="text-slate-300 mb-6">{clientDetails[selectedClient].fullDescription}</p>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-3">What you can do:</h4>
                  <div className="space-y-2">
                    {clientDetails[selectedClient].examples.map((example, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <p className="text-slate-300 text-sm">{example}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                  <h4 className="text-sm font-semibold text-purple-300 mb-2">How it gets set up:</h4>
                  <p className="text-slate-400 text-sm">{clientDetails[selectedClient].setupInfo}</p>
                </div>
              </div>
            )}

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
                <h3 className="text-lg font-semibold text-amber-200 mb-3">Who is this for?</h3>
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
                  <strong>Always up-to-date:</strong> For the complete, live list of all MCP servers, visit the{' '}
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
                    <h4 className="font-semibold text-green-300 mb-2">Files & Storage</h4>
                    <p className="text-xs text-slate-400">Filesystem, Google Drive, Box, Dropbox, S3</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <h4 className="font-semibold text-blue-300 mb-2">Developer Tools</h4>
                    <p className="text-xs text-slate-400">GitHub, GitLab, Azure DevOps, Bitbucket</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <h4 className="font-semibold text-purple-300 mb-2">Communication</h4>
                    <p className="text-xs text-slate-400">Slack, Discord, Email, Teams</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <h4 className="font-semibold text-cyan-300 mb-2">Databases</h4>
                    <p className="text-xs text-slate-400">PostgreSQL, MySQL, MongoDB, Redis</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <h4 className="font-semibold text-pink-300 mb-2">Design & Creative</h4>
                    <p className="text-xs text-slate-400">Figma, Canva, Image generation</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <h4 className="font-semibold text-amber-300 mb-2">Analytics & Data</h4>
                    <p className="text-xs text-slate-400">Snowflake, BigQuery, Amplitude</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <h4 className="font-semibold text-orange-300 mb-2">Cloud Platforms</h4>
                    <p className="text-xs text-slate-400">AWS, Azure, Google Cloud, Kubernetes</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <h4 className="font-semibold text-rose-300 mb-2">Productivity</h4>
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
                  <h3 className="text-2xl font-semibold text-white mb-3">Technical Person (Engineer / IT)</h3>
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
                  <h3 className="text-2xl font-semibold text-white mb-3">Non-Technical Person (Designer / PM)</h3>
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
              <h3 className="text-xl font-semibold text-white mb-3 text-center">Key Takeaway</h3>
              <p className="text-slate-300 text-center max-w-3xl mx-auto">
                <strong>Technical setup</strong> (left side) happens once by engineers/IT. <strong>Everyday use</strong> (right side) is for everyone - designers, PMs, support, analysts. You just type in apps you already know. No terminal, no config files, no coding.
              </p>
            </div>
          </div>
        )}

        {/* Section 7: MCP Ecosystem */}
        {activeSection === 7 && (
          <div className="space-y-12 animate-in fade-in duration-500">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-white mb-6">The MCP Ecosystem</h2>
              <p className="text-xl text-slate-300 leading-relaxed">
                MCP is more than just servers - it's a growing ecosystem of clients, servers, marketplaces, and infrastructure
              </p>
            </div>

            {/* Ecosystem Layers */}
            <div className="space-y-6">
              {/* Clients Layer */}
              <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-6 border border-purple-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Monitor className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">MCP Clients</h3>
                </div>
                <p className="text-slate-300 mb-4">Apps where you interact with AI that can use MCP</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                    <h4 className="font-semibold text-purple-300 mb-2">Developer-Focused</h4>
                    <p className="text-sm text-slate-400">Cursor, VSCode with AI extensions, Windsurf, Zed - code editors with built-in AI that can connect to your tools</p>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                    <h4 className="font-semibold text-pink-300 mb-2">General Purpose</h4>
                    <p className="text-sm text-slate-400">Claude Desktop, custom chatbots - AI assistants for everyone, not just developers</p>
                  </div>
                </div>
                <div className="mt-4 bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                  <p className="text-xs text-slate-400">
                    <strong className="text-purple-300">Coming soon:</strong> Expect more business-focused clients for customer support, marketing, design, and other specialized workflows
                  </p>
                </div>
              </div>

              {/* Servers Layer */}
              <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-6 border border-blue-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Server className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">MCP Servers</h3>
                </div>
                <p className="text-slate-300 mb-4">Connectors that let AI access your tools and data</p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                    <h4 className="font-semibold text-blue-300 mb-2">Official Reference</h4>
                    <p className="text-sm text-slate-400">Filesystem, Git, Fetch, Memory - maintained by the MCP team</p>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                    <h4 className="font-semibold text-cyan-300 mb-2">Company-Built</h4>
                    <p className="text-sm text-slate-400">Slack, GitHub, AWS, Azure, Atlassian - official integrations from major platforms</p>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                    <h4 className="font-semibold text-green-300 mb-2">Community</h4>
                    <p className="text-sm text-slate-400">Hundreds of community-built servers for databases, APIs, and niche tools</p>
                  </div>
                </div>
                <div className="mt-4 bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                  <p className="text-xs text-slate-400">
                    <strong className="text-blue-300">Current state:</strong> Most servers today are local-first and single-user. Remote, multi-tenant servers are emerging.
                  </p>
                </div>
              </div>

              {/* Marketplaces Layer */}
              <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-6 border border-green-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">Marketplaces & Registries</h3>
                </div>
                <p className="text-slate-300 mb-4">Places to discover and install MCP servers</p>
                <div className="grid md:grid-cols-3 gap-4">
                  <a href="https://mcpt.mintlify.dev" target="_blank" rel="noopener noreferrer" className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 hover:border-green-500 transition-all group">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white group-hover:text-green-300">Mintlify mcpt</h4>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-green-400" />
                    </div>
                    <p className="text-sm text-slate-400">MCP server registry and discovery</p>
                  </a>
                  <a href="https://smithery.ai" target="_blank" rel="noopener noreferrer" className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 hover:border-green-500 transition-all group">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white group-hover:text-green-300">Smithery</h4>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-green-400" />
                    </div>
                    <p className="text-sm text-slate-400">MCP server hosting and marketplace</p>
                  </a>
                  <a href="https://opentools.ai" target="_blank" rel="noopener noreferrer" className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 hover:border-green-500 transition-all group">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white group-hover:text-green-300">OpenTools</h4>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-green-400" />
                    </div>
                    <p className="text-sm text-slate-400">AI tool discovery platform</p>
                  </a>
                </div>
                <div className="mt-4 bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                  <p className="text-xs text-slate-400">
                    <strong className="text-green-300">Why this matters:</strong> Today, finding MCP servers means hunting through GitHub. Marketplaces will make it as easy as installing an app from an app store.
                  </p>
                </div>
              </div>

              {/* Infrastructure Layer */}
              <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 rounded-2xl p-6 border border-amber-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <Layers className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">Infrastructure & Tooling</h3>
                </div>
                <p className="text-slate-300 mb-4">Tools that help build, host, and manage MCP servers</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                    <h4 className="font-semibold text-amber-300 mb-2">Server Generation</h4>
                    <p className="text-sm text-slate-400">Mintlify, Stainless, Speakeasy - tools that auto-generate MCP servers from existing APIs and documentation</p>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                    <h4 className="font-semibold text-orange-300 mb-2">Hosting & Management</h4>
                    <p className="text-sm text-slate-400">Cloudflare, Smithery, Toolbase - platforms for deploying servers and managing connections</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ecosystem Visual */}
            <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700">
              <h3 className="text-2xl font-semibold text-white mb-6 text-center">How It All Connects</h3>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <div className="bg-purple-500/20 rounded-xl p-4 border border-purple-500/30 text-center min-w-[120px]">
                  <Monitor className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <p className="text-sm text-purple-300 font-semibold">You</p>
                  <p className="text-xs text-slate-400">Use a Client</p>
                </div>
                <ArrowRight className="w-6 h-6 text-slate-500" />
                <div className="bg-blue-500/20 rounded-xl p-4 border border-blue-500/30 text-center min-w-[120px]">
                  <Server className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <p className="text-sm text-blue-300 font-semibold">MCP Server</p>
                  <p className="text-xs text-slate-400">Found via Registry</p>
                </div>
                <ArrowRight className="w-6 h-6 text-slate-500" />
                <div className="bg-green-500/20 rounded-xl p-4 border border-green-500/30 text-center min-w-[120px]">
                  <Database className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <p className="text-sm text-green-300 font-semibold">Your Tools</p>
                  <p className="text-xs text-slate-400">Data & APIs</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 8: Future of MCP */}
        {activeSection === 8 && (
          <div className="space-y-12 animate-in fade-in duration-500">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-white mb-6">The Future of MCP</h2>
              <p className="text-xl text-slate-300 leading-relaxed">
                MCP is still evolving. Here's what's being worked on and what challenges remain.
              </p>
            </div>

            {/* Current Limitations */}
            <div className="bg-amber-900/20 rounded-2xl p-6 border border-amber-500/30">
              <h3 className="text-xl font-semibold text-amber-200 mb-4">What's Still Being Figured Out</h3>
              <p className="text-slate-300 mb-4">MCP is powerful but still early. These are the areas actively being improved:</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Hosting & Multi-tenancy */}
              <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-white">Hosting & Multi-tenancy</h4>
                </div>
                <p className="text-slate-400 text-sm mb-3">
                  <strong className="text-blue-300">Today:</strong> Most MCP servers run locally on your computer, for one user at a time.
                </p>
                <p className="text-slate-400 text-sm">
                  <strong className="text-cyan-300">Future:</strong> Remote servers that many users can share, like how you use Google Docs - everyone connects to the same service.
                </p>
              </div>

              {/* Authentication */}
              <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Lock className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-white">Authentication</h4>
                </div>
                <p className="text-slate-400 text-sm mb-3">
                  <strong className="text-purple-300">Today:</strong> Each MCP server handles login differently. No standard way to authenticate.
                </p>
                <p className="text-slate-400 text-sm">
                  <strong className="text-pink-300">Future:</strong> Unified login flows (like "Sign in with Google") that work across all MCP servers.
                </p>
              </div>

              {/* Authorization */}
              <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-white">Fine-Grained Permissions</h4>
                </div>
                <p className="text-slate-400 text-sm mb-3">
                  <strong className="text-green-300">Today:</strong> Access is all-or-nothing. If you can use a tool, you can use all of it.
                </p>
                <p className="text-slate-400 text-sm">
                  <strong className="text-emerald-300">Future:</strong> Granular controls - "AI can read my calendar but not delete events."
                </p>
              </div>

              {/* Gateway */}
              <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <Network className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-white">MCP Gateway</h4>
                </div>
                <p className="text-slate-400 text-sm mb-3">
                  <strong className="text-amber-300">Today:</strong> Each client connects directly to each server. Gets messy with many connections.
                </p>
                <p className="text-slate-400 text-sm">
                  <strong className="text-orange-300">Future:</strong> A central gateway that manages all connections, security, and routing in one place.
                </p>
              </div>

              {/* Workflow Execution */}
              <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-red-500 rounded-lg flex items-center justify-center">
                    <Cpu className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-white">Multi-Step Workflows</h4>
                </div>
                <p className="text-slate-400 text-sm mb-3">
                  <strong className="text-rose-300">Today:</strong> If a multi-step task fails halfway, you often have to start over.
                </p>
                <p className="text-slate-400 text-sm">
                  <strong className="text-red-300">Future:</strong> Built-in support for resuming, retrying, and managing long-running tasks.
                </p>
              </div>

              {/* Debugging */}
              <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-lg flex items-center justify-center">
                    <Terminal className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-white">Debugging & Consistency</h4>
                </div>
                <p className="text-slate-400 text-sm mb-3">
                  <strong className="text-indigo-300">Today:</strong> Same server can behave differently in different clients. Hard to troubleshoot.
                </p>
                <p className="text-slate-400 text-sm">
                  <strong className="text-violet-300">Future:</strong> Better debugging tools and more consistent behavior across all clients.
                </p>
              </div>
            </div>

            {/* For Technical Folks: Try It Yourself */}
            <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-600">
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="w-5 h-5 text-slate-400" />
                <h4 className="text-lg font-semibold text-slate-300">For Technical Folks: Try It Yourself</h4>
              </div>
              <p className="text-slate-400 text-sm mb-4">
                Want to build your own MCP server? Here are some starter projects you can try in Claude Desktop:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                  <p className="text-sm text-slate-300">Create a custom greeting server</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                  <p className="text-sm text-slate-300">Count files on your desktop</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                  <p className="text-sm text-slate-300">Save chat conversations locally</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                  <p className="text-sm text-slate-300">Ask questions about local PDFs</p>
                </div>
              </div>
              <p className="text-slate-500 text-xs">
                These tasks require Python, the MCP library, and Claude Desktop. See the{' '}
                <a href="https://modelcontextprotocol.io/quickstart" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline">
                  official MCP quickstart guide
                </a>{' '}
                for setup instructions.
              </p>
            </div>
          </div>
        )}

        {/* Section 9: Why It Matters */}
        {activeSection === 9 && (
          <div className="space-y-12 animate-in fade-in duration-500">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-white mb-6">Why MCP Matters for Your Organization</h2>
              <p className="text-xl text-slate-300 leading-relaxed">
                MCP isn't just a technical protocol - it's changing how AI tools are built, sold, and used
              </p>
            </div>

            {/* Key Implications */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-6 border border-purple-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-white">Tools Become Modular</h4>
                </div>
                <p className="text-slate-300 text-sm">
                  Instead of building one big AI app that does everything, companies can build small, focused MCP servers. Users mix and match the tools they need. Think app store, but for AI capabilities.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-6 border border-blue-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-white">Documentation Matters More</h4>
                </div>
                <p className="text-slate-300 text-sm">
                  AI agents will choose tools based on how well they're documented. Clear, machine-readable docs (like llms.txt) become a competitive advantage. Good docs = more AI usage.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-6 border border-green-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-white">Dynamic Tool Selection</h4>
                </div>
                <p className="text-slate-300 text-sm">
                  AI agents may start picking tools dynamically based on speed, cost, and relevance - not just what's installed. This could lead to more market-driven tool adoption.
                </p>
              </div>

              <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 rounded-2xl p-6 border border-amber-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <Layers className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-white">APIs Evolve Into Tools</h4>
                </div>
                <p className="text-slate-300 text-sm">
                  APIs alone aren't enough anymore. MCP tools are higher-level abstractions designed for AI agents - instead of "send_email()", think "draft_and_send_email()" that handles multiple steps.
                </p>
              </div>
            </div>

            {/* Applications Section */}
            <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700">
              <h3 className="text-2xl font-semibold text-white mb-6">New Possibilities MCP Enables</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-700">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mb-3">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">Multi-Step Projects</h4>
                  <p className="text-slate-400 text-sm">
                    Plan an event by having AI coordinate across calendar, email, docs, and task management - all in one conversation.
                  </p>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-700">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-3">
                    <Cpu className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">Smart Environments</h4>
                  <p className="text-slate-400 text-sm">
                    AI that interacts with IoT devices - "Turn off office lights at 9pm if no meetings are scheduled."
                  </p>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-700">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-3">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">Collaborating Agents</h4>
                  <p className="text-slate-400 text-sm">
                    Multiple AI agents sharing information and coordinating tasks without needing custom integrations between them.
                  </p>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-700">
                  <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-red-500 rounded-lg flex items-center justify-center mb-3">
                    <Headphones className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">Enhanced Support</h4>
                  <p className="text-slate-400 text-sm">
                    Customer support AI that can access ticketing systems, CRM, and knowledge bases to provide context-aware help.
                  </p>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-700">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center mb-3">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">Personal Assistants</h4>
                  <p className="text-slate-400 text-sm">
                    AI assistants that securely access your personal data (notes, files, preferences) without exposing it to third parties.
                  </p>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-700">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-3">
                    <Figma className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">Design Automation</h4>
                  <p className="text-slate-400 text-sm">
                    AI that can read your design system, check for inconsistencies, and even sync changes to code repositories.
                  </p>
                </div>
              </div>
            </div>

            {/* For Different Roles */}
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border border-purple-500/30">
              <h3 className="text-2xl font-semibold text-white mb-6">What This Means for You</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-700">
                  <h4 className="font-semibold text-purple-300 mb-3">For Designers</h4>
                  <p className="text-slate-400 text-sm">
                    AI tools that actually understand your design system and can help maintain consistency. Less manual checking, more creative work.
                  </p>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-700">
                  <h4 className="font-semibold text-pink-300 mb-3">For Product Managers</h4>
                  <p className="text-slate-400 text-sm">
                    Think about "features" as "tools available to AI agents." What capabilities should your product expose via MCP?
                  </p>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-700">
                  <h4 className="font-semibold text-blue-300 mb-3">For Organizations</h4>
                  <p className="text-slate-400 text-sm">
                    MCP could change how you buy and integrate software. Instead of big suites, you might assemble AI-powered workflows from modular tools.
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700 text-center">
              <h3 className="text-2xl font-semibold text-white mb-4">Stay Informed</h3>
              <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                MCP is evolving rapidly. The best way to stay current is to follow the official documentation and community.
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <a
                  href="https://modelcontextprotocol.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
                >
                  <ExternalLink className="w-5 h-5" />
                  Official MCP Docs
                </a>
                <a
                  href="https://github.com/modelcontextprotocol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 text-white rounded-lg font-semibold hover:bg-slate-600 transition-all"
                >
                  <Github className="w-5 h-5" />
                  GitHub Organization
                </a>
              </div>
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

      {/* AI Chat Assistant */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-50"
        aria-label="Open AI Chat"
      >
        {showChat ? <X className="w-6 h-6 text-white" /> : <Bot className="w-6 h-6 text-white" />}
      </button>

      {showChat && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] bg-slate-900 rounded-2xl shadow-2xl border border-purple-500/30 z-50 flex flex-col max-h-[500px]">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-t-2xl">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <Bot className="w-5 h-5" />
              MCP AI Assistant
            </h3>
            <p className="text-white/80 text-sm">Powered by AI - Ask me anything about MCP!</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[200px] max-h-[300px]">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-purple-500 text-white rounded-br-md'
                      : 'bg-slate-800 text-slate-200 rounded-bl-md'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] p-3 rounded-2xl bg-slate-800 text-slate-200 rounded-bl-md">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <p className="text-sm">Thinking about MCP...</p>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 border-t border-slate-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                placeholder="Ask about MCP..."
                className="flex-1 bg-slate-800 text-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-slate-500"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading}
                className="bg-purple-500 hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-xl transition-colors"
                aria-label="Send message"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-2 text-center">
              Ask any question about MCP
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

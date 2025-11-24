# Understanding MCP

An interactive web application that explains the Model Context Protocol (MCP) to designers and non-technical people using visual flows, real-world examples, and clear language.

## Author

**Mirabelle Doiron**  
Email: mirabelle.doiron@gmail.com  
GitHub: [@mirabelle514](https://github.com/mirabelle514)

## About

This project provides a designer-friendly explanation of MCP (Model Context Protocol), showing:

- **What is MCP?** - Simple explanations and analogies
- **Where You See & Use It** - The apps where you interact with MCP (Claude, VSCode, Figma)
- **Technical Setup** - How engineers set up MCP servers (for technical reference)
- **Credentials** - When and why credentials are needed
- **Real Examples** - 6 concrete examples with step-by-step flows
- **Two Real Flows** - Side-by-side comparison of technical vs non-technical user journeys

## Key Features

- **Side-by-side flows** showing how technical people (engineers/IT) build and setup MCP vs how non-technical people (designers/PMs) use it
- **Concrete examples** with specific apps and tools mentioned (Figma, Claude Desktop, Slack, VSCode, GitHub, databases)
- **Clear role separation** - Shows who does setup vs who uses it everyday
- **Interactive examples** - Click to expand and see detailed step-by-step flows
- **Visual 4-step diagram** - Shows the complete flow from user to AI app to MCP to tools

## Live Demo

🌐 [View Live Demo](https://mcp-explainer-app-lfwoxw3l.devinapps.com)

## Tech Stack

- React + TypeScript
- Tailwind CSS
- Vite
- Lucide React (icons)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

```bash
# Clone the repository
git clone git@github.com:mirabelle514/Understanding-MCP.git
cd Understanding-MCP

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
# Build for production
npm run build
```

The built files will be in the `dist/` directory.

## Project Structure

```
mcp-explainer/
├── src/
│   ├── App.tsx          # Main application component
│   ├── App.css          # Global styles
│   └── main.tsx         # Entry point
├── public/              # Static assets
├── index.html           # HTML template
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── README.md           # This file
```

## Key Concepts Explained

### For Non-Technical Users

This explainer is designed to help designers, PMs, and other non-technical people understand:

- **You don't need to set up MCP** - Engineers/IT do that once
- **You just use familiar apps** - Figma, Claude, Slack, VSCode
- **No coding required** - Just type or click like normal
- **MCP is invisible** - It's the hidden cable connecting your AI app to your tools

### For Technical Users

The explainer also shows the technical setup flow:

1. Pick what to connect (databases, APIs, tools)
2. Choose or build an MCP server
3. Configure credentials and connections
4. Register with AI apps (Claude Desktop, VSCode, etc.)
5. Test and hand off to team

## Examples Included

1. **Database Access** - AI queries your database
2. **File System** - AI reads and writes files
3. **GitHub Integration** - AI interacts with repos
4. **Slack Integration** - AI bot in Slack channels
5. **VSCode Integration** - AI assistant in your editor
6. **Figma Integration** - AI plugin for design systems

## Contributing

This is a learning/demonstration project. Feel free to fork and adapt for your own use.

## License

MIT License - Feel free to use and modify as needed.

## Acknowledgments

Built to help designers and non-technical people understand MCP through visual, concrete examples rather than technical documentation.

---

**Note:** This is a conceptual explainer - it doesn't connect to real tools or data. It's designed for understanding the flows and user journeys.

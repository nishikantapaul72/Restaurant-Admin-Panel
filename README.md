# Restaurant Admin Panel

A modern, responsive admin dashboard for restaurant management. Built with Next.js and PrimeReact, this application allows restaurant owners and staff to efficiently manage menu items, orders, and more.

## Features

- **Menu Management**: Add, edit, delete menu items with categories
- **Real-time Updates**: Instant updates for inventory and order status
- **User-friendly Interface**: Clean, intuitive design for efficient management
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Data Validation**: Form validation using Yup schemas

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nishikantapaul72/Restaurant-Admin-Panel.git
   cd restaurant-admin-panel
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration.

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Technology Stack

- **Framework**: Next.js
- **UI Components**: PrimeReact
- **Form Handling**: React Hook Form
- **Validation**: Yup
- **Styling**: Tailwind CSS
- **State Management**: React Hooks

## Project Structure

```
├── src/                  # Application source code
│   ├── app/              # Next.js App Router pages and layouts
│   │   ├── layout.tsx    # Root layout component
│   │   └── page.tsx      # Home page component
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities, helpers, and shared code
│   └── types/            # TypeScript type definitions
├── .env.example          # Example environment variables
├── next.config.ts        # Next.js configuration
├── package.json          # Project dependencies and scripts
├── postcss.config.mjs    # PostCSS configuration for Tailwind
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

### Data Flow

1. UI components trigger actions via hooks
2. Hooks communicate with services layer
3. Services make API calls to backend
4. Data is returned through the services to the hooks
5. Hooks update React state, reflecting changes in the UI

## Usage

### Menu Management

The Menu Manager allows you to:
- View all menu items with pagination
- Add new menu items with categories
- Edit existing menu items
- Toggle item availability
- Delete menu items

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- PrimeReact for the UI component library
- Next.js team for the amazing framework
- All contributors who have helped improve this project

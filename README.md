# IroCO2 Frontend

This project is part of [IroCO2](https://github.com/ippontech/iroco2). You are not in the principal repository. For any general information about the project, please refer to the [principal repository](https://github.com/ippontech/iroco2).

This is the frontend of the IroCO2 application, developed using [Nuxt 3](https://nuxt.com/) and [Vue 3](https://vuejs.org/). It provides the user interface and client-side logic for the IroCO2 carbon calculator platform.

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20.0.0 < 21.0.0
- npm >= 9.0.0 < 11.0.0 (or [Yarn](https://yarnpkg.com/) / [pnpm](https://pnpm.io/) / [Bun](https://bun.sh/))

### Installation

Clone the repository and install dependencies:

```bash
# with npm
npm install

# with yarn
yarn install

# with pnpm
pnpm install

# with bun
bun install
```

### Run in development

Start the development server at `http://localhost:3000`:

```bash
# with npm
npm run dev

# with yarn
yarn dev

# with pnpm
pnpm run dev

# with bun
bun run dev
```

### Build for production

```bash
# with npm
npm run build

# with yarn
yarn build

# with pnpm
pnpm run build

# with bun
bun run build
```

Preview the production build locally:

```bash
# with npm
npm run preview

# with yarn
yarn preview

# with pnpm
pnpm run preview

# with bun
bun run preview
```

## 📦 Project Structure

- `components/` — Vue components (UI, forms, charts, navigation, etc.)
- `pages/` — Application pages (e.g., calculator, catalog, admin, login, help, etc.)
- `service/` — Business logic and API service layers
- `public/` — Static assets (favicon, icons, etc.)
- `assets/` — Styles and images
- `layouts/` — Application layouts
- `middleware/` — Middleware logic
- `stores/` — Pinia stores (state management)
- `lib/`, `enum/`, `type/` — Utilities, enums, and types
- `nuxt.config.ts` — Nuxt configuration
- `tailwind.config.js` — Tailwind CSS configuration
- `package.json` — Project dependencies and scripts

## 📝 License

Distributed under the Apache 2.0 License. See [LICENSE](./LICENSE) for more information.

---

## 📄 Documentation

See [docs/](./docs) for technical documentation. (If this folder is empty, refer to the principal repository.)

For ADRs and workflow documentation, see the [principal repository](https://github.com/ippontech/iroco2/blob/main/contribute/adr/) and [workflows](https://github.com/ippontech/iroco2/tree/main/contribute/workflows).

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)

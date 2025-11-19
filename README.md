# IroCO2 Frontend

This project is part of [IroCO2](https://github.com/ippontech/iroco2). You are not in the principal repository. For any general information about the project, please refer to the [principal repository](https://github.com/ippontech/iroco2).

This is the frontend of the IroCO2 application, developed using [Nuxt 3](https://nuxt.com/) and [Vue 3](https://vuejs.org/). It provides the user interface and client-side logic for the IroCO2 carbon calculator platform.

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20.0.0 < 21.0.0
- npm >= 9.0.0 < 11.0.0, or [Yarn](https://yarnpkg.com/) / [pnpm](https://pnpm.io/) / [Bun](https://bun.sh/). All npm commands described below can be executed with `yarn`, `pnpm` or `bun`)

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

### Lint project

```bash
# to check linting problems on the whole project
npm run lint-all

# to check linting problems on a specific folder or file
npm run lint ./path/to/folder/
npm run lint ./path/to/NameOfTheFile.vue
```

Replace `lint` with `lint:fix` to automatically fix the problems found on the whole project or the specific folder / file. 

### Launch tests

To launch tests on the project, use following commands :

```bash
# to launch all the tests
npm run test

#to launch only the tests written in NameOfTheComponent.spec.ts file
npm run test NameOfTheComponent

#to launch only the test declared at line 10 of NameOfTheComponent.spec.ts file
npm run test ./path/to/NameOfTheComponent.spec.ts:10
```


### Run in development

To launch the server, a `.env` file is required at the front-end project root folder (ask an IroCO2 referent on how to document it).

Start the development server at `http://localhost:3000`:

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
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

## 🚀 Deployment

The frontend is deployed on AWS Cloudfront. The cloudfront distribution is configured in the [terraform repository](https://github.com/ippontech/iroco2-terraform-modules).

To deploy the frontend, provide the following variables through `.env` file :

- CLERK_PUBLISHABLE_KEY : See official [Clerk documentation](https://clerk.com/docs/deployments/clerk-environment-variables#clerk-publishable-and-secret-keys)
- IROCALC_API_URL : FQDN of the IroCO2 backend API

Run `yarn generate` to generate the static files.

Connect to your AWS environnement and run the following commands : 

```bash
export S3_BUCKET_ID=`aws ssm get-parameter --name /IROCO2/PARAMETERS/FRONTEND/CLOUDFRONT_BUCKET_ID --query 'Parameter.Value' --output text --region eu-west-3 --with-decryption`

export CLOUDFRONT_DISTRIBUTION_ID=`aws ssm get-parameter --name /IROCO2/PARAMETERS/FRONTEND/CLOUDFRONT_DISTRIBUTION_ID --query 'Parameter.Value' --output text --region eu-west-3 --with-decryption`

aws s3 sync ${BUILD_FOLDER} s3://${S3_BUCKET_ID}/

aws cloudfront create-invalidation --distribution-id ${CLOUDFRONT_DISTRIBUTION_ID} --paths '/*'   
```


## 📝 License

Distributed under the Apache 2.0 License. See [LICENSE](./LICENSE) for more information.

---

## 📄 Documentation

See [docs/](./docs) for technical documentation. (If this folder is empty, refer to the principal repository.)

For ADRs and workflow documentation, see the [principal repository](https://github.com/ippontech/iroco2/blob/main/contribute/adr/) and [workflows](https://github.com/ippontech/iroco2/tree/main/contribute/workflows).

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)

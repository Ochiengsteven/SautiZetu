# SautiZetu Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Tech Stack](#introduction)
3. [Demo](#demo)
4. [Features](#features)
5. [Installation](#installation)
6. [Usage](#usage)
7. [Environment Variables](#environment-variables)
8. [API Documentation](#api-documentation)
9. [Contributing](#contributing)
10. [License](#license)

## Introduction

SautiZetu is a groundbreaking social justice platform designed to empower Kenyan citizens and promote transparency in governance. Our name, "Sautizetu," means "Our Voice" in Swahili, embodying our mission to amplify the collective voice of the people. We provide a comprehensive suite of tools including real-time bill tracking, public forums for discussion, a secure whistleblowing system, police brutality reporting, and community-driven crowdfunding.

## Features

- **Bill Tracking**: Stay informed about proposed laws in real-time and track updates on bills in the Kenyan parliament.
- **Discussion Forums**: Engage in meaningful discussions about proposed laws and their potential impact on citizens.
- **Whistleblower Platform**: Anonymously report illegal government activities with evidence, verified before public release.
- **Police Brutality Reporting**: Report incidents of police brutality and illegal abductions, especially during legal protests.
- **Social Justice Crowdfunding**: Centralized crowdfunding platform for social justice causes, with multiple signatories and transparent contribution tracking.
- **Data Visualization**: Visualize complex data and trends related to bills, reports, and crowdfunding campaigns for better understanding.

## 🛠 Built With

- NextJs
- Prisma ORM
- AntDesign components and Icons
- TailwindCSS.
- Lucia Auth.
- VercelDB(postgress).

## 🚀 Live Demo

You can view the live demo of the project at [SautiZetu Demo](https://sauti-zetu.vercel.app/).

## Pitch Deck

For a detailed overview of the project, check out our [Canva Pitch Deck](https://www.canva.com/design/DAGSnmCuK6Y/hRXQpbq2CVhJoYM84ODtTQ/edit?utm_content=DAGSnmCuK6Y&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton).

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Version 16 or above installed. You can download it from [Node.js official website](https://nodejs.org/).
- **Git**: Installed on your machine. You can download it from [Git official website](https://git-scm.com/).
- **npm**: Comes bundled with Node.js, but ensure it's updated to the latest version.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Ochiengsteven/SautiZetu.git
   cd sauti-zetu
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory of the project and paste the following environment variables:

   ```env
   # vercel postgresql connection string
   POSTGRES_URL="postgres://default:9URFQDLVi4mr@ep-long-flower-a2dbkrkq-pooler.eu-central-1.aws.neon.tech:5432/verceldb?sslmode=require"
   POSTGRES_PRISMA_URL="postgres://default:9URFQDLVi4mr@ep-long-flower-a2dbkrkq-pooler.eu-central-1.aws.neon.tech:5432/verceldb?sslmode=require&pgbouncer=true&connect_timeout=15"
   POSTGRES_URL_NO_SSL="postgres://default:9URFQDLVi4mr@ep-long-flower-a2dbkrkq-pooler.eu-central-1.aws.neon.tech:5432/verceldb"
   POSTGRES_URL_NON_POOLING="postgres://default:9URFQDLVi4mr@ep-long-flower-a2dbkrkq.eu-central-1.aws.neon.tech:5432/verceldb?sslmode=require"
   POSTGRES_USER="default"
   POSTGRES_HOST="ep-long-flower-a2dbkrkq-pooler.eu-central-1.aws.neon.tech"
   POSTGRES_PASSWORD="9URFQDLVi4mr"
   POSTGRES_DATABASE="verceldb"

   # cloudinary
   CLOUDINARY_CLOUD_NAME="dseiakb3q"
   CLOUDINARY_API_KEY="262359486928694"
   CLOUDINARY_API_SECRET="Ei3luZXIb0Mw_0RYE0tryH1qz24"
   API_ENVIRONMENT_URL="CLOUDINARY_URL=cloudinary://262359486928694:Ei3luZXIb0Mw_0RYE0tryH1qz24@dseiakb3q"
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Usage

Once the application is running, you can:

- Sign up for an account to access all features.
- Participate in discussions and report issues.
- Track bills and engage with the community.

## Environment Variables

Make sure to set up the `.env` file as described in the Installation section to ensure the application can connect to the necessary services.

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE.md) file for details.

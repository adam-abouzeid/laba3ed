# Laba3ed

## Overview

Laba3ed connects individuals who need assistance with those who are willing to help. We provide a simple and transparent way to post and browse requests for essential items such as food, clothing, shelter, transportation, and medicine. Donors can view these requests and offer support directly to the individuals who need it.

## Features

- **Request Creation**: Individuals can post requests for essential items such as food, clothing, shelter, transportation, and medicine.
- **Browse Requests**: Donors can view requests and offer support directly to the individuals who need it.

## Getting Started

### Prerequisites

- Node.js
- Docker and Docker Compose

### Installation

1. Clone the repository:

   ```
   git clone git@github.com:adam-abouzeid/laba3ed.git
   ```

2. Navigate to the project directory:

   ```
   cd laba3ed
   ```

3. Run the following command to start the PostgreSQL database:

   ```
   docker-compose -f docker-compose.local.yaml up -d
   ```

4. Install dependencies:

   ```
   npm install
   ```

5. Set up environment variables:
   Create a `.env` file and add the following:

   ```
   DATABASE_URL="postgresql://postgres:my-secret-pw@localhost:5432/laba3ed"
   ```
6. Apply the database migration:
If it is your first time running the installation locally, run the following to setup the database schemas:

```
npx prisma migrate dev
```

7. Start the development server:
   ```
   npm run dev
   ```

## Contributing

We welcome contributions from the community. Please read our [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines on how to contribute to this project.

## Code of Conduct

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Security

Please read our [SECURITY.md](SECURITY.md) file for guidelines on reporting security vulnerabilities.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

[support@laba3ed.org](mailto:support@laba3ed.org)

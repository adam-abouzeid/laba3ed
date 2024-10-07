# Laba3ed

## Overview

todo

## Features

- todo

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

4. Navigate to the `web` directory:

   ```
   cd web
   ```

5. Install dependencies:

   ```
   npm install
   ```

6. Set up environment variables:
   Create a `.env` file and add the following:

   ```
   DATABASE_URL="postgresql://postgres:my-secret-pw@localhost:5432/laba3ed"
   ```

7. Start the development server:
   ```
   npm run dev
   ```

## Usage

[Provide instructions on how to use the app, including screenshots if possible]

## Contributing

We welcome contributions from the community. Please read our [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines on how to contribute to this project.

## Code of Conduct

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

[support@laba3ed.org](mailto:support@laba3ed.org)

## Acknowledgments

- [List any libraries, frameworks, or individuals you'd like to acknowledge]

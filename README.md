# Block Tasker

Block Tasker is a project management tool that leverages blockchain technology for secure task tracking. This repository contains the full source code for both the frontend and backend components of the application.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Secure Task Management**: Uses blockchain technology to ensure tasks are securely recorded and immutable.
- **Decentralized**: No single point of failure as the task data is stored across a distributed network.

## Installation

### Prerequisites

- Node.js
- npm or yarn
- Solidity compiler
- Truffle

### Backend

1. Clone the repository:

    ```bash
    git clone https://github.com/erdincakgun/block-tasker.git
    cd block-tasker/backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Compile the smart contracts:

    ```bash
    truffle compile
    ```

4. Deploy the smart contracts:

    ```bash
    truffle migrate
    ```

### Frontend

1. Navigate to the frontend directory:

    ```bash
    cd ../frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm start
    ```

## Usage

1. Ensure the backend server and smart contracts are deployed and running.
2. Open the frontend application in your browser (usually at `http://localhost:3000`).
3. Create, manage, and track tasks securely using the application interface.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

Please ensure your code adheres to the existing coding standards and includes appropriate test coverage.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

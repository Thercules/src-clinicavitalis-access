# client

This template should help get you started developing with Vue 3 in Vite.

## Usage Instructions

### Moving the Project to `src/client`

1. Make sure you are in the project's root directory:  
    ```bash
    cd projects/src-clinicavitalis-access
    ```

2. Move the project to the correct path:  
    ```bash
    mv . ../src/client
    ```

3. Access the new directory:  
    ```bash
    cd ../src/client
    ```

---

### Checking if Port 5173 is Available

- Before starting the project, make sure that port `5173` is free.  
- On Windows, use the following command:  
    ```powershell
    netstat -aon | findstr 5173
    ```
- On Linux or macOS, use:  
    ```bash
    lsof -i :5173
    ```
- If a process is using this port, kill it with:  
    ```bash
    kill -9 <PID>
    ```

---

### Starting Cypress for E2E Tests

1. Install Cypress dependencies:  
    ```bash
    npm install cypress --save-dev
    ```

2. Open Cypress:  
    ```bash
    npx cypress open
    ```

3. To run E2E tests directly in the terminal:  
    ```bash
    npx cypress run
    ```

---

### Running Unit Tests

- This project uses **Vitest** for unit tests. To run them, use:  
    ```bash
    npx vitest run
    ```

- To run tests in watch mode (monitoring file changes in real-time):  
    ```bash
    npm run lint
    ```

---

## Notes

- Make sure all dependencies are installed using:  
    ```bash
    npm install
    ```

- If you encounter caching issues, use:  
    ```bash
    npm cache clean --force
    ```

---

## Contact

For questions or suggestions, reach out at:  
- **Email**: contato@vitalisclinica.com  
- **Website**: [www.vitalisclinica.com](https://www.vitalisclinica.com)  
# LAMBDA TEST PLAYGROUND, FOR AUTOMATION TESTING PURPOSES

## Overview

This automated test project provides a reburst, scalable, and feature reach solution for automation testing of Lambda Test Playground (AUT). Built with Playwright and Typescript The framework has various features, and include data driven testing, logging, retry machenism, self healing tests, cross browser testing, multiple environments.

## Features

* **TypeScript & Playwright**: For writing test
* **Page Object Model**: Apply POM design pattern to promote code reuse and maintainebility
* **Data-Driven Testing**: Use external data use to enhance test coverage (JSON)
* **Cross-Browser Testing**: Execute tests across Chrome, Firefox and Safari
* **Detailed Logging**: Logging for better debugging
* **Retry Mechanism**: Handle intermittent failures with automatic retries.
* **Self-Healing Tests**: Smart element selection fallback strategies
* **Parallel Execution**: Run tests simultaneously to reduce execution time

## Pre-requisities
* Node.js latest version
* npm latest version
* Git

## Installation
1. Clone the Repository
```bash 

git clone https://github.com/Theophelus/Lambda-Playwright-Automation.git
```
2. Navigate to the project
```bash 
cd Lambda-playwright-Automation
```


2. Install Dependencies 
```bash 
 npm install
 ```

3. Install Playwright Browsers.
```bash 
 npx playwright install
```

4. Running Specific Test
```bash
npx playwright test ./src/tests/products-tests.spec.ts
```


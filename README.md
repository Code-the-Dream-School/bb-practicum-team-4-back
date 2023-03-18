# Back end for Code The Dream practicum project for team 4

The repo is designated for backend for the practicum project for team 4.

## Pre-requisites

- Install [Node.js](https://nodejs.org/en/).

## Getting started

- Clone the repository.

```bash
git clone https://github.com/Code-the-Dream-School/bb-practicum-team-4-back
```

- Install dependencies.

```bash
cd bb-practicum-team-4-back
npm install
```

- Build and run the project.

```bash
npm run dev
```

Navigate to `http://localhost:8000`

## User stories

- User should be able to
    - login or create an account
    - see a list of products
    - search for a product
    - add product to cart
- For MVP - the cart will not persist
- User should be able to checkout
- Checkout page takes shipping and billing info
- Payment information (?)
- Place order
- After an order is placed it automatically goes into “completed” status
- A logged in user is able to access order history
- User should not be able to access order history if not logged in

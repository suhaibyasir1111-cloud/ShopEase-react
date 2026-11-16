# ShopEase – E-Commerce Web Application

ShopEase is a full-stack e-commerce web application built with Next.js, React, TypeScript, and PostgreSQL. It provides a shopping experience for customers and a dedicated admin dashboard for managing products and orders.

## Features

### Customer Features
- User registration and login
- Secure password hashing
- Product listing and product details
- Shopping cart management
- Checkout and order placement
- Order history and order details
- User profile API

### Admin Features
- Admin dashboard with overview and charts
- Create, update, and delete products
- View and manage customer orders
- Product and order management APIs

### Backend Features
- REST API routes using Next.js
- PostgreSQL database integration
- Prisma ORM
- JWT-based authentication
- Input validation using Zod
- Form handling with React Hook Form

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | Full-stack framework |
| React 19 | UI development |
| TypeScript | Type safety |
| Tailwind CSS 4 | Styling |
| PostgreSQL | Database |
| Prisma ORM 7 | Database management |
| JWT | Authentication |
| bcryptjs | Password hashing |
| Zod | Input validation |
| React Hook Form | Form handling |
| Chart.js | Dashboard charts |

## Project Structure

```text
next-shop/
├── app/
│   ├── (authorize)/
│   ├── (shop)/
│   ├── admin/
│   ├── api/
│   ├── lib/
│   ├── orders/
│   └── products/
├── components/
├── contexts/
├── prisma/
├── public/
├── package.json
└── README.md
```

## Getting Started

### 1. Clone the Repository

```bash
git clone -b nextjs-version https://github.com/suhaibyasir1111-cloud/ShopEase-react.git
```

### 2. Navigate to the Project

```bash
cd ShopEase-react
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the project root and configure the required database and authentication variables.

```env
DATABASE_URL="your_postgresql_connection_url"
SHADOW_DATABASE_URL="your_shadow_database_url"
JWT_SECRET="your_secure_secret"
```

Use your own database credentials and a strong secret. Never commit your `.env` file.

### 5. Run Database Migrations

```bash
npx prisma migrate deploy
npx prisma generate
```

### 6. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production Build

```bash
npm run build
npm run start
```

## Future Improvements

- Online payment gateway integration
- Product search and filtering enhancements
- Improved automated testing
- Production deployment

## Author

**Shoaib Yasir**

GitHub: [suhaibyasir1111-cloud](https://github.com/suhaibyasir1111-cloud)

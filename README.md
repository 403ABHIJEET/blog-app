# 🚀 Next.js Blog App

A full-stack blog application built with **Next.js**, **Prisma**, and **Node.js v23+**.

---

## 📌 Prerequisites

- Ensure you have **Node.js version 23 or above** installed.

```bash
node -v
```

If not, consider using [nvm](https://github.com/nvm-sh/nvm) to manage Node versions.

---

## 🛠️ Getting Started

Follow the steps below to set up the project:

### 1. Clone the Repository

```bash
git clone https://github.com/403ABHIJEET/blog-app.git
cd blog-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

- Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

- Fill in all required values in the `.env` file (e.g., `DATABASE_URL`, `NEXTAUTH_SECRET`, etc.)

---

## ⚙️ Prisma Setup

After setting environment variables, run the following Prisma commands:

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Push Prisma Schema to Database

```bash
npx prisma db push
```

### 6. (Optional) Run Migrations

```bash
npx prisma migrate dev
```

---

## 🚀 Start the Application

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 📋 Available Scripts

| Command             | Description                          |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Start the development server         |
| `npm run build`     | Build the application for production |
| `npm run start`     | Run the production server            |
| `npx prisma studio` | Open Prisma Studio (GUI for DB)      |

---

## ✅ Notes

- Ensure your database is running and accessible.
- Keep your `.env` file private and secure.
- For any Prisma schema updates, rerun `npx prisma generate`.

---

## 🧑‍💻 Author

Made with ❤️ by Abhijeet

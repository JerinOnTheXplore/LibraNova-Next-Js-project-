# LibraNova 📚

**LibraNova** is a modern digital library and book rental platform built with **Next.js 15** and **MongoDB**, allowing users to browse, rent, and read books online. The platform supports **role-based access** for Users, Librarians, and Admins, and includes payment integration for book rentals.

---

## **Features**

### 🌟 User
- Register/Login with **Firebase Authentication** (Email/Google)
- Browse books by **category, author, or title**
- Borrow books by paying rental fees (**Stripe)
- View borrowed books list with **due dates**
- Read books online with **PDF preview / embedded reader**
- Get **email/notification reminders** for due dates
- Extend rental period (with extra fee)
- Leave **ratings & reviews** for books

### 📚 Librarian
- Login with **librarian role**
- Add, update, or remove books
- View statistics (most rented books, availability)

### 🛠 Admin
- Manage users (ban/remove)
- Manage librarians (add/remove)
- Approve or reject librarian-submitted books
- View overall reports (rentals, payments, active users)
- Handle disputes and refunds

---

## **Functional Requirements**
- **Authentication & Authorization**: Firebase Auth + JWT for protected routes  
- **Book Management**: Search, filter, categories, pagination/lazy loading  
- **Rental System**: Add to cart → Pay → Borrow, automatic due date tracking  
- **Payment Integration**: Stripe   
- **Dashboards**: Separate dashboards for Users, Librarians, Admins

---

## **Tech Stack**

- **Frontend:** Next.js 15 (App Router), Tailwind CSS / DaisyUI  
- **Backend:** Next.js API Routes (No separate Express needed)  
- **Database:** MongoDB Atlas (using official Node.js driver)  
- **Authentication:** Firebase Auth + JWT  
- **Payment:** Stripe   
- **Hosting:** Vercel (Frontend), MongoDB Atlas (Database)

---

## **Project Structure**



## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

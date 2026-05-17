# Project Report — Bakery (Next.js Fullstack)

## Overview
This repository is a migrated Next.js fullstack storefront for a bakery. It was converted from a Create React App into Next.js to combine the frontend and serverless backend for deployment on Vercel. Key features include dynamic product pages, a reviews carousel, Razorpay payment integration, and EmailJS for sending emails.

## Location
Project root: `package.json`
## What it is
- A Next.js app using `pages/` routing and serverless API routes (`pages/api/*`).
- Frontend UI built with React + Bootstrap (react-bootstrap) components in `src/` and `components/`.
- Cart state managed via `context/CartContext.js`.
- Serverless payment flow using Razorpay Orders + Checkout.
- Email sending via EmailJS integration for contact/order emails.

## Architecture
- Framework: Next.js (React) with serverless API routes.
- Frontend: `components/` (FeaturedProducts, Header, Footer, Cart, Checkout, Reviews).
- Backend: `pages/api/checkout.js` for order creation (Razorpay). Additional API routes may exist for product/review data.
- Deployment: Vercel — supports Next.js and serverless API routes out of the box.

## Key Files
- `package.json` — project dependencies and scripts (includes `razorpay` dependency; `stripe` removed).
- `pages/api/checkout.js` — server route creating Razorpay Orders and returning `orderId`, `amount`, `currency`, and `key`.
- `components/pages/Checkout.jsx` — client code that posts cart to `/api/checkout`, loads Razorpay SDK, and opens checkout.
- `components/productsData.js` — product dataset used across pages/components.
- `components/FeaturedProducts.jsx` — links to product detail pages.
- `pages/products/[id].js` — dynamic product detail page(s).
- `README.md` — updated with Razorpay instructions and notes.
- `.env.local` — local environment file created (DO NOT COMMIT) with Razorpay test keys (ignored by `.gitignore`).
- `.gitignore` — updated to include `.env.local`, `.next`, `node_modules`.

## Payment Integration (Razorpay)
- Server uses the `razorpay` Node SDK to create Orders in `pages/api/checkout.js`.
- Client loads `https://checkout.razorpay.com/v1/checkout.js` and opens the Razorpay widget using the returned `order_id` and public key.
- Required environment variables:
  - `NEXT_PUBLIC_RAZORPAY_KEY_ID` (public client key)
  - `RAZORPAY_KEY_ID` (server key id)
  - `RAZORPAY_KEY_SECRET` (server secret)
  - `NEXT_PUBLIC_BASE_URL` (optional)
- Local test keys used (example): `rzp_test_Seu5z3Rx6tPuy1` / secret `lTsxcEqSCW2FJgGW2c06gI1w` — stored in `.env.local` locally only.
- Recommendation: implement server-side signature verification and/or webhooks to confirm payments before marking orders as completed.

## Email Integration (EmailJS)
- EmailJS is used to send emails (contact or order confirmations). Search the project for EmailJS calls to find exact locations and template IDs.
- EmailJS credentials and template/service IDs should be set in environment variables or Vercel secrets.

## How to run locally
1. Install dependencies:
```bash
npm install
```
2. Create `.env.local` (DO NOT COMMIT) with entries:
```
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```
3. Start dev server:
```bash
npm run dev
```
4. Visit `http://localhost:3000` — add items to cart and test Checkout with Razorpay test keys.

## Git & Deployment Notes (Vercel)
- Ensure `.env.local` and `.next` are included in `.gitignore` (done).
- If `.env.local` or `.next` were previously committed, remove them from git index:
```bash
git rm --cached .env.local || true
git rm -r --cached .next || true
git commit -m "Remove local env/build artifacts from repo"
```
- Recommended branch workflow:
```bash
git checkout -b feat/nextjs-razorpay
git add .
git commit -m "Migrate to Next.js; add Razorpay integration"
git push -u origin feat/nextjs-razorpay
```
- In Vercel Project Settings, add the required env vars (`NEXT_PUBLIC_RAZORPAY_KEY_ID`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `NEXT_PUBLIC_BASE_URL`). Then merge the branch or redeploy.

## Security & Recommendations
- Never commit `.env.local` or secret keys to the repo. Use Vercel environment variables for production secrets.
- Implement Razorpay signature verification on server-side (either in the order-callback handler or via webhooks).
- Persist orders and payment state in a database for order history and administrative access (Supabase, Firebase, or MongoDB Atlas recommended).

## Testing Checklist
- Unit test cart totals and price parsing functions.
- Manual/E2E test checkout flow with Razorpay test keys locally and on Vercel after env vars are configured.
- Test EmailJS flows by sending a sample email from the app.

## Next Steps (suggested)
1. Implement server-side payment signature verification and order persistence.
2. Add a post-payment confirmation page and order history pages.
3. Persist reviews via a serverless API with a simple database.
4. Clean up any leftover Stripe artifacts in lockfiles or caches and regenerate `package-lock.json` if needed:
```bash
rm -rf node_modules package-lock.json
npm install
```

---
Project upgrade notes — Next.js + Razorpay (student-friendly)

Quick summary
- Converted the React app to Next.js (pages folder) so frontend and serverless API routes deploy together on Vercel.
- Added dynamic product details pages at `/products/[id]`.
- Added a simple reviews component displayed on the home page.
- Integrated Razorpay Orders + Checkout via a serverless API route at `/api/checkout` (test mode).

Files added/changed
- `components/productsData.js` — central product data used by pages/components.
- `pages/products/[id].js` — product details (dynamic routing).
- `pages/api/checkout.js` — Razorpay order creator for client checkout.
- `components/FeaturedProducts.jsx` — now links to product pages and uses `productsData`.
- `components/pages/Checkout.jsx` — added card payment button that calls `/api/checkout`.

- Environment variables
- `NEXT_PUBLIC_RAZORPAY_KEY_ID` — your Razorpay Key ID (public, used by client).
- `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` — server-side Razorpay credentials (set `RAZORPAY_KEY_SECRET` only on server/hosting provider).
- `NEXT_PUBLIC_BASE_URL` — optional, base URL for your site (e.g. https://your-site.vercel.app). If omitted, the API will use request host.

How to run locally
1. Install dependencies: `npm install`.
2. Set environment variables (on Windows PowerShell example):
   - `$env:NEXT_PUBLIC_RAZORPAY_KEY_ID = "rzp_test_..."`
   - `$env:RAZORPAY_KEY_ID = "rzp_test_..."`
   - `$env:RAZORPAY_KEY_SECRET = "your_razorpay_secret"`
   - `$env:NEXT_PUBLIC_BASE_URL = "http://localhost:3000"`
3. Run dev server: `npm run dev`.

Notes & best practices
- Use Razorpay test keys while developing; Vercel can store env vars securely for production.
- Razorpay supports INR/UPI flows for India; you will need to follow Razorpay onboarding (test keys work for most flows).
- Keep product data in one file (`components/productsData.js`) for simplicity; switch to a database (Supabase, Firebase, or MongoDB Atlas) for persistence later.
- Keep secrets out of the repo; never commit real secret keys.

Next steps you might want me to implement
- Persist reviews in a simple serverless API and add a form to submit reviews.
- Migrate product data to a lightweight DB (Supabase) and add admin CRUD pages.
- Add Razorpay payment verification (signature check) or webhooks to mark orders completed and send order emails.

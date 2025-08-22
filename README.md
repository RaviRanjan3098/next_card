This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

# Mini eCommerce Project (Next.js)

This is a mini eCommerce web application built with **javaScript**, **Bootstrap** , **React.js**, **Next.js** , **Redux** .  
The app provides product listing, add-to-cart functionality, cart summary, and a responsive layout.


# Feature 
1.  Product Listing Page
- Displays products dynamically fake api (https://fakestoreapi.com/products).
- Search functionality to filter products by category.   
- Render All card with image, title , price and add to cart button.  

2. Add to Cart
- Users can add/remove products from the cart.  
- Cart state is managed globally using **Redux**.  
- Cart data store with **localStorage**.  

3. Cart Page (`/cart`)
- Displays all added products with their details.  
- Shows total quantity and total price.  
- Allows removing items directly from the cart.

4. Responsive Design
- Fully responsive using **Bootstrap**.  
- Optimized and full Responsive for **mobile, tablet, and desktop**.
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, clone application:

```bash
 git clone https://gitlab.com/varens/ssm-web.git
```


## Configuring

If you configure a .env file (just copy [.env.example](https://gitlab.com/varens/ssm-web.git/version_2.0/.env.example) over to '.env' and fill in the options) you can configure a range of options.


##Run the development server:

```bash
yarn install
yarn dev
```


##Building and deploying in production:

```bash
yarn install
yarn build
yarn start
```

## Application structure

```
- public            # Public assets that can be loaded from the client side.
- public/img        # Local images using for next/image optimization.
- public/font       # Local font using for typography.
- components        # Contain React components.
- store             # Contain Redux Toolkit for state management.
- pages             # Contain application pages.
- styles            # Application styles uses TailwindCSS/Daisy UI
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.


## Instructions to run the app

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Notes

- To connect to the backend server, create a `.env.local` file in the root directory of the project and copy the contents of the `.env.example` file into it. After that, you can implement REST functions to connect to the server api.

## Dev Guidelines

- The project is using [Next.js](https://nextjs.org/) as the frontend framework and its folder structure:
  - `public` folder contains all the static files of the app
  - `src` folder contains all the source code of the app
    - `app` folder contains all the pages of the app
      - here the pages must be implemented as a function component
      - the `(navBar)` folder automatically apply a navbar to the pages inside it
      - folders with \[\] in the name represent [dynamic routes](https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes)
      - a page must be a **folder** containing:
        - `page.tsx` file which is the page itself
        - other folders for each needed specific component
        - \[optional\] `page-name.scss` file for the page styles (note that the project is integrated with tailwind css, but the choice of using it or not is up to the you)
    - `components` folder contains all the common components (used by multiple pages) of the app

### Notes

- To see a page in the browser type the path following the directory hierarchy, with the `app` folter being the root (pages with () in tehe name are ignored in the path). Ex.: the page located in `src/app/(navBar)/home/page.tsx` is reached by the path `https://localhost:3000/home`

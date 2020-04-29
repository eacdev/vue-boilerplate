# vue-boilerplate
✨ A user-friendly boilerplate that integrates Webpack, Vue, TypeScript, and TailwindCSS out of the box.

## Why?

This project started when I needed Vue + TypeScript application setup that's easy to understand, and minimalist. Most boilerplates
do too much and therefore act as abstractions over Webpack and the other tools they configure. In turn, it becomes difficult to
extend and customize the project.

## Features

* TypeScript
* TailwindCSS
* Vue
* ESLint
* Prettier
* PostCSS, Browserlist, Autoprefixer, etc.
* Custom webpack configuration for the above
* Example full-stack chat application built with this boilerplate

## Getting started

```
git clone https://github.com/eacdev/vue-boilerplate
```

```
# Set to production when deploying to production
NODE_ENV=development

# Node.js server configuration
SERVER_PORT=8080

# Postgres configuration
DB_HOST=localhost
DB_USER=user
DB_PASS=pass
DB_DATABASE=database
DB_PORT=5432

SECRET=yoursecret
```
* Place this .env file in the project root.
* Note: server address must be localhost:8080 as it is hardcoded atm (change it in *.client.ts files)

```
npm install
```

```
npm run start:api
```

```
npm run start:client
```

Now you can go to `localhost:8081` and see your app!

## To do
- [ ] Path aliases (@, ~, etc.)
- [ ] Implement support for TailwindCSS's @apply in scoped scss.
- [ ] Fix small bugs in the example application.

## Contributing
Pull requests are welcome. Please open an issue to discuss.

## License
[MIT](https://choosealicense.com/licenses/mit/)

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
Rename .env.example to .env and fill in the configuration.
```

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
- [ ] Implement support for customizing API address (currently hardcoded in *.client.ts files.)
- [ ] Client/ and api/ folders should have their own .env files.

## Contributing
Pull requests are welcome. Please open an issue to discuss.

## License
[MIT](https://choosealicense.com/licenses/mit/)

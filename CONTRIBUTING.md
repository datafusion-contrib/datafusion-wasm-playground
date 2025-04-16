# Contributing / Developing Guide for this project

## Build the project

This is a React-Vite project. So checkout [package.json](/package.json) for available commands.

The major purpose of this project is to provide a web playground for Apache DataFusion (uses [datafusion-wasm-bindings](https://github.com/datafusion-contrib/datafusion-wasm-bindings)).

Command to install dependencies:

```bash
npm install
```

Command to start the playground:

```
vite
```

## Local Development with datafusion-wasm-bindings

1. Build datafusion-wasm-bindings, see [instructions](https://github.com/datafusion-contrib/datafusion-wasm-bindings/blob/main/CONTRIBUTING.md) to generate the `pkg` folder on local.

2. Add the global path alias for `pkg` to your local vite.config.ts file.
   For example:

   ```javascript
   export default defineConfig({
     base: "/datafusion-wasm-playground/",
     resolve: {
       alias: {
         "datafusion-wasm": resolve(__dirname, "${PATH_TO_YOUR_PKG}"),
       },
     },
     plugins: [
       wasm(),
       topLevelAwait(),
       ...
     ],
   });
   ```

   This way your `package.json` dependencies can be alias to your local development package.

3. Start the Playground!

This will generate a `pkg` directory containing the WASM binary and a JavaScript wrapper. You can use it as a npm package. The `--target web` specifies that the WASM binary is for web usage (inside browser), other options like `nodejs` or `deno` also exist if you want to use it in other environments.

## How to Contribute

### Find an Issue or Feature

- Browse the issues to find something to work on, or suggest a new feature by opening an issue.

### Development Workflow

- Fork the repository and create a new branch for your changes.
- Make your changes and ensure all tests pass.
- Commit your changes with clear messages.
- Push your branch and open a Pull Request (PR) against the main repository.

Happy Coding 🚀

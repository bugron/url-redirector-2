# URL Redirector 2

<p align="center">
  <img src="public/img/logo-128.png" alt="URL Redirector 2 Logo" width="128">
</p>

<p align="center">
  A Chrome extension for local or remote URL redirection, built with <a href="https://vitejs.dev/">Vite</a>, <a href="https://preactjs.com/">Preact</a>, and <a href="https://developer.chrome.com/docs/extensions/mv3/intro/">Manifest v3</a>.
</p>

## 🚀 Features

- Custom URL redirection rules
- Ability to disable individual rules or all rules
- Built with modern web technologies
- Manifest v3 compliant

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) >= 20
- [pnpm](https://pnpm.io/)
- [Google Chrome](https://www.google.com/chrome/)

## 🛠️ Installation

1. Clone the repository:

   ```
   git clone https://github.com/bugron/url-redirector-2.git
   cd url-redirector-2
   ```

2. Install dependencies:

   ```
   npm install
   ```

## 💻 Development

1. Start the development server:

   ```
   npm run dev
   ```

2. Load the extension in Chrome:

   - Open Chrome and navigate to [`chrome://extensions`](chrome://extensions)
   - Enable "Developer mode" in the top right corner
   - Click "Load unpacked" and select the `url-redirector-2/build` folder

## 🏗️ Building for Production

To create a production build:

```
npm run build
```

The built extension will be in the `build` folder, ready for submission to the [Chrome Web Store](https://chrome.google.com/webstore/devconsole/).

## 📦 Chrome Web Store Submission

For instructions on publishing your extension to the Chrome Web Store, please refer to the [official guide](https://developer.chrome.com/webstore/publish).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 🙏 Acknowledgements

- [bluzky/url-redirector](https://github.com/bluzky/url-redirector) - a great extension that performs a similar function build with deprecated Manifest v2
- [create-chrome-ext](https://github.com/guocaoyi/create-chrome-ext) - Used to generate the initial project structure
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [Preact](https://preactjs.com/) - A fast 3kB alternative to React with the same modern API

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const fs = require("fs");
const vendorConfig = require("./webpack.vendors");
const MergeIntoFile = require("webpack-merge-and-include-globally/index");

// UPDATED CUSTOM PLUGIN CLASS
class HtmlScriptInjector {
  apply(compiler) {
    compiler.hooks.afterEmit.tap('HtmlScriptInjector', (compilation) => {
      const htmlDir = path.resolve(__dirname, 'dist/html');
      
      if (fs.existsSync(htmlDir)) {
        // Define exactly which HTML files should get which scripts
        const htmlScriptConfig = {
          'index.html': {
            scripts: [
              '../assets/js/config.js',
              '../assets/js/core.bundle.js',
              '../assets/js/login.js'
            ]
          }
          // Add other HTML files as needed, or leave them out to get no auto-injected scripts
        };
        
        Object.entries(htmlScriptConfig).forEach(([htmlFile, config]) => {
          const filePath = path.join(htmlDir, htmlFile);
          
          if (fs.existsSync(filePath)) {
            let content = fs.readFileSync(filePath, 'utf8');
            let scriptsAdded = false;
            let scriptTags = '';
            
            config.scripts.forEach(scriptSrc => {
              if (!content.includes(scriptSrc)) {
                scriptTags += `    <script src="${scriptSrc}"></script>\n`;
                scriptsAdded = true;
              }
            });
            
            if (scriptsAdded && content.includes('</head>')) {
              content = content.replace('</head>', scriptTags + '</head>');
              console.log(`✅ Auto-injected ${config.scripts.length} scripts into ${htmlFile}`);
              fs.writeFileSync(filePath, content, 'utf8');
            }
          }
        });
      }
    });
  }
}

class FilesHandler {
  constructor() {}

  getMergeFiles(config) {
    const { entry } = config;
    const files = [];

    const clonedEntry = JSON.parse(JSON.stringify(entry));

    Object.entries(clonedEntry).forEach(([key, values]) => {
      values.forEach((value) => {
        if (!value.bundle) {
          return;
        }

        const dist = value.dist.replace("dist/assets", "");

        const file = {
          src: value.src,
          dest: dist,
        };

        files.push(file);
      });
    });

    return files;
  }

  getCopyFiles(config) {
    const { entry, output } = config;
    const files = [];

    const clonedEntry = JSON.parse(JSON.stringify(entry));

    Object.entries(clonedEntry).forEach(([key, values]) => {
      values.forEach((value) => {
        if (value.bundle) {
          return;
        }

        value.src.forEach((src) => {
          const from = path.resolve(src);
          const dist = path.resolve(path.join(output, value.dist));

          const file = {
            from: from,
            to: dist,
          };

          files.push(file);
        });
      });
    });

    return files;
  }

  getFilesFromDir(dirPath) {
    let files = fs.readdirSync(dirPath);
    return files.map((file) => path.resolve(dirPath, file));
  }

  generateEntryPaths(appPath) {
    let entryPaths = {};

    const traverseDirectory = (dirPath) => {
      let filesAndDirs = fs.readdirSync(dirPath);

      filesAndDirs.forEach((fileOrDir) => {
        let fullPath = path.join(dirPath, fileOrDir);

        if (fs.lstatSync(fullPath).isDirectory()) {
          traverseDirectory(fullPath);
        } else {
          if (fileOrDir.endsWith(".js") || fileOrDir.endsWith(".ts")) {
            let relativePath = path
              .relative(appPath, fullPath)
              .replace(".js", "")
              .replace(".ts", "");
            entryPaths[relativePath] = fullPath;
          }
        }
      });
    };

    traverseDirectory(appPath);

    return entryPaths;
  }

  getAppEntries() {
    const appPath = path.resolve("src/app");
    const entries = this.generateEntryPaths(appPath);
    return entries;
  }

  // New method to get all asset files for copying
  getAssetFiles() {
    return [
      {
        from: path.resolve(__dirname, "src/assets/fonts"),
        to: path.resolve(__dirname, "dist/assets/fonts"),
      },
      {
        from: path.resolve(__dirname, "src/assets/media"),
        to: path.resolve(__dirname, "dist/assets/media"),
      }
    ];
  }
}

const fileHandler = new FilesHandler();
const additionalEntries = fileHandler.getAppEntries();

module.exports = (env) => {
  return {
    mode: env.production ? "production" : "development",
    watch: env.production ? false : true,
    devtool: false,
    entry: {
      "js/core.bundle": [path.resolve(__dirname, "./src/core/index.ts")],
      "js/config": [path.resolve(__dirname, "./src/assets/js/config.js")],
      "js/common_script": [path.resolve(__dirname, "./src/assets/js/common_script.js")],
      "js/include_html": [path.resolve(__dirname, "./src/assets/js/include_html.js")],
      "js/login": [path.resolve(__dirname, "./src/assets/js/login.js")],
      "js/socket.io.min": [path.resolve(__dirname, "./src/assets/js/socket.io.min.js")],
      "js/marked.min": [path.resolve(__dirname, "./src/assets/js/marked.min.js")],
      "js/patient_summary": [path.resolve(__dirname, "./src/assets/js/patient_summary.js")],
      ...additionalEntries,
    },
    output: {
      filename: "assets/[name].js",
      path: path.resolve(__dirname, "./dist"),
      library: {
        type: "umd",
      },
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: "pre",
          use: ["source-map-loader"],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.ts$/,
          use: [
            {
              loader: "ts-loader",
              options: {
                transpileOnly: true,
              },
            },
          ],
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx", ".css"],
      alias: {
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@css': path.resolve(__dirname, 'src/assets/css'),
        '@js': path.resolve(__dirname, 'src/assets/js'),
        '@fonts': path.resolve(__dirname, 'src/assets/fonts'),
        '@media': path.resolve(__dirname, 'src/assets/media'),
      }
    },
    plugins: [
      // Auto-inject scripts into HTML
      new HtmlScriptInjector(),

      new MiniCssExtractPlugin({
        filename: "assets/css/[name].css",
      }),

      // Copy vendor files (Metronic)
      new CopyWebpackPlugin({
        patterns: fileHandler.getCopyFiles(vendorConfig),
      }),

      // Copy ALL HTML files from src/html → dist/html
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "src/html"),
            to: path.resolve(__dirname, "dist/html"),
          }
        ],
      }),

      // Copy all assets (fonts, media, etc.) - REMOVED JS COPYING
      new CopyWebpackPlugin({
        patterns: fileHandler.getAssetFiles(),
      }),

      // REMOVED: The redundant JS copy plugin

      // Merge vendor bundles
      new MergeIntoFile({
        files: fileHandler.getMergeFiles(vendorConfig),
      }),
    ],
    target: ["web", "es5"],
    optimization: {
      minimize: env.production,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: false,
            },
          },
          extractComments: false,
        }),
      ],
    },
    performance: {
      hints: false,
    },
  };
};
import { normalize } from "path";
import isValidPath from "is-valid-path";

const transpilationOptions = [
    {
        name: "transpilation",
        label: "Babel - ES6+",
        value: "babel"
    },
    {
        name: "transpilation",
        label: "React JSX",
        value: "reactjsx"
    },
    {
        name: "transpilation",
        label: "CoffeeScript",
        value: "coffee"
    },
    {
        name: "transpilation",
        label: "TypeScript",
        value: "typescript"
    },
    {
        name: "transpilation",
        label: "Vue",
        value: "vue"
    },
    {
      name: "transpilation",
      label: "Polymer",
      value: "polymer"
    },
    {
        name: "transpilation",
        label: "Disable Transpilation",
        value: ""
    }
];

const csspreprocessorOptions = [
    {
        name: "csspreprocessor",
        label: "CSS",
        value: "css"
    },
    {
        name: "csspreprocessor",
        label: "LESS",
        value: "less"
    },
    {
        name: "csspreprocessor",
        label: "SASS/SCSS",
        value: "scss"
    },
    {
        name: "csspreprocessor",
        label: "POSTCSS",
        value: "postcss"
    },
    {
        name: "csspreprocessor",
        label: "STYLUS",
        value: "stylus"
    },
    {
        name: "csspreprocessor",
        label: "Disable CSS Preprocessing",
        value: ""
    }
];

const lintOptions = [
    {
        name: "lint",
        label: "ESLint",
        value: "eslint",
    },
    {
        name: "lint",
        label: "JShint",
        value: "jshint"
    },
    {
         name: "lint",
         label: "Disable Linting",
         value: ""
    }
];

const formatOutputConfig = configObj => {
    let stringifiedConfig = JSON.stringify(configObj, null, 4);
    stringifiedConfig = stringifiedConfig.replace(/"\/\./g, "/\\.").replace(/\$\/"/g, "$/").replace(/"\//g, "/").replace(/\/"/g, "/");
    stringifiedConfig = stringifiedConfig.replace(/\"__/g, "__").replace(/\'\"/g, "\'");
    stringifiedConfig = stringifiedConfig.replace(/\\n\s+/g, "");
    stringifiedConfig = stringifiedConfig.replace(/\"MiniCssExtractPlugin.loader\"/g, "MiniCssExtractPlugin.loader");
    stringifiedConfig = stringifiedConfig.replace(/\"\[new/g, "[").replace(/\]\"/g, "]");
    stringifiedConfig = stringifiedConfig.replace(/\\\"/g,'"');
    stringifiedConfig = stringifiedConfig.replace(/\"\(loader\)/g,'(loader)');
    return stringifiedConfig;

};

const validateAssetDir = inputVal => {
    const normalizedPath = normalize(inputVal);
    const isValid = isValidPath(normalizedPath);
    return !isValid ? "Invalid Destination Directory path" : "";
}

const validateEntry = inputVal => {
    const normalizedPath = normalize(inputVal);
    const isValid = isValidPath(normalizedPath) && /\.js$/g.test(inputVal);
    return !isValid ? "Invalid Entry Point filepath" : "";
}
export {transpilationOptions, csspreprocessorOptions, lintOptions, formatOutputConfig, validateAssetDir, validateEntry};

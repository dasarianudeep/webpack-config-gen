const merge = require('lodash/merge');
const cloneDeep = require('lodash/cloneDeep');
const lintRule = require('./lint');
const transpileRule = require('./transpile');
const styleRule = require('./style');
const initialwebpackConfig = require('./basic');
const dependencyMap = require('./dependency-map');

const initialConfig = {
    mode: "development",
    entry: "src/index.js",
    dir: "static"
};

const initialModuleConfig = {
    module: {
        rules: []
    }
};

exports.getConfig = ({ initial = initialConfig, transpilation, style, lint, other = {}} = {}) => {
    let finalwebpackConfig = {}, dependencyLoaders = [];
    if (initial.entry !== initialConfig.entry || initial.dir !== initialConfig.dir) {
        if (other.mode) {
            finalwebpackConfig.mode = "production";
        } else {
            finalwebpackConfig.mode = "development";
        }
        finalwebpackConfig.entry = initial.entry;
        finalwebpackConfig.output = {
            path: initialwebpackConfig.output.path.replace('static', initial.dir),
            filename: initialwebpackConfig.output.filename
        };
    } else {
        finalwebpackConfig = cloneDeep(initialwebpackConfig);
        if (other.mode) {
            finalwebpackConfig.mode = "production";
        } else {
            finalwebpackConfig.mode = "development";
        }
    }
    if (other.sourcemaps) {
        finalwebpackConfig.devtool = "source-map";
    }
    if (transpilation || style || lint) {
        finalwebpackConfig = merge(finalwebpackConfig, initialModuleConfig);
    }
    if (lint) {
        finalwebpackConfig.module.rules.push(lintRule[lint]);
        dependencyLoaders.push(...dependencyMap[lint])
    }

    if (transpilation) {
        finalwebpackConfig.module.rules.push(transpileRule[transpilation]);
        dependencyLoaders.push(...dependencyMap[transpilation])
    }

    if (style) {
        finalwebpackConfig.module.rules.push(styleRule[style]);
        dependencyLoaders.push(...dependencyMap[style])

    }
    if (other.cssextract) {
        const currentRules = finalwebpackConfig.module.rules;
        const finalRules = currentRules.map(rule => {
            if (rule.use && Array.isArray(rule.use) && rule.use[0] === 'style-loader') {
                rule.use[0] = "MiniCssExtractPlugin.loader";
            }
            return rule;
        });
        finalwebpackConfig.module.rules = finalRules;
        finalwebpackConfig.plugins = '[new MiniCssExtractPlugin({filename: "[name]-[contenthash:8].css"})]';
        dependencyLoaders = dependencyLoaders.map(dep => {
            if (dep === "style-loader") {
                dep = "mini-css-extract-plugin";
                return dep;
            }
            return dep;
        })
    } else {
        const currentRules = finalwebpackConfig.module && finalwebpackConfig.module.rules;
        const finalRules = currentRules && currentRules.map(rule => {
            if (rule.use && Array.isArray(rule.use) && rule.use[0] === 'MiniCssExtractPlugin.loader') {
                rule.use[0] = "style-loader";
            }
            return rule;
        });
        if (finalwebpackConfig.module && finalwebpackConfig.module.rules ) {
            finalwebpackConfig.module.rules = finalRules;
        }
    }
    return {finalwebpackConfig, dependencyLoaders};
}

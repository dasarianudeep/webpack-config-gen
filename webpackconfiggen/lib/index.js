const merge = require('lodash/merge');
const lintRule = require('./lint');
const transpileRule = require('./transpile');
const styleRule = require('./style');
const initialwebpackConfig = require('./basic');

const initialConfig = {
    entry: "src/app.js",
    dir: "static"
};

const initialModuleConfig = {
    module: {
        rules: []
    }
};

exports.getConfig = ({ initial = initialConfig, transpilation, style, lint, other}) => {
    let finalwebpackConfig = {};
    if (initial.entry !== initialConfig.entry || initial.dir !== initialConfig.dir) {
        finalwebpackConfig.entry = initial.entry;
        finalwebpackConfig.output = {
            path: initialwebpackConfig.output.path.replace('static', initial.dir),
            filename: initialwebpackConfig.output.filename
        };
    } else {
        finalwebpackConfig = initialwebpackConfig;
    }

    if (transpilation || style || lint || other) {
        finalwebpackConfig = merge(finalwebpackConfig, initialModuleConfig);
    }
    if (lint) {
        finalwebpackConfig.module.rules.push(lintRule[lint])
    }

    if (transpilation) {
        finalwebpackConfig.module.rules.push(transpileRule[transpilation]);
    }

    if (style) {
        finalwebpackConfig.module.rules.push(styleRule[style]);
    }
    require('fs').writeFileSync(__dirname+'/res.json', JSON.stringify(finalwebpackConfig, null, '\t'))
    return finalwebpackConfig;
}

// pug 浏览器端 模版编译脚本
const fs = require('fs');
const _pug = require('pug');
const path = require('path');
const minimist = require('minimist');

let knownOptions = {
    default: {
        path: './src/template/part',
        outPath: './src/js/common/pug-templates.js', // './pug-templates.js',
        runTimePath: './node_modules/pug-runtime/index.js'
    }
};

let options = minimist(process.argv.slice(2), knownOptions);

let buildPath = options.path;
let outPath = options.outPath;
let runTimePath = options.runTimePath;

let compileFile = (filePath) => {
    let str = '';
    let templateIds = [];
    let filenames = fs.readdirSync(filePath); //返回一个包含“指定目录下所有文件名称”的数组对象。
    for (let i = 0; i < filenames.length; i++) {
        let filename = filenames[i];
        let fileDir = path.join(filePath, filename);
        let templateId = filename.split('.')[0];
        let funName = templateId;
        if (templateId.indexOf('-')) {
            funName = templateId.split('-').join('_');
            templateIds.push(`'${templateId}':${funName}`);
        }
        templateIds.push(`${funName}:${funName}`);
        str += _pug.compileFileClient(fileDir, {
            name: funName,
            inlineRuntimeFunctions: false,
            compileDebug: false
        });
    }
    return str + `var obj = {${templateIds.join(',')}}`;
};

let runtime = fs.readFileSync(runTimePath, 'utf8');

let templateFn = compileFile(buildPath);

let pugTemplates = `(function() {
    //runtime
    ${runtime}
    //模版方法和 var obj = { templateFn: 'function' };
    ${templateFn}
    //模版接口
    window.pugHtml = function(templateId, op) {
        return obj[templateId](op);
    };
})();
`;

fs.writeFileSync(outPath, pugTemplates);

// node pug-client.js --path ./src/template/part --outPath ./pug-templates.js

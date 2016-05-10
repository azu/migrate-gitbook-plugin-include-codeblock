// LICENSE : MIT
"use strict";
const remark = require("remark");
const select = require('unist-util-select');
const isURL = require("is-url");
const path = require("path");
const parse = (content) => {
    try {
        return remark.parse(content);
    } catch (error) {
        throw new Error("Markdown parse error ", error);
    }
};
const replaceRange = (string, start, end, substitute)=> {
    return string.substring(0, start) + substitute + string.substring(end);
};
export function replaceLabel(label, url) {
    const labelValue = label.value;
    if (!labelValue) {
        return label;
    }
    if (labelValue.indexOf("title:") !== -1) {
        return label;
    }
    if (isURL(url)) {
        return label;
    }
    const basename = path.basename(url);
    // Pattern 0
    // [import](path/to/code.js)
    const iRegExp = /^(import|include)$/;
    if (iRegExp.test(labelValue)) {
        label.value = `${labelValue}, title:"${basename}"`;
        return label
    }
    // Pattern 1
    // [import, code.js](path/to/code.js)
    if (labelValue.indexOf(basename) !== -1) {
        label.value = labelValue.replace(basename, `title:"${basename}"`);
        return label;
    }
    // Pattern 2
    // [import,](path/to/code.js)
    if (/,$/.test(labelValue)) {
        label.value = `${labelValue} title:"${basename}"`;
        return label;
    }
    // Pattern other
    // [import, xxx](path/to/code.js)
    label.value = `${labelValue}, title:"${basename}"`;
    return label;
}
export function transform(content) {
    const ast = parse(content);
    const allLinks = select(ast, 'link');
    let result = content;
    allLinks.forEach(link => {
        const importLabels = select(link, 'text[value*="import"]');
        const includeLabels = select(link, 'text[value*="include"]');
        const allLabels = [].concat(importLabels, includeLabels);
        allLabels.forEach(targetLabel => {
            const replacedLabel = replaceLabel(targetLabel, link.url);
            const position = replacedLabel.position;
            result = replaceRange(result, position.start.offset, position.end.offset, replacedLabel.value);
        });
    });
    return result;
}
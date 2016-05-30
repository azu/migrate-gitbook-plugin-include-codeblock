// LICENSE : MIT
"use strict";
const glob = require("glob");
const fs = require("fs");
import {transform} from "./transform-markdown";
export function execute(argv) {
    const pattern = process.argv[2];
    if(!pattern){
        console.log(`Usage: $ migrate-gitbook-plugin-include-codeblock "src/**/*.md"`);
        throw new Error("Should pass argument.")
    }

    const filePaths = glob.sync(pattern);
    if (filePaths.length === 0) {
        throw new Error(`${argv} is not match any files`);
    }

    filePaths.forEach(filePath => {
        const content = fs.readFileSync(filePath, "utf-8");
        const replacedContent = transform(content);
        if (content !== replacedContent && replacedContent) {
            fs.writeFileSync(filePath, replacedContent, "utf-8");
        }
    })
}
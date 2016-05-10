const assert = require("power-assert");
const path = require("path");
const fs = require("fs");
const read = (filePath) => {
    return fs.readFileSync(filePath, "utf-8");
};
import {transform} from "../src/transform-markdown";
function trim(str) {
    return str.replace(/^\s+|\s+$/, '');
}
it("show example", function () {
    const fixtureDirList = path.join(__dirname, 'fixtures');
    fs.readdirSync(fixtureDirList).map((caseName) => {
        const fixtureDir = path.join(fixtureDirList, caseName);
        let actualPath = path.join(fixtureDir, 'actual.md');
        const actual = read(actualPath);

        if (path.sep === '\\') {
            // Specific case of windows, transformFileSync return code with '/'
            actualPath = actualPath.replace(/\\/g, '/');
        }

        const expected = transform(actual);

        console.log("");
        console.log("```");
        console.log(`
${trim(actual)}

=>

${trim(expected)}
`);
        console.log("```")
    });
});
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
describe("transform", function () {
    const fixtureDirList = path.join(__dirname, 'fixtures');
    fs.readdirSync(fixtureDirList).map((caseName) => {
        it(`should ${caseName.split('-').join(' ')}`, () => {
            const fixtureDir = path.join(fixtureDirList, caseName);
            let actualPath = path.join(fixtureDir, 'actual.md');
            const actual = transform(read(actualPath));

            if (path.sep === '\\') {
                // Specific case of windows, transformFileSync return code with '/'
                actualPath = actualPath.replace(/\\/g, '/');
            }

            const expected = read(path.join(fixtureDir, 'expected.md'))
                .toString().replace(/%FIXTURE_PATH%/g, actualPath);

            const actualResult = trim(actual);
            const expectedResult = trim(expected);
            assert.equal(actualResult, expectedResult);
        });
    });
});
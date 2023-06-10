// Write your tests here!
const { expect } = require("chai");
const { polybius } = require("../src/polybius");

describe("GK Tests", () => {
    describe("polybius error handling", () => {
        it("Should return 42 for 'i' or 'j'", () => {
            const message = "ij";
            const expected = "4242";
            const actual = polybius(message, encode = true);
            expect(actual).to.equal(expected);
        });
        it("Should decode 42 to ij", () => {
            const message = "42";
            const expected = "ij";
            const actual = polybius(message, encode = false);
            expect(actual).to.equal(expected);
        });
        it("Should treat capital and lowercase letters the same", () => {
            const message = "A";
            const expected = "11";
            const actual = polybius(message, encode = true);
            expect(actual).to.equal(expected);
        });
        it("Should maintain spaces during encode", () => {
            const message = "my message";
            const expected = "2345 23513434112251";
            const actual = polybius(message, encode = true);
            expect(actual).to.equal(expected);
        });
        it("Should maintain spaces during decode", () => {
            const message = "2345 23513434112251";
            const expected = "my message";
            const actual = polybius(message, encode = false);
            expect(actual).to.equal(expected);
        });
    });
});
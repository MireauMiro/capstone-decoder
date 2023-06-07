// Write your tests here!
const { expect } = require("chai");
const { polybius } = require("../src/polybius");

describe ("polybius", () => {
    it("Should return 42 for 'i' or 'j'", () => {
        const message = "ij";
        const expected = "4242";
        const actual = polybius(message, encode = true);
        expect(actual).to.equal(expected);
    });
});
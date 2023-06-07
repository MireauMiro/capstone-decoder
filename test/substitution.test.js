// Write your tests here!
const { expect } = require("chai");
const { substitution } = require("../src/substitution");

describe ("substitution", () => {
    it("Should return an array ", () => {
        const message = "mEsSage";
        const alphabet = "plmoknijbuhvygctfxrdzeswaq";
        const expected = "ykrrpik";
        const actual = substitution(message, alphabet);
        expect(actual).to.equal(expected);
    });
});


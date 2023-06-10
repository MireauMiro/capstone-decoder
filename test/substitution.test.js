// Write your tests here!
const { expect } = require("chai");
const { substitution } = require("../src/substitution");

describe("GK Tests", () => {
    describe("substitution error handling", () => {
        it("Should return false if the swap alphabet isn't 26 characters exactly", () => {
            const message = "anything";
            const alphabet = "abcdefghijklmnopqrstuvwxya!";
            const actual = substitution(message, alphabet, encode = true);
            expect(actual).to.be.false;
        });
        it("correctly translate a phrase based on the provided alphabet", () => {
            const message = "translate";
            const alphabet = "qwertyuiopasdfghjklzxcvbnm";
            const expected = "zkqflsqzt";
            const actual = substitution(message, alphabet, encode = true);
            expect(actual).to.equal(expected);
        });
        it("should return false if there are duplicate characters in the alphabet provided", () => {
            const message = "anything";
            const alphabet = "qwwrtyuiopasdfghjklzxcvbnm";
            const actual = substitution(message, alphabet, encode = true);
            expect(actual).to.be.false;
        });
        it("should maintain spaces in the message during encode", () => {
            const message = "translate me";
            const alphabet = "qwertyuiopasdfghjklzxcvbnm";
            const expected = "zkqflsqzt dt";
            const actual = substitution(message, alphabet, encode = true);
            expect(actual).to.equal(expected);
        });
        it("should maintain spaces in the message during decode", () => {
            const message = "zkqflsqzt dt";
            const alphabet = "qwertyuiopasdfghjklzxcvbnm";
            const expected = "translate me";
            const actual = substitution(message, alphabet, encode = false);
            expect(actual).to.equal(expected);
        });
        it("should treat capital and lower case letters the same", () => {
            const message = "Translate Me";
            const alphabet = "qwertyuiopasdfghjklzxcvbnm";
            const expected = "zkqflsqzt dt";
            const actual = substitution(message, alphabet, encode = true);
            expect(actual).to.equal(expected);
        });
    });
});

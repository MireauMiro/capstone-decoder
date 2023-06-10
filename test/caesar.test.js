// Write your tests here!

const { expect } = require("chai");
const { caesar } = require("../src/caesar");

describe("GK Tests", () => {
  describe("caesar error handling", () => {
    it("should return false if the shift amount is 0", () => {
      const message = "any";
      const shift = 0;
      const actual = caesar(message, shift);
      expect(actual).to.be.false;
    });
    it("should return false if the shift amount is less than -25", () => {
      const message = "any";
      const shift = -26;
      const actual = caesar(message, shift);
      expect(actual).to.be.false;
    });
    it("should return false if the shift amount is greater than 25", () => {
      const message = "any";
      const shift = 26;
      const actual = caesar(message, shift);
      expect(actual).to.be.false;
    });
    it("should ignore capital letters", () => {
      const message = "A";
      const shift = 1;
      const actual = caesar(message, shift);
      const expected = "b";
      expect(actual).to.equal(expected);
    });
    it("should accept shifts that reach the end of the alphabet", () => {
      const message = "z";
      const shift = 3;
      const actual = caesar(message, shift);
      const expected = "c";
      expect(actual).to.equal(expected);
    });
    it("should accept spaces and other non-letter characters", () => {
      const message = "abc def.";
      const shift = 1;
      const actual = caesar(message, shift);
      const expected = "bcd efg.";
      expect(actual).to.equal(expected);
    });
  });


});

// 
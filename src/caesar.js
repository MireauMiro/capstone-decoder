// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const caesarModule = (function () {
  
  // this is a set of characters to check against to help us "do nothing" for spaces or punctuation
  const convertableCharacters = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
  ]
  // this object lets us associate a number to the characters, we can add / subtract from the numbers to produce a new character
  const orderedAlphabet = {
    1:"a", 2:"b", 3:"c", 4:"d", 5:"e", 6:"f", 7:"g", 8:"h", 9:"i", 10:"j", 11:"k", 12:"l", 13:"m", 14:"n", 15:"o", 16:"p", 17:"q", 18:"r", 19:"s", 20:"t", 21:"u", 22:"v", 23:"w", 24:"x", 25:"y", 26:"z"
  }

  // this is the length of the alphabet we are using, which will help us wrap to the beginning or end if the shift number goes above this number
  const alphabetLength = convertableCharacters.length;

  function caesar(input, shift, encode = true) {

      if (shift === 0 || shift > 25 || shift < -25) {
        return false;
      }

      // first we take the input and set everything to lowercase since that is the min requirement and lets us forget about what to do with capitals
      function caseFormatting (input) {
        return input.toLowerCase();
      }

      // we use the helper function from above to reformat the input
      const text = caseFormatting(input);

      // here we declare an empty string variable to fill with our new encoded or decoded message
      let result = "";

      // here we make a loop to go through each character in the reformatted input
      for (let i = 0; i < text.length; i++) {
        
        // this assigns a variable to the current character
        let character = text[i];

        // this checks if the current character is included in our list at the top of characters we can convert from the alphabet. It will pass over spaces and punctuation 
        if (convertableCharacters.includes(character)) {

          // this tells the script to look for the current character in our numbered character object
          for (const key in orderedAlphabet) {

            // when it hits the correct character...
            if (orderedAlphabet.hasOwnProperty(key)) {
              const letter = orderedAlphabet[key];

              // and confirms that the current character matches that character number/character pair
              if (character === letter) {
                
                // then shift the character by the shift provided in the input
                let keyShift;
                if (encode === true) {
                  // this is for encoding
                  keyShift = Number(key) + shift;
                } else {
                  // this is for decoding
                  keyShift = Number(key) - shift;
                }

                // however, if the key is longer than the alphabet length use this modulo to wrap back around to the beginning
                if (keyShift > alphabetLength) {
                  keyShift = keyShift % alphabetLength;
                }

                // the modulo doesn't work for negative numbers, so if the decode shift puts us negative, we add the alphabet length to handle the wrap
                while (keyShift <= 0) {
                  keyShift += alphabetLength;
                }

                // this gives us a new character - the break stops the loop since we should only find one match per loop anyway
                character = orderedAlphabet[keyShift];
                
                break;
              }
            }
          }
          result += character;
        } else {
          result += character;
        } 
      };
      return result
    }

  return {
    caesar,
  };
})();

module.exports = { caesar: caesarModule.caesar };

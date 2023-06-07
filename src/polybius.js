// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const polybiusModule = (function () {

    // this is a set of characters to check against to help us "do nothing" for spaces or punctuation - Numbers 1-5 are added in this one for the decode
    const convertableCharacters = [
      "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
      "1", "2", "3", "4", "5"
    ]
    // this object lets us associate a number to the characters
    const cipherAlphabet = {
      11:"a", 21:"b", 31:"c", 41:"d", 51:"e", 12:"f", 22:"g", 32:"h", 42:"ij", 52:"k", 13:"l", 23:"m", 33:"n", 43:"o", 53:"p", 14:"q", 24:"r", 34:"s", 44:"t", 54:"u", 15:"v", 25:"w", 35:"x", 45:"y", 55:"z"
    }

    
  function polybius(input, encode = true) {

    // first we take the input and set everything to lowercase since that is the min requirement and lets us forget about what to do with capitals
    function caseFormatting (input) {
      return input.toLowerCase();
    }

    // we use the helper function from above to reformat the input
    const text = caseFormatting(input);

    // this is an empty variable to hold our encoded or decoded message
    let result = "";

      // for encoding    
      if (encode === true) { 
        // for each character in the text
        for (let i = 0; i < text.length; i++) {
          let character = text[i];
          // if the character is in the convertable list (ie, skip spaces and punctuation)
          if (convertableCharacters.includes(character)) {
            // match the current character to the corresponding key/value in the cipher
            for (const key in cipherAlphabet) {
              const letter = cipherAlphabet[key];
              // if we find a match, replace the character with the associated number and stop the loop (with some exceptions for i and j)
              if (character === "i" || character === "j") {
                character = 42;
                result += character;
                break;
              }
              if (character === letter) {
                character = key;
                result += character;
                break;
              }
            }
          } else {
            // if we don't find that character match, just drop the character unchanged into the result (for spaces etc)
            result += character;
          }
        }
      } else {
        // for decoding

        // check if the number of convertable digits is even
        let numTotal = 0;
        for (let i = 0; i <text.length ; i++) {
          const character = text[i];
          if (["1", "2", "3", "4", "5"].includes(character)) {
            numTotal++;
          }
        }
        if (numTotal % 2 === 1) {
          return false;
        }

        // for every 2 characters, we want to loop through the cipher and find the key that matches the 2 digit number
        for (let i = 0; i < text.length; i+=2) {
          const firstCharacter = text[i];
          const secondCharacter = text[i + 1];
          let characters = `${firstCharacter}${secondCharacter}`;
          // if we encounter a space, we need to register it into the result and otherwise skip over it
          if (!convertableCharacters.includes(firstCharacter)) {
            result += firstCharacter; // add spaces or other characters with no conversion
            i--; // skip back one since we are iterating by 2 in this loop to get to the first digit of the next convertable character
            continue; 
          }

          // this is the cipher loop
          for (const key in cipherAlphabet) {
            const cipher = cipherAlphabet[key];
            // when we find a match, we replace the 2 digit number with the corresponding letter in the cipher, 
            // then break the loop since we should only find one match
            if (characters === key) {
              // here's the exception for ij since that busts our cipher object
              if (characters === "42") {
                characters = "ij";
                result += characters;
                break; 
              }
              characters = cipher;
              result += characters;
              break;              
            }
          }
        }
      }
    
    return result;
  }

  return {
    polybius,
  };
})();

module.exports = { polybius: polybiusModule.polybius };

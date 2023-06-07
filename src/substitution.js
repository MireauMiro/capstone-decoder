// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const substitutionModule = (function () {
  // you can add any code you want within this function scope

    // this is a set of characters to check against to help us "do nothing" for spaces or punctuation
    const convertableCharacters = [
      "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
    ]

  function substitution(input, alphabet, encode = true) {
    // your solution code here
    
    // if the swap alphabet doesn't exist or isn't exactly 26 return false
    if (!alphabet || alphabet.length === 0 || alphabet.length !== 26) {
      return false;
    }

    // next we need to check if the swap alphabet is ALL unique
    function checkCharacterUniqueness (alphabet) {
      for (let i = 0; i < alphabet.length; i++) {
        let character = alphabet[i];
        for (let j = i + 1; j < alphabet.length; j++ ) {
          if (character === alphabet[j]) {
            return false;
          }
        }
      }
      return true;
    }
    if (!checkCharacterUniqueness(alphabet)) {
      return false;
    }

    // now that we've checked the alphabet for uniqueness, let's create an array of the swap alphabet
    let swapKey = alphabet.toLowerCase();
    let swapArray = swapKey.split("");

    // Next we take the input and set everything to lowercase since that is the min requirement and lets us forget about what to do with capitals
    function caseFormatting (input) {
      return input.toLowerCase();
    }

    // we use the helper function from above to reformat the input
    const text = caseFormatting(input);

    // this is an empty variable to hold our encoded or decoded message
    let result = "";

    // next we'll loop through each character in the input
    for (let i = 0; i < text.length; i++) {
      
      // set a veriable to look at the current character
      let character = text[i];
      
      // check if the character is in the list of convertiable characters - this is to skip over spaces/punctuation
      if (convertableCharacters.includes(character) && encode === true) {
          // if we are encoding, we want to replace the existing character with a swapped character
          for (let j = 0; j < convertableCharacters.length; j++) {
            if (character === convertableCharacters[j]) {
              character = swapArray[j];
              result += character;
              break;
            }
          }
          
      } else if (swapArray.includes(character) && encode === false) {
          // if we are decoding, we want to replace the existing character with the original character
          for (let j = 0; j < swapArray.length; j++) {
            if (character === swapArray[j]) {
              character = convertableCharacters[j];
              result += character;
              break;
            }
          }
      } else {
        // if it's a space or punctuation just add it to the result normally
        result += character;
      }

    } 
      
    return result;
  }


  return {
    substitution,
  };
})();

module.exports = { substitution: substitutionModule.substitution };

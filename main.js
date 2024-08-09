/**
 * Hello SOC team! This task is to write a function named `isPalindrome` which takes in a string 🧶
 * and returns true if the string is a palindrome (reads the same forwards and backwards), otherwise false.
 * An example of a palindrome would be KAYAK, DEED, WOW ect.  🧚‍♀️
 *
 * The function should ignore spaces, punctuation, and capitalization. 🦺
 *
 * Examples:
 *   isPalindrome("A man, a plan, a canal, Panama") SHOULD HOPEFULLY (fingers crossed) 🤞 return TRUE
 *   isPalindrome("racecar") should return TRUE 🌟
 *   isPalindrome("hello") should return FALSE, hopefully this is explained well enough.. 🍄
 */



// Function to check if a string is a palindrome
function isPalindrome(str) {
    const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    return cleanedStr === cleanedStr.split("").reverse().join("");
  }
  
  module.exports = { isPalindrome };
  
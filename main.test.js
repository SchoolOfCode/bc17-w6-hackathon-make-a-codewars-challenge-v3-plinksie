import { test, expect } from "vitest";
import { isPalindrome } from "./main.js";

test("should return true for a palindrome with punctuation and spaces", () => {
  const expected = true;
  const actual = isPalindrome("A man, a plan, a canal, Panama");
  expect(actual).toBe(expected);
});

test("should return true for a simple palindrome", () => {
  const expected = true;
  const actual = isPalindrome("racecar");
  expect(actual).toBe(expected);
});

test("should return false for a non-palindrome", () => {
  const expected = false;
  const actual = isPalindrome("hello");
  expect(actual).toBe(expected);
});

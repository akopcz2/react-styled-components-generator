const capitalize = require('./capitalize');

test('Returns the word hello as Hello', () => {
  expect(capitalize('hello')).toEqual("Hello");
});

test('Returns false as arg is not a string', () => {
  expect(capitalize(['hello'])).toEqual(false);
});

test('Returns the word Hello as is', () => {
  expect(capitalize('Hello')).toEqual("Hello");
});


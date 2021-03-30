import {splitParagraphs, splitAndKeepDelimiters, sentenceParagraphsToCSV} from '../sentence_splitter';

test('split sentences without end delimiter', () => {
  expect(splitAndKeepDelimiters("this and. that", "\\.+")).toStrictEqual(["this and.", " that"]);
});

test('split sentences with end delimiter', () => {
  expect(splitAndKeepDelimiters("this and. that.", "\\.+")).toStrictEqual(["this and.", " that."]);
});

test('split paragraphs', () => {
  expect(splitParagraphs("this and.\n that.\n", "\\n", "\\.+")).toStrictEqual([["this and."], [" that."]]);
});

test('CSV data has correct number of rows', () => {
  const input = [
    ['p1 s1', 'p1 s2', 'p1 s3', 'p1 s4'],
    ['p2 s1', 'p2 s2', 'p2 s3', 'p2 s4'],
    ['p3 s1', 'p3 s2', 'p3 s3', 'p3 s4'],
  ]

  const output = sentenceParagraphsToCSV(1, input);
  expect(output.split('\n').length).toBe(12 + 1);
});

test('CSV data has correct number of cols per row', () => {
  const input = [
    ['p1 s1', 'p1 s2', 'p1 s3', 'p1 s4'],
    ['p2 s1', 'p2 s2', 'p2 s3', 'p2 s4'],
    ['p3 s1', 'p3 s2', 'p3 s3', 'p3 s4'],
  ]

  const output = sentenceParagraphsToCSV(1, input);
  output.split('\n').slice(0, -1).forEach((row) => {
    expect(row.split(',').length).toBe(3);
  })
});

test('CSV data has correct first row', () => {
  const input = [
    ['p1 s1', 'p1 s2', 'p1 s3', 'p1 s4'],
    ['p2 s1', 'p2 s2', 'p2 s3', 'p2 s4'],
    ['p3 s1', 'p3 s2', 'p3 s3', 'p3 s4'],
  ]

  const output = sentenceParagraphsToCSV(1, input);
  expect(output.split('\n')[0]).toBe(`"", "p1 s1", "p1 s2"`);
});

test('CSV data has correct second row', () => {
  const input = [
    ['p1 s1', 'p1 s2', 'p1 s3', 'p1 s4'],
    ['p2 s1', 'p2 s2', 'p2 s3', 'p2 s4'],
    ['p3 s1', 'p3 s2', 'p3 s3', 'p3 s4'],
  ]

  const output = sentenceParagraphsToCSV(1, input);
  expect(output.split('\n')[1]).toBe(`"p1 s1", "p1 s2", "p1 s3"`);
});

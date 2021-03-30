export function splitAndKeepDelimiters(input: string, regex: string) {
  const splitsAndDelimiters = input.split(RegExp(`(${regex})`, 'g'));

  let splits: string[] = [];

  for (let i = 0; i < splitsAndDelimiters.length; i += 2) {
    if (splitsAndDelimiters[i + 1]) {
      splits.push(splitsAndDelimiters[i] + splitsAndDelimiters[i + 1]);
    } else {
      splits.push(splitsAndDelimiters[i]);
    }
  }

  splits = splits.filter((element) => element.trim().length !== 0);
  return splits;
}

export function splitParagraphs(
  inputParagraphs: string,
  paragraphDelmiter: string,
  sentenceDelmiter: string,
) {
  const paragraphs: string[] = splitAndKeepDelimiters(inputParagraphs, paragraphDelmiter);
  return paragraphs.map(
    (paragraph) => splitAndKeepDelimiters(paragraph, sentenceDelmiter),
  );
}

export function sentenceParagraphsToCSV(
  contextSentenceCount: number,
  paragraphsAndSentences: string[][],
) {
  let CSVOutput = '';
  for (let i = 0; i < paragraphsAndSentences.length; i += 1) {
    for (let j = 0; j < paragraphsAndSentences[i].length; j += 1) {
      const sentencesBefore =
        paragraphsAndSentences[i]
          .slice(Math.max(0, j - contextSentenceCount - 1), j)
          .join('');

      const sentencesAfter =
        paragraphsAndSentences[i]
          .slice(j + 1, j + contextSentenceCount + 1)
          .join('');

      CSVOutput += `"${sentencesBefore}", "${paragraphsAndSentences[i][j]}", "${sentencesAfter}"\n`;
    }
  }
  return CSVOutput;
}

import React from 'react';
import ReactDOM from 'react-dom';
import { HelpMenuPopup, HelpMenuHeader, HelpMenuSubHeader } from './HelpMenuPopup.tsx';
import ParagraphsToCSV from './ParagraphsToCSV.tsx';

import './App.css';

ReactDOM.render(
  <>
    <div className="bg-blue-500 text-4xl">
      <div className="max-w-screen-md mx-auto text-white py-2 px-4">
        Paragraphs to Flashcards
      </div>
    </div>
    <div className="max-w-screen-md mx-auto">
      <ParagraphsToCSV />
    </div>
    <HelpMenuPopup>
      <HelpMenuHeader>
        Usage:
      </HelpMenuHeader>
      <div className="p-4">
        <HelpMenuSubHeader>
          Summary:
        </HelpMenuSubHeader>
        This page provides a way to turn a paragraph or two of text
        into a CSV file that can then be imported into a flashcard program like anki.

        <HelpMenuSubHeader>
          Input:
        </HelpMenuSubHeader>
        The language being parsed is selected from the language preset list
        and a set of paragraphs in the target language are input into the paragraphs field.

        <HelpMenuSubHeader>
          Output:
        </HelpMenuSubHeader>
        The output provided is a three column CSV file that has the format:
        <pre className="rounded display-inline p-2 bg-gray-200">{'<Sentences before>, <Focus sentence>, <Sentences after>'}</pre>
        This format allows the flash card program to focus the user on
        a single sentence but allow the user to examine the context that
        the sentence exists in.
      </div>
    </HelpMenuPopup>
  </>,

  document.getElementById('root'),
);

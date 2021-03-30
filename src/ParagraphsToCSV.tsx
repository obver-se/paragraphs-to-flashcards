import React from 'react';
import ReactDOM from 'react-dom';
import { saveAs } from 'file-saver';
import { splitParagraphs, sentenceParagraphsToCSV } from './sentence_splitter';
import Collapsible from './Collapsible';

class Preset {
  name: string;
  sentenceDelimiter: string;
  paragraphDelimiter: string;

  constructor(name: string, sentenceDelimiter: string, paragraphDelimiter: string) {
    this.name = name;
    this.sentenceDelimiter = sentenceDelimiter;
    this.paragraphDelimiter = paragraphDelimiter;
  }
}

interface ParagraphToCSVProps {}
interface ParagraphToCSVState {
  sentenceDelimiter: string,
  paragraphDelimiter: string,
  input: string,
  output: string,
  presetChoice: string,
  presets: {[key: string]: Preset}
}

export default class ParagraphsToCSV extends React.Component<ParagraphToCSVProps,
                                                             ParagraphToCSVState> {
  constructor(props: {}) {
    super(props);
    this.updateParagraphDelimiters = this.updateParagraphDelimiters.bind(this);
    this.updateSentenceDelimiters = this.updateSentenceDelimiters.bind(this);
    this.updateSentences = this.updateSentences.bind(this);
    this.pickPreset = this.pickPreset.bind(this);
    this.generateCSV = this.generateCSV.bind(this);
    this.download = this.download.bind(this);

    this.state = {
      sentenceDelimiter: '\\.',
      paragraphDelimiter: '\\n',
      input: '',
      output: '',
      presetChoice: 'Japanese',
      presets: {
        Japanese: new Preset('Japanese', '！|？|。', '\\n'),
        English: new Preset('English', '!|?|.', '\\n'),
        Custom: new Preset('Custom', '!|?|.', '\\n'),
      },
    };
  }

  componentDidMount() {
    const { presetChoice } = this.state;
    this.updateInputFromPreset(presetChoice);
  }

  updateParagraphDelimiters(event: React.ChangeEvent<HTMLInputElement>) {
    // Modify the preset and the update the inputs to match the preset
    const { value } = event.target;
    const { sentenceDelimiter } = this.state;
    this.setState(
      (prevState) => ({
        presets: {
          ...prevState.presets,
          Custom: new Preset('Custom', sentenceDelimiter, value),
        },
      }),
    );

    this.updateInputFromPreset('Custom');
  }

  updateSentenceDelimiters(event: React.ChangeEvent<HTMLInputElement>) {
    // Modify the preset and the update the inputs to match the preset
    const { value } = event.target;
    const { paragraphDelimiter } = this.state;
    this.setState(
      (prevState) => ({
        presets: {
          ...prevState.presets,
          Custom: new Preset('Custom', value, paragraphDelimiter),
        },
      }),
    );

    this.updateInputFromPreset('Custom');
  }

  updateSentences(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ input: event.target.value });
  }

  pickPreset(event: React.ChangeEvent<HTMLSelectElement>) {
    this.updateInputFromPreset(event.target.value);
  }

  updateInputFromPreset(preset: string) {
    this.setState(
      (prevState: ParagraphToCSVState) => ({
        paragraphDelimiter: prevState.presets[preset].paragraphDelimiter,
        sentenceDelimiter: prevState.presets[preset].sentenceDelimiter,
        presetChoice: preset,
      }),
    );
  }

  download() {
    const { output } = this.state;
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'sentencesWithContext.csv');
  }

  generateCSV() {
    const { input, paragraphDelimiter, sentenceDelimiter } = this.state;
    const output = splitParagraphs(input, paragraphDelimiter, sentenceDelimiter);
    const CSVOutput = sentenceParagraphsToCSV(3, output);

    this.setState({ output: CSVOutput });
  }

  render() {
    const {
      presetChoice, presets,
      sentenceDelimiter, paragraphDelimiter,
      input, output,
    } = this.state;
    return (
      <div className="py-2 px-4">
        <div className="relative w-full float-left pt-1">
          <label htmlFor="preset">
            Language preset:
            <div
              id="preset"
              className="absolute right-6 z-0 float-right
                         pointer-events-none select-none
                         text-gray-500
                         mt-2 mr-1.5 w-0"
            >
              ▼
            </div>
            <select
              required
              className="appearance-none bg-transparent w-full float-left
                         focus:ring-2 focus:ring-blue-500 border
                         px-3 py-2 border-blue-500 rounded"
              name="preset"
              onChange={this.pickPreset}
              value={presetChoice}
            >
              {
                Object.entries(presets).map(([option]) => (
                  <option value={option}>{option}</option>
                ))
              }
            </select>
          </label>
        </div>
        <Collapsible title="Advanced settings">
          <div
            className="float-left
                       w-full md:w-1/2
                       py-1 md:py-2 md:pr-2"
          >
            <label htmlFor="sentence-deliminators">
              Sentence delimiter (regex):
              <input
                type="text"
                className="w-full px-1
                           focus:ring-2 focus:ring-blue-500
                           border border-blue-500 rounded"
                name="sentence-delimiters"
                value={sentenceDelimiter}
                onChange={this.updateSentenceDelimiters}
              />
            </label>
          </div>
          <div
            className="float-left
                       w-full md:w-1/2
                       py-1 md:py-2 md:pl-2"
          >
            <label htmlFor="paragraph-delimiters">
              Paragraph delimiter (regex):
              <input
                type="text"
                className="w-full px-1
                           focus:ring-2 focus:ring-blue-500
                           border border-blue-500 rounded"
                name="sentence-delimiters"
                value={paragraphDelimiter}
                onChange={this.updateParagraphDelimiters}
              />
            </label>
          </div>
        </Collapsible>
        <div className="py-1 clear-both">
          <label htmlFor="input-paragraphs">
            Input paragraphs:
            <textarea
              className="w-full px-1
                         focus:ring-2 focus:ring-blue-500
                         border border-blue-500 rounded"
              name="input-paragraphs"
              rows={10}
              value={input}
              onChange={this.updateSentences}
            />
          </label>
        </div>
        <button
          type="button"
          className="mt-2 w-full md:w-1/2 md:max-w-xs
                     bg-blue-500 hover:bg-blue-700
                     text-white font-bold py-2 px-4 rounded"
          onClick={this.generateCSV}
        >
          Create CSV
        </button>
        { output.length !== 0 ? (
          <>
            <div>Output CSV: </div>
            <textarea
              readOnly
              className="whitespace-pre text-gray-400 text-xs w-full mt-2 border px-1 border-blue-500 rounded"
              name="output-csv"
              rows={10}
              value={output}
            />
            <button
              type="button"
              className="mt-2 w-1/2 max-w-xs bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={this.download}
            >
              Download
            </button>
          </>
        ) : null }
      </div>
    );
  }
}

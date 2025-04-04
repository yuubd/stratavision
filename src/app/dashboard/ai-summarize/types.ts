interface TextPosition {
  text: string;
  startIndex: number;
  endIndex: number;
}

interface PageHighlightData {
  pageNumber: number;
  textPositions: TextPosition[];
}

export interface QuestionAnswer {
  question: string;
  answer: string;
  location: string;
  highlightData?: PageHighlightData[];
}

export interface Section {
  title: string;
  subsections: Subsection[];
}

export interface Subsection {
  title: string;
  questions: QuestionAnswer[];
}

export interface DocumentSummaryData {
  strataNumber: string;
  sections: Section[];
} 
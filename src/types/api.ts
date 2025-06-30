// Shared API types for both backend and frontend

export interface TextPosition {
  text: string;
  startIndex: number;
  endIndex: number;
}

export interface PageHighlightData {
  pageNumber: number;
  textPositions: TextPosition[];
}

export interface QuestionAnswer {
  question: string;
  answer: string;
  location: string;
  highlightData?: PageHighlightData[];
}

export interface Subsection {
  title: string;
  questions: QuestionAnswer[];
}

export interface Section {
  title: string;
  subsections: Subsection[];
}

export interface SummaryDataResponse {
  strataNumber: string;
  sections: Section[];
  pdfPath: string;
} 
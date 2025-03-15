export interface QuestionAnswer {
  question: string;
  answer: string;
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
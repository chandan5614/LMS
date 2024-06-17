// book.model.ts
export interface Branch {
  _id: string;
  branch_id: string;
  name: string;
  location: string;
}

export interface Book {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  copies: Copy[];
  expanded?: boolean; // Added property for expand/collapse
  inCart?: boolean;
}

export interface Copy {
  branchName: string;
  copiesDetails: CopyDetail[];
}

export interface CopyDetail {
  copyNumber: number;
  status: string;
}


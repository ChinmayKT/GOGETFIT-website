export interface LegalSection {
  id: string;
  number: string;
  title: string;
  content: string[];
}

export interface LegalPageData {
  eyebrow: string;
  title: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export enum SectionId {
  KP = 'KeyPartners',
  KA = 'KeyActivities',
  KR = 'KeyResources',
  VP = 'ValuePropositions',
  CR = 'CustomerRelationships',
  CH = 'Channels',
  CS = 'CustomerSegments',
  C$ = 'CostStructure',
  R$ = 'RevenueStreams'
}

export interface CanvasItem {
  id: string;
  title: string;
  items: string[];
  description: string;
  icon: React.ReactNode;
  color: string;
}

export interface FinancialData {
  year: string;
  turnover: number;
  wages: number;
  profit: number;
}

export interface RevenueMix {
  year: string;
  matchday: number;
  broadcasting: number;
  commercial: number;
  retail: number;
  property: number;
}
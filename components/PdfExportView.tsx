import React from 'react';
import { SectionId, CanvasItem } from '../types';
import { CanvasCard } from './CanvasCard';
import { AnalysisView } from './AnalysisView';
import { FinancialChart } from './FinancialChart';

interface PdfExportViewProps {
  data: Record<SectionId, CanvasItem>;
}

export const PdfExportView: React.FC<PdfExportViewProps> = ({ data }) => {
  return (
    <div className="bg-white text-slate-900" style={{ width: '1200px' }}>
      
      {/* Page 1: Title & Business Model Canvas */}
      <div id="pdf-part-1" className="p-12 min-h-screen">
        <div className="mb-8 border-b-2 border-red-900 pb-4">
           <h1 className="text-4xl font-bold text-red-900">Arsenal FC</h1>
           <p className="text-xl text-slate-600">Rapport de Contrôle de Gestion & Business Model</p>
           <p className="text-sm text-slate-400 mt-2">Saison 2008</p>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-slate-800">1. Business Model Canvas</h2>
        
        {/* Simplified Grid for PDF (3 columns roughly) */}
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-1 space-y-4">
             <CanvasCard data={data[SectionId.KP]} onClick={() => {}} isActive={false} className="h-[400px]"/>
          </div>
          <div className="col-span-1 space-y-4">
             <CanvasCard data={data[SectionId.KA]} onClick={() => {}} isActive={false} className="h-[190px]"/>
             <CanvasCard data={data[SectionId.KR]} onClick={() => {}} isActive={false} className="h-[190px]"/>
          </div>
           <div className="col-span-1 space-y-4">
             <CanvasCard data={data[SectionId.VP]} onClick={() => {}} isActive={false} className="h-[400px]"/>
          </div>
           <div className="col-span-1 space-y-4">
             <CanvasCard data={data[SectionId.CR]} onClick={() => {}} isActive={false} className="h-[190px]"/>
             <CanvasCard data={data[SectionId.CH]} onClick={() => {}} isActive={false} className="h-[190px]"/>
          </div>
           <div className="col-span-1 space-y-4">
             <CanvasCard data={data[SectionId.CS]} onClick={() => {}} isActive={false} className="h-[400px]"/>
          </div>
          <div className="col-span-2.5">
             <CanvasCard data={data[SectionId.C$]} onClick={() => {}} isActive={false} className="h-[150px]"/>
          </div>
          <div className="col-span-2.5">
             <CanvasCard data={data[SectionId.R$]} onClick={() => {}} isActive={false} className="h-[150px]"/>
          </div>
        </div>
      </div>

      {/* Page 2: Analysis */}
      <div id="pdf-part-2" className="p-12 min-h-screen flex flex-col justify-center">
         <div className="mb-8 border-b border-slate-200 pb-4">
           <h2 className="text-2xl font-bold text-slate-800">2. Analyse Stratégique</h2>
        </div>
        <AnalysisView className="grid grid-cols-2 gap-8" />
      </div>

      {/* Page 3: Financials */}
      <div id="pdf-part-3" className="p-12 min-h-screen flex flex-col justify-center">
        <div className="mb-8 border-b border-slate-200 pb-4">
           <h2 className="text-2xl font-bold text-slate-800">3. Performance Financière</h2>
        </div>
        <FinancialChart className="space-y-8" />
      </div>

    </div>
  );
};
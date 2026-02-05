import React, { useState } from 'react';
import { 
  Users, 
  Activity, 
  Box, 
  Gift, 
  Heart, 
  Truck, 
  Target, 
  CreditCard, 
  DollarSign, 
  PieChart, 
  LayoutTemplate,
  Download,
  Loader2
} from 'lucide-react';
import { SectionId, CanvasItem } from './types';
import { CanvasCard } from './components/CanvasCard';
import { AnalysisView } from './components/AnalysisView';
import { FinancialChart } from './components/FinancialChart';
import { PdfExportView } from './components/PdfExportView';

// Imports for PDF generation
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Data strictly based on the PDF
const businessModelData: Record<SectionId, CanvasItem> = {
  [SectionId.KP]: {
    id: SectionId.KP,
    title: 'Partenaires Clés',
    items: ['Sponsors (Emirates, Nike, EDF)', 'Médias (BSkyB, Setanta)', 'Banques (Financement Stade)', 'Collectivités locales', 'Architectes'],
    description: "Le club s'appuie sur des partenaires stratégiques pour le financement (Emirates a payé pour le stade), l'équipement (Nike), et la visibilité (TV). Les clubs asiatiques (BEC-Tero, Hoang Hang Gia) sont des partenaires pour l'expansion commerciale.",
    icon: <Users size={20} />,
    color: 'bg-slate-500'
  },
  [SectionId.KA]: {
    id: SectionId.KA,
    title: 'Activités Clés',
    items: ['Gestion sportive (Matchs)', 'Recrutement & Formation (Scouting)', 'Gestion du Stade (Opérations)', 'Marketing & Branding', 'Développement Immobilier'],
    description: "Le cœur de métier est le football, mais Arsenal a intégré une activité immobilière forte (reconversion d'Highbury) et une gestion commerciale intense du nouveau stade (événements hors-match).",
    icon: <Activity size={20} />,
    color: 'bg-blue-500'
  },
  [SectionId.KR]: {
    id: SectionId.KR,
    title: 'Ressources Clés',
    items: ['Emirates Stadium', 'Joueurs (Talents)', 'Marque "Arsenal"', 'Arsène Wenger', 'Centre de formation'],
    description: "L'actif physique majeur est le stade (400M£). L'actif humain est critique : les joueurs (revendus avec plus-value) et le manager emblématique qui incarne la stratégie.",
    icon: <Box size={20} />,
    color: 'bg-blue-600'
  },
  [SectionId.VP]: {
    id: SectionId.VP,
    title: 'Propositions de Valeur',
    items: ['Spectacle sportif d\'élite', 'Expérience VIP (Club Diamant)', 'Visibilité mondiale (Sponsors)', 'Appartements haut de gamme (Highbury)'],
    description: "Pour les fans : du beau jeu et un stade confortable. Pour les VIP : un luxe exclusif (Club Diamant). Pour les sponsors : une exposition mondiale via la Premier League. Pour les acheteurs immo : une adresse prestigieuse.",
    icon: <Gift size={20} />,
    color: 'bg-yellow-500'
  },
  [SectionId.CR]: {
    id: SectionId.CR,
    title: 'Relation Client',
    items: ['Fidélisation (Abonnements)', 'Exclusivité (Club Diamant)', 'Engagement communautaire', 'Services Supporters (Voyages, Musée)'],
    description: "Arsenal verrouille ses revenus par des abonnements long terme (Club Diamant = 3 ans min). Le 'Centre de Service aux supporters' gère la relation quotidienne.",
    icon: <Heart size={20} />,
    color: 'bg-pink-500'
  },
  [SectionId.CH]: {
    id: SectionId.CH,
    title: 'Canaux de Distribution',
    items: ['Emirates Stadium (Matchs)', 'Arsenal Channel (TV)', 'Boutiques & Merchandising', 'Site Internet'],
    description: "Le stade est le canal principal (expérience physique). La chaîne TV propriétaire (Arsenal Channel) et les tournées internationales permettent de toucher les fans hors du stade.",
    icon: <Truck size={20} />,
    color: 'bg-pink-600'
  },
  [SectionId.CS]: {
    id: SectionId.CS,
    title: 'Segments de Clientèle',
    items: ['Fans locaux (Ticketing)', 'Fans internationaux', 'VIP & Entreprises (Hospitalité)', 'Sponsors & Médias', 'Acheteurs Immobiliers'],
    description: "Segmentation forte : du fan lambda au client 'Diamant' (25k£ l'entrée). Expansion géographique vers l'Asie pour les produits dérivés.",
    icon: <Target size={20} />,
    color: 'bg-green-500'
  },
  [SectionId.C$]: {
    id: SectionId.C$,
    title: 'Structure des Coûts',
    items: ['Salaires Joueurs & Staff', 'Amortissement Stade (Dette)', 'Coûts de transfert', 'Maintenance & Opérations', 'Coûts de structure'],
    description: "Les salaires des joueurs sont le poste le plus lourd, exacerbé par la concurrence. Le remboursement de la dette du stade est une charge fixe majeure.",
    icon: <CreditCard size={20} />,
    color: 'bg-orange-500'
  },
  [SectionId.R$]: {
    id: SectionId.R$,
    title: 'Sources de Revenus',
    items: ['Billetterie (Matchday)', 'Droits TV (PL & Europe)', 'Sponsoring & Commercial', 'Trading de joueurs (Plus-values)', 'Vente immobilière'],
    description: "Modèle diversifié. Le 'Matchday' a explosé avec l'Emirates. Le trading de joueurs (achat bas, vente haut) est une source de profit critique (ex: Anelka).",
    icon: <DollarSign size={20} />,
    color: 'bg-orange-600'
  }
};

enum Tab {
  CANVAS = 'canvas',
  ANALYSIS = 'analysis',
  CHARTS = 'charts'
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.CANVAS);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    // Give time for the hidden view to render if needed, although it's always there.
    // Small timeout to ensure no UI blocking before we start heavy lifting.
    await new Promise(resolve => setTimeout(resolve, 100));

    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight(); // Not strictly used if we just add pages

      // Function to capture and add a section
      const addSectionToPdf = async (elementId: string, addPage = false) => {
        const element = document.getElementById(elementId);
        if (!element) return;

        if (addPage) pdf.addPage();

        const canvas = await html2canvas(element, { 
          scale: 2, // Higher scale for better resolution
          logging: false,
          useCORS: true
        });
        
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const imgProps = pdf.getImageProperties(imgData);
        const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, imgHeight);
      };

      await addSectionToPdf('pdf-part-1'); // Page 1: Canvas
      await addSectionToPdf('pdf-part-2', true); // Page 2: Analysis
      await addSectionToPdf('pdf-part-3', true); // Page 3: Financials

      pdf.save('arsenal-business-model-report.pdf');

    } catch (error) {
      console.error("PDF Generation failed", error);
      alert("Erreur lors de la génération du PDF.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      
      {/* Hidden PDF Container */}
      <div className="absolute top-0 left-0 overflow-hidden h-0 w-0">
        <div style={{ position: 'absolute', top: 0, left: -10000 }}>
             <PdfExportView data={businessModelData} />
        </div>
      </div>

      {/* Header */}
      <header className="bg-gradient-to-r from-red-900 to-red-800 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Arsenal FC</h1>
            <p className="text-red-200 text-sm font-light">Contrôle de Gestion - Proposition de Business Model</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="hidden md:flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGeneratingPdf ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
              {isGeneratingPdf ? 'Génération...' : 'Télécharger PDF'}
            </button>
            <div className="hidden md:block text-right">
              <div className="text-xs text-red-300 uppercase tracking-widest">Saison</div>
              <div className="font-bold">2008 Report</div>
            </div>
          </div>
        </div>
        
        {/* Mobile Download Button (Visible only on small screens) */}
        <div className="md:hidden px-4 pb-4">
             <button 
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="w-full flex justify-center items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium disabled:opacity-50"
            >
              {isGeneratingPdf ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
              {isGeneratingPdf ? 'Génération...' : 'Télécharger Rapport PDF'}
            </button>
        </div>

        {/* Navigation Tabs */}
        <div className="container mx-auto px-4 mt-0 flex gap-1 overflow-x-auto">
          <button 
            onClick={() => setActiveTab(Tab.CANVAS)}
            className={`whitespace-nowrap px-4 py-2 rounded-t-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === Tab.CANVAS ? 'bg-slate-50 text-red-900' : 'bg-red-950/30 text-red-100 hover:bg-red-900'}`}
          >
            <LayoutTemplate size={16} /> Business Model Canvas
          </button>
          <button 
            onClick={() => setActiveTab(Tab.ANALYSIS)}
            className={`whitespace-nowrap px-4 py-2 rounded-t-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === Tab.ANALYSIS ? 'bg-slate-50 text-red-900' : 'bg-red-950/30 text-red-100 hover:bg-red-900'}`}
          >
            <Box size={16} /> Analyse FCS/FSR
          </button>
          <button 
            onClick={() => setActiveTab(Tab.CHARTS)}
            className={`whitespace-nowrap px-4 py-2 rounded-t-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === Tab.CHARTS ? 'bg-slate-50 text-red-900' : 'bg-red-950/30 text-red-100 hover:bg-red-900'}`}
          >
            <PieChart size={16} /> Données Financières
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 pb-20">
        
        {activeTab === Tab.CANVAS && (
          <div className="animate-in fade-in zoom-in duration-300">
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800 flex items-start gap-3">
              <div className="mt-0.5 min-w-[20px]">💡</div>
              <p>
                <strong>Instruction :</strong> Cliquez sur les blocs du canevas pour voir les détails spécifiques au cas Arsenal (Stade Emirates, Méthode Wenger, Immobilier, etc.).
              </p>
            </div>

            {/* CSS Grid for Business Model Canvas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 auto-rows-min">
              
              {/* Top Row: Left to Right */}
              {/* KP - Spans 2 rows vertically in standard canvas but simplified here for responsive grid */}
              <div className="lg:col-span-1 lg:row-span-2 min-h-[400px]">
                 <CanvasCard 
                   data={businessModelData[SectionId.KP]} 
                   className="h-full" 
                   onClick={() => setActiveCard(activeCard === SectionId.KP ? null : SectionId.KP)}
                   isActive={activeCard === SectionId.KP}
                 />
              </div>

              {/* KA & KR Stacked */}
              <div className="lg:col-span-1 flex flex-col gap-4 min-h-[400px]">
                <div className="flex-1">
                  <CanvasCard 
                    data={businessModelData[SectionId.KA]} 
                    className="h-full" 
                    onClick={() => setActiveCard(activeCard === SectionId.KA ? null : SectionId.KA)}
                    isActive={activeCard === SectionId.KA}
                  />
                </div>
                <div className="flex-1">
                  <CanvasCard 
                    data={businessModelData[SectionId.KR]} 
                    className="h-full" 
                    onClick={() => setActiveCard(activeCard === SectionId.KR ? null : SectionId.KR)}
                    isActive={activeCard === SectionId.KR}
                  />
                </div>
              </div>

              {/* VP - Center Pillar */}
              <div className="lg:col-span-1 lg:row-span-2 min-h-[400px]">
                <CanvasCard 
                  data={businessModelData[SectionId.VP]} 
                  className="h-full" 
                  onClick={() => setActiveCard(activeCard === SectionId.VP ? null : SectionId.VP)}
                  isActive={activeCard === SectionId.VP}
                />
              </div>

              {/* CR & CH Stacked */}
              <div className="lg:col-span-1 flex flex-col gap-4 min-h-[400px]">
                <div className="flex-1">
                  <CanvasCard 
                    data={businessModelData[SectionId.CR]} 
                    className="h-full" 
                    onClick={() => setActiveCard(activeCard === SectionId.CR ? null : SectionId.CR)}
                    isActive={activeCard === SectionId.CR}
                  />
                </div>
                <div className="flex-1">
                  <CanvasCard 
                    data={businessModelData[SectionId.CH]} 
                    className="h-full" 
                    onClick={() => setActiveCard(activeCard === SectionId.CH ? null : SectionId.CH)}
                    isActive={activeCard === SectionId.CH}
                  />
                </div>
              </div>

              {/* CS - Right Pillar */}
              <div className="lg:col-span-1 lg:row-span-2 min-h-[400px]">
                <CanvasCard 
                  data={businessModelData[SectionId.CS]} 
                  className="h-full" 
                  onClick={() => setActiveCard(activeCard === SectionId.CS ? null : SectionId.CS)}
                  isActive={activeCard === SectionId.CS}
                />
              </div>

              {/* Bottom Row */}
              <div className="lg:col-span-2.5 mt-4">
                <CanvasCard 
                  data={businessModelData[SectionId.C$]} 
                  className="h-full min-h-[150px]" 
                  onClick={() => setActiveCard(activeCard === SectionId.C$ ? null : SectionId.C$)}
                  isActive={activeCard === SectionId.C$}
                />
              </div>
              <div className="lg:col-span-2.5 mt-4">
                <CanvasCard 
                  data={businessModelData[SectionId.R$]} 
                  className="h-full min-h-[150px]" 
                  onClick={() => setActiveCard(activeCard === SectionId.R$ ? null : SectionId.R$)}
                  isActive={activeCard === SectionId.R$}
                />
              </div>

            </div>
          </div>
        )}

        {activeTab === Tab.ANALYSIS && (
          <AnalysisView />
        )}

        {activeTab === Tab.CHARTS && (
          <FinancialChart />
        )}

      </main>
    </div>
  );
};

export default App;
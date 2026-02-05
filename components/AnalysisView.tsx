import React from 'react';

interface AnalysisViewProps {
  className?: string;
}

export const AnalysisView: React.FC<AnalysisViewProps> = ({ className }) => {
  return (
    <div className={className || "grid md:grid-cols-2 gap-8 animate-in slide-in-from-bottom-4 duration-500"}>
      {/* FCS - Facteurs Clés de Succès */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border-t-4 border-green-600">
        <div className="p-6 bg-slate-50 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <span className="text-green-600">⚡</span> Facteurs Clés de Succès (FCS)
          </h2>
          <p className="text-sm text-slate-500 mt-1">Éléments indispensables pour réussir la stratégie.</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">1</div>
            <div>
              <h3 className="font-semibold text-slate-800">Gestion des Talents (Méthode Wenger)</h3>
              <p className="text-sm text-slate-600 mt-1">Capacité à détecter et former de jeunes talents à faible coût pour les revendre avec une forte plus-value (ex: Anelka acheté 1M€, revendu 30M€).</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">2</div>
            <div>
              <h3 className="font-semibold text-slate-800">Maximisation des Revenus "Matchday"</h3>
              <p className="text-sm text-slate-600 mt-1">L'Emirates Stadium (60k places vs 38k à Highbury) et l'offre Premium (Club Diamant) permettent de générer des revenus de billetterie massifs, supérieurs aux droits TV.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">3</div>
            <div>
              <h3 className="font-semibold text-slate-800">Diversification Immobilière</h3>
              <p className="text-sm text-slate-600 mt-1">Valorisation de l'ancien site d'Highbury en projet immobilier résidentiel pour générer du cash-flow hors cycle sportif.</p>
            </div>
          </div>

           <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">4</div>
            <div>
              <h3 className="font-semibold text-slate-800">Internationalisation de la Marque</h3>
              <p className="text-sm text-slate-600 mt-1">Attraction de sponsors globaux (Emirates, Nike) et partenariats en Asie (Thaïlande, Vietnam) pour les produits dérivés.</p>
            </div>
          </div>
        </div>
      </div>

      {/* FSR - Facteurs Stratégiques de Risque */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border-t-4 border-red-600">
        <div className="p-6 bg-slate-50 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <span className="text-red-600">⚠️</span> Facteurs Stratégiques de Risque (FSR)
          </h2>
          <p className="text-sm text-slate-500 mt-1">Menaces pouvant mettre en péril le modèle économique.</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold">1</div>
            <div>
              <h3 className="font-semibold text-slate-800">Inflation Salariale</h3>
              <p className="text-sm text-slate-600 mt-1">La concurrence acharnée post-arrêt Bosman pousse les salaires à la hausse. Le club doit constamment augmenter ses revenus pour rester compétitif sans se mettre en danger financier.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold">2</div>
            <div>
              <h3 className="font-semibold text-slate-800">Dette du Stade</h3>
              <p className="text-sm text-slate-600 mt-1">L'investissement de 400M£ pour l'Emirates Stadium crée une dette importante qui nécessite des revenus stables (et donc des performances sportives stables) pour être remboursée.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold">3</div>
            <div>
              <h3 className="font-semibold text-slate-800">Dépendance à la Performance Sportive</h3>
              <p className="text-sm text-slate-600 mt-1">Les droits TV (Champions League) et l'attractivité pour les sponsors dépendent des résultats. Une non-qualification en Europe serait catastrophique financièrement.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold">4</div>
            <div>
              <h3 className="font-semibold text-slate-800">Départ de Personnes Clés</h3>
              <p className="text-sm text-slate-600 mt-1">Le modèle repose fortement sur Arsène Wenger (manager) et la capacité à retenir les jeunes talents formés avant qu'ils ne partent libres ou trop tôt.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
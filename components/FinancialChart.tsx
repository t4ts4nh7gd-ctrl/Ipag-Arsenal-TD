import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { FinancialData, RevenueMix } from '../types';

// Data extrapolated from Figure 1 in the PDF
const performanceData: FinancialData[] = [
  { year: '1999', turnover: 48.6, wages: 24.5, profit: 1.3 },
  { year: '2000', turnover: 61.2, wages: 33.9, profit: 14.1 },
  { year: '2001', turnover: 64.6, wages: 40.6, profit: 26.2 },
  { year: '2002', turnover: 90.9, wages: 61.4, profit: -20.5 },
  { year: '2003', turnover: 117.8, wages: 60.5, profit: 4.0 },
  { year: '2004', turnover: 156.9, wages: 69.8, profit: 8.1 },
  { year: '2005', turnover: 138.4, wages: 66.0, profit: 8.2 },
  { year: '2006', turnover: 137.2, wages: 82.9, profit: 7.9 },
  { year: '2007', turnover: 200.8, wages: 89.7, profit: 12.8 },
  { year: '2008', turnover: 223.0, wages: 101.3, profit: 25.7 },
];

// Data extrapolated from Figure 2 in the PDF (Evolution of revenue sources)
const revenueMixData: RevenueMix[] = [
  { year: '2002', matchday: 23, broadcasting: 44, commercial: 16, retail: 5, property: 1 },
  { year: '2003', matchday: 26, broadcasting: 50, commercial: 15, retail: 9, property: 13 },
  { year: '2004', matchday: 33, broadcasting: 60, commercial: 14, retail: 7, property: 42 },
  { year: '2005', matchday: 37, broadcasting: 48, commercial: 20, retail: 8, property: 23 },
  { year: '2006', matchday: 44, broadcasting: 55, commercial: 22, retail: 10, property: 5 },
  { year: '2007', matchday: 90, broadcasting: 44, commercial: 29, retail: 12, property: 23 },
  { year: '2008', matchday: 94, broadcasting: 68, commercial: 31, retail: 13, property: 15 },
];

interface FinancialChartProps {
  className?: string;
}

export const FinancialChart: React.FC<FinancialChartProps> = ({ className }) => {
  return (
    <div className={className || "space-y-8 animate-in fade-in duration-500"}>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Évolution de la Performance Financière (M£)</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="year" stroke="#64748b" tick={{fontSize: 12}} />
              <YAxis stroke="#64748b" tick={{fontSize: 12}} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
              <Legend />
              <Line type="monotone" dataKey="turnover" name="CA du Groupe" stroke="#9C191E" strokeWidth={2} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="wages" name="Coûts Salariaux" stroke="#1e293b" strokeWidth={2} />
              <Line type="monotone" dataKey="profit" name="Résultat Net" stroke="#059669" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-slate-500 mt-2 text-center italic">
          Notez l'explosion du CA après 2006 (Inauguration de l'Emirates Stadium)
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Sources de Revenus (Millions de £)</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueMixData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorMatchday" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9C191E" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#9C191E" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorTV" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="year" stroke="#64748b" tick={{fontSize: 12}}/>
              <YAxis stroke="#64748b" tick={{fontSize: 12}}/>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}/>
              <Legend />
              <Area type="monotone" dataKey="matchday" name="Vente de places" stackId="1" stroke="#9C191E" fill="url(#colorMatchday)" />
              <Area type="monotone" dataKey="broadcasting" name="Droits TV" stackId="1" stroke="#3b82f6" fill="url(#colorTV)" />
              <Area type="monotone" dataKey="commercial" name="Sponsors" stackId="1" stroke="#f59e0b" fill="#f59e0b" />
              <Area type="monotone" dataKey="property" name="Immobilier" stackId="1" stroke="#10b981" fill="#10b981" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-slate-500 mt-2 text-center italic">
          L'impact de l'immobilier est fort en 2004, puis la billetterie explose avec le nouveau stade en 2007/2008.
        </p>
      </div>
    </div>
  );
};
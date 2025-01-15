'use client';
import React, { useState } from 'react';

function Home() {
  const [selectedSLA, setSelectedSLA] = useState('none');
  const [selectedAddons, setSelectedAddons] = useState({
    holeDetection: false,
    ledNotification: false
  });
  const [numberOfPresses, setNumberOfPresses] = useState(1);
  const [numberOfPlants, setNumberOfPlants] = useState(1);

  const calculateTotal = () => {
    let total = 0;
    
    // Add mandatory component costs (per press)
    const perPressTotal = (20000 + 5000 + 5000 + 10000); // Split & Necking + HMI/EOL + Dashboard + TeachMode
    total += perPressTotal * numberOfPresses;

    // Add SLA costs (per plant)
    if (selectedSLA === 'remote') {
      total += 50000 * numberOfPlants;
    } else if (selectedSLA === 'full') {
      total += 100000 * numberOfPlants;
    }

    // Add optional add-ons (per press)
    if (selectedAddons.holeDetection) total += 10000 * numberOfPresses;
    if (selectedAddons.ledNotification) total += 5000 * numberOfPresses;

    return total;
  };

  return (
    <main className="min-h-screen p-8 bg-slate-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-slate-900">USS Pricing Calculator</h1>
        
        <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg mx-auto">
          <div className="mb-8">
            {/* Configuration */}
            <div className="bg-slate-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold mb-3 text-slate-900">Configuration</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-slate-900">Number of Presses:</label>
                  <input
                    type="number"
                    min="1"
                    value={numberOfPresses}
                    onChange={(e) => setNumberOfPresses(Math.max(1, parseInt(e.target.value) || 1))}
                    className="p-2 border rounded w-full bg-white text-slate-900"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-slate-900">Number of Plants:</label>
                  <input
                    type="number"
                    min="1"
                    value={numberOfPlants}
                    onChange={(e) => setNumberOfPlants(Math.max(1, parseInt(e.target.value) || 1))}
                    className="p-2 border rounded w-full bg-white text-slate-900"
                  />
                </div>
              </div>
            </div>
            
            {/* Mandatory Components */}
            <div className="bg-slate-100 p-4 rounded-lg mb-6">
              <h3 className="font-semibold mb-3 text-slate-900">Mandatory Components (Per Press)</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-900">Software License & Upgrades</span>
                  <span className="font-medium text-slate-900">Included</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-900">AI Powered Split & Necking Detection</span>
                  <span className="font-medium text-slate-900">$20,000/year per press</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-900">AI Powered HMI/EOL Display</span>
                  <span className="font-medium text-slate-900">$5,000/year per press</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-900">Production & Quality Dashboard</span>
                  <span className="font-medium text-slate-900">$5,000/year per press</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-900">TeachMode Retraining</span>
                  <span className="font-medium text-slate-900">$10,000/year per press</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200">
                  <span className="font-medium text-slate-900">Subtotal for {numberOfPresses} press{numberOfPresses > 1 ? 'es' : ''}</span>
                  <span className="font-medium text-slate-900">${(40000 * numberOfPresses).toLocaleString()}/year</span>
                </div>
              </div>
            </div>

            {/* SLA Selection */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-slate-900">Select SLA Option (Per Plant)</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sla"
                    value="none"
                    checked={selectedSLA === 'none'}
                    onChange={(e) => setSelectedSLA(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-slate-900">No SLA</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sla"
                    value="remote"
                    checked={selectedSLA === 'remote'}
                    onChange={(e) => setSelectedSLA(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-slate-900">Remote SLA ($50,000/year per plant)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sla"
                    value="full"
                    checked={selectedSLA === 'full'}
                    onChange={(e) => setSelectedSLA(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-slate-900">Full SLA ($100,000/year per plant)</span>
                </label>
                {selectedSLA !== 'none' && (
                  <div className="flex justify-between pt-2 border-t border-slate-200">
                    <span className="font-medium text-slate-900">SLA Subtotal for {numberOfPlants} plant{numberOfPlants > 1 ? 's' : ''}</span>
                    <span className="font-medium text-slate-900">
                      ${((selectedSLA === 'remote' ? 50000 : 100000) * numberOfPlants).toLocaleString()}/year
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Add-ons */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-slate-900">Optional Add-ons (Per Press)</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedAddons.holeDetection}
                    onChange={(e) => setSelectedAddons({
                      ...selectedAddons,
                      holeDetection: e.target.checked
                    })}
                    className="mr-2"
                  />
                  <span className="text-slate-900">AI Powered Hole Detection ($10,000/year per press)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedAddons.ledNotification}
                    onChange={(e) => setSelectedAddons({
                      ...selectedAddons,
                      ledNotification: e.target.checked
                    })}
                    className="mr-2"
                  />
                  <span className="text-slate-900">LED Notification System ($5,000/year per press)</span>
                </label>
              </div>
            </div>

            {/* Total */}
            <div className="bg-slate-200 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-slate-900">Total Annual Cost:</span>
                <span className="text-2xl font-bold text-slate-900">${calculateTotal().toLocaleString()}/year</span>
              </div>
              <div className="text-sm text-slate-600 mt-2">
                For {numberOfPresses} press{numberOfPresses > 1 ? 'es' : ''} across {numberOfPlants} plant{numberOfPlants > 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
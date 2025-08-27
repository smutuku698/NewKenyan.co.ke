'use client';

import { useState, useEffect } from 'react';
import { Calculator, Home, MapPin, Settings, FileText, AlertCircle, Info, Edit3, HelpCircle, Plus, X } from 'lucide-react';

// Material price interfaces
interface MaterialPrices {
  cement: { price: number; unit: string; description: string };
  sand: { price: number; unit: string; description: string };
  ballast: { price: number; unit: string; description: string };
  steel: { price: number; unit: string; description: string };
  timber: { price: number; unit: string; description: string };
  bricks: { price: number; unit: string; description: string };
  tiles: { price: number; unit: string; description: string };
  ironSheets: { price: number; unit: string; description: string };
  clayTiles: { price: number; unit: string; description: string };
  concreteTiles: { price: number; unit: string; description: string };
  paint: { price: number; unit: string; description: string };
  doors: { price: number; unit: string; description: string };
  windows: { price: number; unit: string; description: string };
}

interface LabourRates {
  skilledWorker: { rate: number; description: string };
  unskilledWorker: { rate: number; description: string };
  foreman: { rate: number; description: string };
  mason: { rate: number; description: string };
  carpenter: { rate: number; description: string };
  electrician: { rate: number; description: string };
  plumber: { rate: number; description: string };
}

interface CustomItem {
  id: string;
  name: string;
  price: number;
  unit: string;
  quantity: number;
}

interface ConstructionEstimate {
  totalCost: number;
  costPerSqm: number;
  materialCosts: number;
  labourCosts: number;
  permitCosts: number;
  contingency: number;
  customItemsCost: number;
  breakdown: {
    foundation: number;
    walling: number;
    roofing: number;
    finishing: number;
    electrical: number;
    plumbing: number;
    permits: number;
  };
  materialBreakdown: {
    cement: { quantity: number; cost: number };
    sand: { quantity: number; cost: number };
    ballast: { quantity: number; cost: number };
    steel: { quantity: number; cost: number };
    roofing: { quantity: number; cost: number };
    timber: { quantity: number; cost: number };
    bricks: { quantity: number; cost: number };
    finishing: { quantity: number; cost: number };
  };
}

// Regional pricing multipliers
const regionalMultipliers = {
  'nairobi-central': 1.0,
  'coast': 1.08,
  'western': 0.85,
  'nyanza': 0.82,
  'eastern': 0.88,
  'rift-valley': 0.90,
  'north-eastern': 0.95,
};

// Default material prices (2025 Kenya market rates)
const defaultMaterialPrices: MaterialPrices = {
  cement: { price: 780, unit: '50kg bag', description: 'Ordinary Portland Cement' },
  sand: { price: 2500, unit: 'cubic meter', description: 'River sand' },
  ballast: { price: 3000, unit: 'cubic meter', description: 'Machine ballast' },
  steel: { price: 130, unit: 'kg', description: 'Y12 reinforcement bars' },
  timber: { price: 55, unit: 'foot', description: 'Cypress timber' },
  bricks: { price: 15, unit: 'piece', description: 'Machine cut blocks' },
  tiles: { price: 1200, unit: 'sqm', description: 'Ceramic floor tiles' },
  ironSheets: { price: 1100, unit: 'sheet', description: 'Gauge 28 iron sheets' },
  clayTiles: { price: 1600, unit: 'sqm', description: 'Clay roofing tiles' },
  concreteTiles: { price: 1900, unit: 'sqm', description: 'Concrete roofing tiles' },
  paint: { price: 800, unit: 'liter', description: 'Exterior paint' },
  doors: { price: 8000, unit: 'door', description: 'Standard wooden door' },
  windows: { price: 12000, unit: 'window', description: 'Aluminum window' },
};

// Default labour rates (2025 Kenya market rates)
const defaultLabourRates: LabourRates = {
  skilledWorker: { rate: 1500, description: 'Skilled mason/fundi per day' },
  unskilledWorker: { rate: 700, description: 'General laborer per day' },
  foreman: { rate: 2500, description: 'Site foreman per day' },
  mason: { rate: 1600, description: 'Professional mason per day' },
  carpenter: { rate: 1400, description: 'Carpenter per day' },
  electrician: { rate: 2000, description: 'Electrician per day' },
  plumber: { rate: 1800, description: 'Plumber per day' },
};

export default function ConstructionCalculator() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'breakdown' | 'customize' | 'howto'>('calculator');
  const [showCustomPricing, setShowCustomPricing] = useState(false);
  
  // Main calculator inputs
  const [houseSize, setHouseSize] = useState<string>('120');
  const [bedrooms, setBedrooms] = useState<string>('3');
  const [location, setLocation] = useState<string>('nairobi-central');
  const [buildStandard, setBuildStandard] = useState<string>('standard');
  const [roofingType, setRoofingType] = useState<string>('ironSheets');
  const [flooringType, setFlooringType] = useState<string>('tiles');
  const [contingencyPercent, setContingencyPercent] = useState<string>('12');
  
  // Customizable pricing states
  const [materialPrices, setMaterialPrices] = useState<MaterialPrices>(defaultMaterialPrices);
  const [labourRates, setLabourRates] = useState<LabourRates>(defaultLabourRates);
  
  // Custom items state
  const [customItems, setCustomItems] = useState<CustomItem[]>([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemUnit, setNewItemUnit] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');
  
  // Results
  const [estimate, setEstimate] = useState<ConstructionEstimate | null>(null);

  // Predefined house sizes based on bedrooms
  const bedroomToSize = {
    '1': '45',
    '2': '80',
    '3': '120',
    '4': '160',
    '5': '200',
    'custom': houseSize
  };

  // Update house size when bedroom selection changes
  useEffect(() => {
    if (bedrooms !== 'custom') {
      setHouseSize(bedroomToSize[bedrooms as keyof typeof bedroomToSize]);
    }
  }, [bedrooms]);

  // Calculate construction estimate
  useEffect(() => {
    const size = parseFloat(houseSize) || 0;
    const contingency = parseFloat(contingencyPercent) / 100 || 0.12;
    const regionalMultiplier = regionalMultipliers[location as keyof typeof regionalMultipliers] || 1.0;

    if (size > 0) {
      // Apply regional pricing
      const adjustedMaterialPrices = Object.fromEntries(
        Object.entries(materialPrices).map(([key, value]) => [
          key,
          { ...value, price: value.price * regionalMultiplier }
        ])
      );
      const adjustedLabourRates = Object.fromEntries(
        Object.entries(labourRates).map(([key, value]) => [
          key,
          { ...value, rate: value.rate * regionalMultiplier }
        ])
      );

      // Material quantity calculations (per sqm)
      const quantities = {
        cement: size * 8, // bags per sqm
        sand: size * 0.5, // cubic meters
        ballast: size * 0.3, // cubic meters  
        steel: size * 15, // kg per sqm
        timber: size * 25, // feet per sqm
        bricks: size * 45, // pieces per sqm
        roofingArea: size * 1.3, // accounting for roof slope
        paintArea: size * 4, // walls + ceiling area
        doors: Math.ceil(size / 30), // doors based on size
        windows: Math.ceil(size / 20), // windows based on size
      };

      // Material costs
      const cementCost = quantities.cement * adjustedMaterialPrices.cement.price;
      const sandCost = quantities.sand * adjustedMaterialPrices.sand.price;
      const ballastCost = quantities.ballast * adjustedMaterialPrices.ballast.price;
      const steelCost = quantities.steel * adjustedMaterialPrices.steel.price;
      const timberCost = quantities.timber * adjustedMaterialPrices.timber.price;
      const bricksCost = quantities.bricks * adjustedMaterialPrices.bricks.price;
      
      // Roofing costs based on type
      let roofingCost = 0;
      if (roofingType === 'ironSheets') {
        roofingCost = (quantities.roofingArea / 1.8) * adjustedMaterialPrices.ironSheets.price; // sheets needed
      } else if (roofingType === 'clayTiles') {
        roofingCost = quantities.roofingArea * adjustedMaterialPrices.clayTiles.price;
      } else {
        roofingCost = quantities.roofingArea * adjustedMaterialPrices.concreteTiles.price;
      }

      // Flooring costs
      const flooringCost = size * (flooringType === 'tiles' ? adjustedMaterialPrices.tiles.price : 500);
      
      // Paint and finishes
      const paintCost = (quantities.paintArea / 12) * adjustedMaterialPrices.paint.price; // liters needed
      const doorsCost = quantities.doors * adjustedMaterialPrices.doors.price;
      const windowsCost = quantities.windows * adjustedMaterialPrices.windows.price;

      const totalMaterialCosts = cementCost + sandCost + ballastCost + steelCost + timberCost + 
                               bricksCost + roofingCost + flooringCost + paintCost + doorsCost + windowsCost;

      // Labour costs (estimated at 30% of material costs + specific trades)
      const generalLabourCost = totalMaterialCosts * 0.25;
      const specialistLabourCost = (quantities.doors + quantities.windows) * 
        (adjustedLabourRates.carpenter.rate + adjustedLabourRates.electrician.rate + adjustedLabourRates.plumber.rate) * 2;
      
      const totalLabourCosts = generalLabourCost + specialistLabourCost;

      // Build standard multipliers
      let standardMultiplier = 1.0;
      if (buildStandard === 'budget') standardMultiplier = 0.75;
      else if (buildStandard === 'luxury') standardMultiplier = 1.8;

      // Apply standard multiplier
      const adjustedMaterialCosts = totalMaterialCosts * standardMultiplier;
      const adjustedLabourCosts = totalLabourCosts * standardMultiplier;

      // Permit costs (0.5% of project value)
      const subtotal = adjustedMaterialCosts + adjustedLabourCosts;
      const permitCosts = subtotal * 0.005;

      // Custom items cost
      const customItemsCost = customItems.reduce((total, item) => {
        return total + (item.price * item.quantity * regionalMultiplier);
      }, 0);

      // Contingency
      const adjustedSubtotal = subtotal + customItemsCost;
      const contingencyCost = adjustedSubtotal * contingency;

      const totalCost = adjustedSubtotal + permitCosts + contingencyCost;
      const costPerSqm = totalCost / size;

      // Calculate breakdown percentages
      const breakdown = {
        foundation: totalCost * 0.15,
        walling: totalCost * 0.25,
        roofing: totalCost * 0.20,
        finishing: totalCost * 0.25,
        electrical: totalCost * 0.08,
        plumbing: totalCost * 0.07,
        permits: permitCosts,
      };

      const materialBreakdown = {
        cement: { quantity: quantities.cement, cost: cementCost },
        sand: { quantity: quantities.sand, cost: sandCost },
        ballast: { quantity: quantities.ballast, cost: ballastCost },
        steel: { quantity: quantities.steel, cost: steelCost },
        roofing: { quantity: quantities.roofingArea, cost: roofingCost },
        timber: { quantity: quantities.timber, cost: timberCost },
        bricks: { quantity: quantities.bricks, cost: bricksCost },
        finishing: { quantity: size, cost: flooringCost + paintCost + doorsCost + windowsCost },
      };

      setEstimate({
        totalCost,
        costPerSqm,
        materialCosts: adjustedMaterialCosts,
        labourCosts: adjustedLabourCosts,
        permitCosts,
        contingency: contingencyCost,
        customItemsCost,
        breakdown,
        materialBreakdown,
      });
    }
  }, [houseSize, location, buildStandard, roofingType, flooringType, contingencyPercent, materialPrices, labourRates, customItems]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const updateMaterialPrice = (material: keyof MaterialPrices, newPrice: number) => {
    setMaterialPrices(prev => ({
      ...prev,
      [material]: { ...prev[material], price: newPrice }
    }));
  };

  const updateLabourRate = (role: keyof LabourRates, newRate: number) => {
    setLabourRates(prev => ({
      ...prev,
      [role]: { ...prev[role], rate: newRate }
    }));
  };

  const resetToDefaults = () => {
    setMaterialPrices(defaultMaterialPrices);
    setLabourRates(defaultLabourRates);
  };

  const addCustomItem = () => {
    if (newItemName && newItemPrice && newItemUnit && newItemQuantity) {
      const newItem: CustomItem = {
        id: Date.now().toString(),
        name: newItemName,
        price: parseFloat(newItemPrice),
        unit: newItemUnit,
        quantity: parseFloat(newItemQuantity)
      };
      setCustomItems([...customItems, newItem]);
      setNewItemName('');
      setNewItemPrice('');
      setNewItemUnit('');
      setNewItemQuantity('');
    }
  };

  const removeCustomItem = (id: string) => {
    setCustomItems(customItems.filter(item => item.id !== id));
  };

  const updateCustomItem = (id: string, field: keyof CustomItem, value: string | number) => {
    setCustomItems(customItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Calculator Tabs */}
      <div className="flex flex-wrap justify-center mb-8 bg-white rounded-lg p-2 shadow-sm border">
        <button
          onClick={() => setActiveTab('calculator')}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
            activeTab === 'calculator'
              ? 'bg-orange-100 text-orange-700 shadow-sm'
              : 'text-gray-600 hover:text-orange-600'
          }`}
        >
          <Calculator className="w-4 h-4" />
          Calculator
        </button>
        <button
          onClick={() => setActiveTab('breakdown')}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
            activeTab === 'breakdown'
              ? 'bg-orange-100 text-orange-700 shadow-sm'
              : 'text-gray-600 hover:text-orange-600'
          }`}
        >
          <FileText className="w-4 h-4" />
          Cost Breakdown
        </button>
        <button
          onClick={() => setActiveTab('customize')}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
            activeTab === 'customize'
              ? 'bg-orange-100 text-orange-700 shadow-sm'
              : 'text-gray-600 hover:text-orange-600'
          }`}
        >
          <Settings className="w-4 h-4" />
          Customize Prices
        </button>
        <button
          onClick={() => setActiveTab('howto')}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
            activeTab === 'howto'
              ? 'bg-orange-100 text-orange-700 shadow-sm'
              : 'text-gray-600 hover:text-orange-600'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          How to Use
        </button>
      </div>

      {/* Calculator Tab */}
      {activeTab === 'calculator' && (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
              <Home className="w-6 h-6 text-orange-600" />
              Project Details
            </h3>

            <div className="space-y-6">
              {/* House Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Bedrooms
                </label>
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="1">1 Bedroom (~45 m²)</option>
                  <option value="2">2 Bedrooms (~80 m²)</option>
                  <option value="3">3 Bedrooms (~120 m²)</option>
                  <option value="4">4 Bedrooms (~160 m²)</option>
                  <option value="5">5+ Bedrooms (~200 m²)</option>
                  <option value="custom">Custom Size</option>
                </select>
              </div>

              {bedrooms === 'custom' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom House Size (Square Meters)
                  </label>
                  <input
                    type="number"
                    value={houseSize}
                    onChange={(e) => setHouseSize(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter house size in m²"
                  />
                </div>
              )}

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Location/Region
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="nairobi-central">Nairobi/Central Kenya</option>
                  <option value="coast">Coast Region (+8% premium)</option>
                  <option value="western">Western Kenya (-15% discount)</option>
                  <option value="nyanza">Nyanza Region (-18% discount)</option>
                  <option value="eastern">Eastern Kenya (-12% discount)</option>
                  <option value="rift-valley">Rift Valley (-10% discount)</option>
                  <option value="north-eastern">North Eastern (-5% discount)</option>
                </select>
              </div>

              {/* Build Standard */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Build Standard/Quality
                </label>
                <select
                  value={buildStandard}
                  onChange={(e) => setBuildStandard(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="budget">Budget Standard (-25%)</option>
                  <option value="standard">Standard Quality (Recommended)</option>
                  <option value="luxury">Luxury/Premium (+80%)</option>
                </select>
              </div>

              {/* Roofing Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Roofing Material
                </label>
                <select
                  value={roofingType}
                  onChange={(e) => setRoofingType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="ironSheets">Iron Sheets/Mabati (Most Common)</option>
                  <option value="clayTiles">Clay Tiles (Traditional)</option>
                  <option value="concreteTiles">Concrete Tiles (Premium)</option>
                </select>
              </div>

              {/* Flooring Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Floor Finish
                </label>
                <select
                  value={flooringType}
                  onChange={(e) => setFlooringType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="tiles">Ceramic Tiles (Standard)</option>
                  <option value="concrete">Polished Concrete (Budget)</option>
                </select>
              </div>

              {/* Contingency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contingency Buffer (%)
                </label>
                <select
                  value={contingencyPercent}
                  onChange={(e) => setContingencyPercent(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="8">8% - Minimal Risk</option>
                  <option value="12">12% - Recommended</option>
                  <option value="15">15% - High Risk/Remote Area</option>
                  <option value="20">20% - Maximum Buffer</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Construction Cost Estimate
            </h3>

            {estimate && (
              <div className="space-y-6">
                {/* Total Cost */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                  <div className="text-center">
                    <p className="text-sm text-orange-600 font-medium mb-2">Total Estimated Cost</p>
                    <p className="text-4xl font-bold text-orange-700">
                      {formatCurrency(estimate.totalCost)}
                    </p>
                    <p className="text-lg text-orange-600 mt-2">
                      {formatCurrency(estimate.costPerSqm)} per m²
                    </p>
                  </div>
                </div>

                {/* Cost Components */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Materials</span>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(estimate.materialCosts)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Labour</span>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(estimate.labourCosts)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Permits & Approvals</span>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(estimate.permitCosts)}
                    </span>
                  </div>
                  {estimate.customItemsCost > 0 && (
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600">Custom Items</span>
                      <span className="font-semibold text-gray-900">
                        {formatCurrency(estimate.customItemsCost)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600">Contingency ({contingencyPercent}%)</span>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(estimate.contingency)}
                    </span>
                  </div>
                </div>

                {/* Quick Comparison */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Quick Comparison</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">2BR House (80m²)</span>
                      <span className="text-gray-900">
                        {formatCurrency((estimate.costPerSqm * 80))}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">3BR House (120m²)</span>
                      <span className="text-gray-900">
                        {formatCurrency((estimate.costPerSqm * 120))}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">4BR House (160m²)</span>
                      <span className="text-gray-900">
                        {formatCurrency((estimate.costPerSqm * 160))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Breakdown Tab */}
      {activeTab === 'breakdown' && estimate && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">
            Detailed Cost Breakdown
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Construction Phases */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Construction Phases</h4>
              <div className="space-y-3">
                {Object.entries(estimate.breakdown).map(([phase, cost]) => (
                  <div key={phase} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 capitalize">
                      {phase.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(cost)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Material Quantities */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Material Quantities & Costs</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <span className="text-gray-900 block">Cement</span>
                    <span className="text-xs text-gray-500">{estimate.materialBreakdown.cement.quantity.toFixed(0)} bags</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(estimate.materialBreakdown.cement.cost)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <span className="text-gray-900 block">Sand</span>
                    <span className="text-xs text-gray-500">{estimate.materialBreakdown.sand.quantity.toFixed(1)} cubic meters</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(estimate.materialBreakdown.sand.cost)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <span className="text-gray-900 block">Ballast</span>
                    <span className="text-xs text-gray-500">{estimate.materialBreakdown.ballast.quantity.toFixed(1)} cubic meters</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(estimate.materialBreakdown.ballast.cost)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <span className="text-gray-900 block">Steel/Reinforcement</span>
                    <span className="text-xs text-gray-500">{estimate.materialBreakdown.steel.quantity.toFixed(0)} kg</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(estimate.materialBreakdown.steel.cost)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <span className="text-gray-900 block">Roofing</span>
                    <span className="text-xs text-gray-500">{estimate.materialBreakdown.roofing.quantity.toFixed(1)} m² coverage</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(estimate.materialBreakdown.roofing.cost)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <span className="text-gray-900 block">Timber</span>
                    <span className="text-xs text-gray-500">{estimate.materialBreakdown.timber.quantity.toFixed(0)} feet</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(estimate.materialBreakdown.timber.cost)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <span className="text-gray-900 block">Blocks/Bricks</span>
                    <span className="text-xs text-gray-500">{estimate.materialBreakdown.bricks.quantity.toFixed(0)} pieces</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(estimate.materialBreakdown.bricks.cost)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <div>
                    <span className="text-gray-900 block">Finishing Materials</span>
                    <span className="text-xs text-gray-500">Paint, doors, windows, tiles</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(estimate.materialBreakdown.finishing.cost)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-8 bg-orange-50 border border-orange-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-semibold text-orange-800 mb-2">Cost Breakdown Summary</h5>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Materials account for ~{((estimate.materialCosts / estimate.totalCost) * 100).toFixed(0)}% of total cost</li>
                  <li>• Labour represents ~{((estimate.labourCosts / estimate.totalCost) * 100).toFixed(0)}% of total cost</li>
                  <li>• Permits and fees: ~{((estimate.permitCosts / estimate.totalCost) * 100).toFixed(1)}% of total cost</li>
                  <li>• Contingency buffer: {contingencyPercent}% for unexpected costs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customize Prices Tab */}
      {activeTab === 'customize' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-900">
              Customize Material & Labour Prices
            </h3>
            <button
              onClick={resetToDefaults}
              className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Reset to Defaults
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Material Prices */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Edit3 className="w-5 h-5" />
                Material Prices
              </h4>
              <div className="space-y-4">
                {Object.entries(materialPrices).map(([material, details]) => (
                  <div key={material} className="border border-gray-200 rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                      {material.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <p className="text-xs text-gray-500 mb-2">{details.description}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600">KES</span>
                      <input
                        type="number"
                        value={details.price}
                        onChange={(e) => updateMaterialPrice(material as keyof MaterialPrices, parseFloat(e.target.value) || 0)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                      />
                      <span className="text-sm text-gray-600">per {details.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Labour Rates */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Edit3 className="w-5 h-5" />
                Labour Rates
              </h4>
              <div className="space-y-4">
                {Object.entries(labourRates).map(([role, details]) => (
                  <div key={role} className="border border-gray-200 rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                      {role.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <p className="text-xs text-gray-500 mb-2">{details.description}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600">KES</span>
                      <input
                        type="number"
                        value={details.rate}
                        onChange={(e) => updateLabourRate(role as keyof LabourRates, parseFloat(e.target.value) || 0)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                      />
                      <span className="text-sm text-gray-600">per day</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Items */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Custom Items
              </h4>
              
              {/* Add New Item Form */}
              <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">
                <h5 className="text-sm font-medium text-gray-700 mb-3">Add Custom Item</h5>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Item name (e.g., Security system, Garden)"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="number"
                      placeholder="Price"
                      value={newItemPrice}
                      onChange={(e) => setNewItemPrice(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Unit"
                      value={newItemUnit}
                      onChange={(e) => setNewItemUnit(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Qty"
                      value={newItemQuantity}
                      onChange={(e) => setNewItemQuantity(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                    />
                  </div>
                  <button
                    onClick={addCustomItem}
                    className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
                  >
                    Add Item
                  </button>
                </div>
              </div>

              {/* Custom Items List */}
              <div className="space-y-3">
                {customItems.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => updateCustomItem(item.id, 'name', e.target.value)}
                        className="font-medium text-gray-700 bg-transparent border-none p-0 text-sm focus:ring-0 focus:outline-none"
                      />
                      <button
                        onClick={() => removeCustomItem(item.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-600">KES</span>
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) => updateCustomItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                          className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                      <input
                        type="text"
                        value={item.unit}
                        onChange={(e) => updateCustomItem(item.id, 'unit', e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="unit"
                      />
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateCustomItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                        className="px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="qty"
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      Total: {formatCurrency(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
                {customItems.length === 0 && (
                  <p className="text-gray-500 text-sm text-center py-4">
                    No custom items added yet. Use the form above to add items like security systems, landscaping, etc.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-semibold text-blue-800 mb-2">Customization Tips</h5>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Adjust prices based on your local supplier quotes</li>
                  <li>• Consider transport costs for remote locations</li>
                  <li>• Higher quality materials may cost 20-50% more</li>
                  <li>• Labour rates vary significantly by region and skill level</li>
                  <li>• Use custom items for extras like security, landscaping, solar panels</li>
                  <li>• Always add a contingency buffer for unexpected costs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* How to Use Tab */}
      {activeTab === 'howto' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">
            How to Use the Construction Calculator
          </h3>

          <div className="space-y-8">
            {/* Quick Start Guide */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Quick Start Guide
              </h4>
              <div className="space-y-3 text-sm text-green-700">
                <div className="flex items-start gap-3">
                  <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">1</span>
                  <div>
                    <strong>Select House Size:</strong> Choose number of bedrooms or enter custom square meters
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">2</span>
                  <div>
                    <strong>Choose Location:</strong> Select your region to get accurate local pricing
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">3</span>
                  <div>
                    <strong>Set Build Standard:</strong> Choose between Budget, Standard, or Luxury finish
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">4</span>
                  <div>
                    <strong>Select Materials:</strong> Choose roofing and flooring options
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">5</span>
                  <div>
                    <strong>Get Estimate:</strong> View your total cost breakdown instantly
                  </div>
                </div>
              </div>
            </div>

            {/* Features Guide */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Calculator Features
                </h4>
                <div className="space-y-4 text-sm text-gray-600">
                  <div>
                    <strong className="text-gray-900">Regional Pricing:</strong>
                    <p>Automatically adjusts material and labor costs based on your selected region across Kenya.</p>
                  </div>
                  <div>
                    <strong className="text-gray-900">Build Standards:</strong>
                    <p>Budget (-25%), Standard (baseline), Luxury (+80%) - affects material quality and finishes.</p>
                  </div>
                  <div>
                    <strong className="text-gray-900">Material Options:</strong>
                    <p>Choose between different roofing (iron sheets, clay/concrete tiles) and flooring options.</p>
                  </div>
                  <div>
                    <strong className="text-gray-900">Contingency Buffer:</strong>
                    <p>Recommended 12% buffer for unexpected costs, adjustable from 8-20%.</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-purple-600" />
                  Customization Options
                </h4>
                <div className="space-y-4 text-sm text-gray-600">
                  <div>
                    <strong className="text-gray-900">Custom Pricing:</strong>
                    <p>Edit material prices and labor rates based on your local supplier quotes.</p>
                  </div>
                  <div>
                    <strong className="text-gray-900">Custom Items:</strong>
                    <p>Add extra items like security systems, landscaping, solar panels, water tanks, etc.</p>
                  </div>
                  <div>
                    <strong className="text-gray-900">Detailed Breakdown:</strong>
                    <p>View costs by construction phases and material quantities needed.</p>
                  </div>
                  <div>
                    <strong className="text-gray-900">Export & Save:</strong>
                    <p>Use browser bookmarks to save your customized settings and estimates.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips for Accuracy */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-yellow-800 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Tips for Accurate Estimates
              </h4>
              <div className="grid md:grid-cols-2 gap-6 text-sm text-yellow-700">
                <div className="space-y-2">
                  <p>• <strong>Get Local Quotes:</strong> Update material prices with current supplier quotes from your area</p>
                  <p>• <strong>Site Visit:</strong> Factor in site accessibility, terrain, and utilities availability</p>
                  <p>• <strong>Professional Consultation:</strong> Consult with local contractors for labor rate validation</p>
                </div>
                <div className="space-y-2">
                  <p>• <strong>Seasonal Pricing:</strong> Material costs vary by season - cement is cheaper during dry season</p>
                  <p>• <strong>Quality Standards:</strong> Higher grades of materials can increase costs by 30-50%</p>
                  <p>• <strong>Custom Features:</strong> Use custom items for unique requirements like swimming pools, generators</p>
                </div>
              </div>
            </div>

            {/* Example Usage */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Example: 3-Bedroom House in Nairobi</h4>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p><strong>Basic Settings:</strong></p>
                    <ul className="text-gray-600 mt-2 space-y-1">
                      <li>• Size: 120 m² (3 bedrooms)</li>
                      <li>• Location: Nairobi/Central</li>
                      <li>• Standard: Standard Quality</li>
                      <li>• Roofing: Iron Sheets</li>
                      <li>• Flooring: Ceramic Tiles</li>
                    </ul>
                  </div>
                  <div>
                    <p><strong>Custom Additions:</strong></p>
                    <ul className="text-gray-600 mt-2 space-y-1">
                      <li>• Security system: KES 150,000</li>
                      <li>• Solar water heater: KES 80,000</li>
                      <li>• Landscaping: KES 100,000</li>
                      <li>• Water tank (5000L): KES 45,000</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-300">
                  <p className="text-gray-900"><strong>Estimated Total: KES 3.8M - 4.2M</strong> (including 12% contingency)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Additional Information Section */}
      <div className="mt-12 bg-gray-50 rounded-xl p-8">
        <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">
          Construction Planning Guidance
        </h3>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Before You Build</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Secure land ownership documents</li>
              <li>• Obtain building permits and approvals</li>
              <li>• Get architectural and structural plans</li>
              <li>• Conduct soil tests if required</li>
              <li>• Budget for utilities connection</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Cost Saving Tips</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Buy materials in bulk for discounts</li>
              <li>• Consider local material alternatives</li>
              <li>• Plan construction during dry seasons</li>
              <li>• Use skilled labour for critical work only</li>
              <li>• Compare multiple supplier quotes</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Quality Considerations</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Don't compromise on foundation quality</li>
              <li>• Invest in good roofing materials</li>
              <li>• Ensure proper drainage planning</li>
              <li>• Use quality electrical and plumbing</li>
              <li>• Plan for future maintenance needs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
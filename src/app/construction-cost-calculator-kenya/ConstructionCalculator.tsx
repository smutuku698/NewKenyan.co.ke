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

interface MaterialItem {
  id: string;
  name: string;
  price: number;
  unit: string;
  description: string;
  category: 'material' | 'labour';
  selected: boolean;
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
  
  // Material selection state
  const [selectedMaterials, setSelectedMaterials] = useState<Set<string>>(new Set(Object.keys(defaultMaterialPrices)));
  const [selectedLabour, setSelectedLabour] = useState<Set<string>>(new Set(Object.keys(defaultLabourRates)));
  
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

      // Material costs (only for selected materials)
      const cementCost = selectedMaterials.has('cement') ? quantities.cement * adjustedMaterialPrices.cement.price : 0;
      const sandCost = selectedMaterials.has('sand') ? quantities.sand * adjustedMaterialPrices.sand.price : 0;
      const ballastCost = selectedMaterials.has('ballast') ? quantities.ballast * adjustedMaterialPrices.ballast.price : 0;
      const steelCost = selectedMaterials.has('steel') ? quantities.steel * adjustedMaterialPrices.steel.price : 0;
      const timberCost = selectedMaterials.has('timber') ? quantities.timber * adjustedMaterialPrices.timber.price : 0;
      const bricksCost = selectedMaterials.has('bricks') ? quantities.bricks * adjustedMaterialPrices.bricks.price : 0;
      
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

      // Filter selected materials and labour for calculations
      const selectedMaterialPrices = Object.fromEntries(
        Object.entries(adjustedMaterialPrices).filter(([key]) => selectedMaterials.has(key))
      );
      const selectedLabourRates = Object.fromEntries(
        Object.entries(adjustedLabourRates).filter(([key]) => selectedLabour.has(key))
      );

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
  }, [houseSize, location, buildStandard, roofingType, flooringType, contingencyPercent, materialPrices, labourRates, customItems, selectedMaterials, selectedLabour]);

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
    setSelectedMaterials(new Set(Object.keys(defaultMaterialPrices)));
    setSelectedLabour(new Set(Object.keys(defaultLabourRates)));
    setCustomItems([]);
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

  const toggleMaterial = (materialKey: string) => {
    const newSelected = new Set(selectedMaterials);
    if (newSelected.has(materialKey)) {
      newSelected.delete(materialKey);
    } else {
      newSelected.add(materialKey);
    }
    setSelectedMaterials(newSelected);
  };

  const toggleLabour = (labourKey: string) => {
    const newSelected = new Set(selectedLabour);
    if (newSelected.has(labourKey)) {
      newSelected.delete(labourKey);
    } else {
      newSelected.add(labourKey);
    }
    setSelectedLabour(newSelected);
  };

  const getIncludedItemsCount = () => {
    return selectedMaterials.size + selectedLabour.size + customItems.length;
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

                {/* Included Items Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Included in Calculation ({getIncludedItemsCount()} items)</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Materials ({selectedMaterials.size}):</span>
                      <div className="text-gray-600 mt-1">
                        {Array.from(selectedMaterials).map(key => 
                          materialPrices[key as keyof MaterialPrices]?.description || key
                        ).join(', ')}
                      </div>
                    </div>
                    {customItems.length > 0 && (
                      <div>
                        <span className="font-medium text-gray-700">Custom Items ({customItems.length}):</span>
                        <div className="text-gray-600 mt-1">
                          {customItems.map(item => item.name).join(', ')}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-300">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Want to customize?</span>
                      <button 
                        onClick={() => setActiveTab('customize')}
                        className="text-orange-600 hover:text-orange-700 font-medium"
                      >
                        Manage Items →
                      </button>
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

          <div className="space-y-8">
            {/* Item Selection Panel */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Select Items to Include in Calculation</h4>
              <p className="text-sm text-gray-600 mb-6">Choose which materials and services to include in your cost estimate. Move items between Available and Selected.</p>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Available Materials */}
                <div>
                  <h5 className="font-medium text-gray-800 mb-3 flex items-center justify-between">
                    Available Materials
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                      {Object.keys(materialPrices).length - selectedMaterials.size} available
                    </span>
                  </h5>
                  <div className="space-y-2 max-h-80 overflow-y-auto">
                    {Object.entries(materialPrices).map(([key, details]) => (
                      <div 
                        key={key}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedMaterials.has(key) 
                            ? 'bg-green-50 border-green-300 shadow-sm' 
                            : 'bg-white border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => toggleMaterial(key)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h6 className="font-medium text-sm capitalize text-gray-800">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </h6>
                            <p className="text-xs text-gray-500">{details.description}</p>
                            <p className="text-xs text-gray-700 font-medium">KES {details.price.toLocaleString()} per {details.unit}</p>
                          </div>
                          <div className="ml-3">
                            {selectedMaterials.has(key) ? (
                              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">✓</span>
                              </div>
                            ) : (
                              <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selected Items Summary */}
                <div>
                  <h5 className="font-medium text-gray-800 mb-3 flex items-center justify-between">
                    Selected Items
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      {selectedMaterials.size + customItems.length} selected
                    </span>
                  </h5>
                  <div className="space-y-2 max-h-80 overflow-y-auto">
                    {/* Selected Materials */}
                    {Array.from(selectedMaterials).map((key) => {
                      const details = materialPrices[key as keyof MaterialPrices];
                      return (
                        <div key={key} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h6 className="font-medium text-sm capitalize text-green-800">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </h6>
                              <p className="text-xs text-green-600">KES {details.price.toLocaleString()} per {details.unit}</p>
                            </div>
                            <button
                              onClick={() => toggleMaterial(key)}
                              className="text-red-500 hover:text-red-700 text-xs font-medium"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      );
                    })}
                    
                    {/* Selected Custom Items */}
                    {customItems.map((item) => (
                      <div key={item.id} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h6 className="font-medium text-sm text-blue-800">{item.name}</h6>
                            <p className="text-xs text-blue-600">
                              KES {item.price.toLocaleString()} × {item.quantity} {item.unit} = {formatCurrency(item.price * item.quantity)}
                            </p>
                          </div>
                          <button
                            onClick={() => removeCustomItem(item.id)}
                            className="text-red-500 hover:text-red-700 text-xs font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    {selectedMaterials.size === 0 && customItems.length === 0 && (
                      <div className="p-4 text-center text-gray-500 text-sm border-2 border-dashed border-gray-300 rounded-lg">
                        No items selected. Click on available materials or add custom items below.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
            {/* Edit Prices for Selected Items */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Edit3 className="w-5 h-5" />
                Edit Prices (Selected Items Only)
              </h4>
              <div className="space-y-4">
                {Array.from(selectedMaterials).map((material) => {
                  const details = materialPrices[material as keyof MaterialPrices];
                  return (
                    <div key={material} className="border border-green-200 bg-green-50 rounded-lg p-4">
                      <label className="block text-sm font-medium text-green-800 mb-1 capitalize">
                        {material.replace(/([A-Z])/g, ' $1').trim()} ✓
                      </label>
                      <p className="text-xs text-green-600 mb-2">{details.description}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-green-700">KES</span>
                        <input
                          type="number"
                          value={details.price}
                          onChange={(e) => updateMaterialPrice(material as keyof MaterialPrices, parseFloat(e.target.value) || 0)}
                          className="flex-1 px-3 py-2 border border-green-300 bg-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                        />
                        <span className="text-sm text-green-700">per {details.unit}</span>
                      </div>
                    </div>
                  );
                })}
                
                {selectedMaterials.size === 0 && (
                  <div className="p-4 text-center text-gray-500 text-sm border border-gray-300 rounded-lg">
                    No materials selected. Select materials from the panel above to edit their prices.
                  </div>
                )}
              </div>
            </div>

            {/* Add Custom Items */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add Custom Items
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

              <p className="text-sm text-gray-600 mb-4">
                Custom items will automatically appear in the "Selected Items" panel above once added.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <button
              onClick={resetToDefaults}
              className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Reset All to Defaults
            </button>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>
                {selectedMaterials.size + customItems.length} items selected
              </span>
              <button 
                onClick={() => setActiveTab('calculator')}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
              >
                View Updated Estimate
              </button>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-semibold text-blue-800 mb-2">Smart Item Management</h5>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• <strong>Select Only What You Need:</strong> Uncheck materials you won't use to get accurate estimates</li>
                  <li>• <strong>Custom Items:</strong> Add security systems, landscaping, solar panels, water tanks</li>
                  <li>• <strong>Regional Pricing:</strong> All selected items automatically adjust for your location</li>
                  <li>• <strong>Easy Editing:</strong> Edit prices for selected items only - cleaner interface</li>
                  <li>• <strong>Real-time Updates:</strong> See changes instantly in your cost estimate</li>
                </ul>
              </div>
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

      {/* Comprehensive Cost Summary - Always Visible */}
      {estimate && (
        <div className="mt-12 bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Your Construction Cost Summary
            </h3>
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-6">
              <div className="text-5xl font-bold text-orange-700 mb-2">{formatCurrency(estimate.totalCost)}</div>
              <div className="text-orange-600 font-medium text-lg">Total Project Cost</div>
              <div className="text-orange-600 mt-2">
                {formatCurrency(estimate.costPerSqm)} per m² • {houseSize} m² house • {location.replace('-', ' ')} pricing
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-800">{formatCurrency(estimate.materialCosts)}</div>
              <div className="text-blue-600 text-sm font-medium">Materials ({selectedMaterials.size} items)</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-800">{formatCurrency(estimate.labourCosts)}</div>
              <div className="text-green-600 text-sm font-medium">Labor & Services</div>
            </div>
            {estimate.customItemsCost > 0 && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-800">{formatCurrency(estimate.customItemsCost)}</div>
                <div className="text-purple-600 text-sm font-medium">Custom Items ({customItems.length})</div>
              </div>
            )}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-800">{formatCurrency(estimate.contingency)}</div>
              <div className="text-orange-600 text-sm font-medium">{contingencyPercent}% Contingency</div>
            </div>
          </div>

          {/* What's Included */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h4 className="text-xl font-bold text-gray-900 mb-4">What's Included in This Estimate</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-gray-800 mb-3">Selected Materials ({selectedMaterials.size})</h5>
                <div className="space-y-2">
                  {Array.from(selectedMaterials).slice(0, 6).map((key) => {
                    const material = materialPrices[key as keyof MaterialPrices];
                    const cost = estimate.materialBreakdown[key as keyof typeof estimate.materialBreakdown]?.cost || 0;
                    return (
                      <div key={key} className="flex justify-between items-center py-1 border-b border-gray-200 last:border-0">
                        <span className="text-gray-700 capitalize text-sm">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="font-medium text-sm">{formatCurrency(cost)}</span>
                      </div>
                    );
                  })}
                  {selectedMaterials.size > 6 && (
                    <div className="text-gray-500 text-sm mt-2">...and {selectedMaterials.size - 6} more materials</div>
                  )}
                </div>
              </div>
              
              <div>
                {customItems.length > 0 && (
                  <div className="mb-6">
                    <h5 className="font-semibold text-gray-800 mb-3">Custom Items ({customItems.length})</h5>
                    <div className="space-y-2">
                      {customItems.slice(0, 4).map((item) => {
                        const totalCost = item.price * item.quantity * (regionalMultipliers[location as keyof typeof regionalMultipliers] || 1.0);
                        return (
                          <div key={item.id} className="flex justify-between items-center py-1 border-b border-gray-200 last:border-0">
                            <div className="text-gray-700 text-sm">
                              <div>{item.name}</div>
                              <div className="text-xs text-gray-500">{item.quantity} {item.unit}</div>
                            </div>
                            <span className="font-medium text-sm">{formatCurrency(totalCost)}</span>
                          </div>
                        );
                      })}
                      {customItems.length > 4 && (
                        <div className="text-gray-500 text-sm mt-2">...and {customItems.length - 4} more custom items</div>
                      )}
                    </div>
                  </div>
                )}
                
                <div>
                  <h5 className="font-semibold text-gray-800 mb-3">Project Details</h5>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>• {buildStandard.charAt(0).toUpperCase() + buildStandard.slice(1)} quality construction</div>
                    <div>• {roofingType === 'ironSheets' ? 'Iron sheets' : roofingType === 'clayTiles' ? 'Clay tiles' : 'Concrete tiles'} roofing</div>
                    <div>• {flooringType === 'tiles' ? 'Ceramic tiles' : 'Polished concrete'} flooring</div>
                    <div>• Permits and approvals included</div>
                    <div>• {contingencyPercent}% contingency buffer for unexpected costs</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-300 text-center">
              <p className="text-gray-600 mb-4">Need more detailed breakdown with quantities and phases?</p>
              <button 
                onClick={() => setActiveTab('breakdown')}
                className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
              >
                View Detailed Cost Breakdown →
              </button>
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
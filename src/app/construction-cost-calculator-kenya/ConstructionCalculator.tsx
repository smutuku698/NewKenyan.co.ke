'use client';

import { useState, useEffect } from 'react';
import { Calculator, Home, MapPin, Settings, FileText, AlertCircle, Info, Edit3, Lock, Plus, X, ArrowLeft, HelpCircle } from 'lucide-react';

// Input sanitization utility
const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove JavaScript protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .replace(/script/gi, '') // Remove script references
    .trim();
};

const sanitizeNumber = (input: string): number => {
  const sanitized = sanitizeInput(input);
  const number = parseFloat(sanitized);
  return isNaN(number) ? 0 : Math.max(0, number);
};

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
  description: string;
  quantity: number;
}

interface ConstructionEstimate {
  totalCost: number;
  costPerSqm: number;
  materialCosts: number;
  labourCosts: number;
  permitCosts: number;
  contingency: number;
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
    customItems: { quantity: number; cost: number };
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

// Example custom items with descriptions
const exampleCustomItems: Omit<CustomItem, 'id'>[] = [
  {
    name: 'Glass Windows',
    price: 2500,
    unit: 'square meter',
    description: 'Tempered glass for windows and doors',
    quantity: 0
  },
  {
    name: 'Granite Countertops',
    price: 8000,
    unit: 'square meter', 
    description: 'High-quality granite kitchen countertops',
    quantity: 0
  },
  {
    name: 'Solar Panels',
    price: 25000,
    unit: 'panel',
    description: '300W solar panel with installation',
    quantity: 0
  },
  {
    name: 'Septic Tank',
    price: 45000,
    unit: 'unit',
    description: 'Complete septic tank system with installation',
    quantity: 0
  },
  {
    name: 'Water Storage Tank',
    price: 12000,
    unit: '1000L tank',
    description: 'Plastic water storage tank',
    quantity: 0
  },
  {
    name: 'Security System',
    price: 35000,
    unit: 'complete system',
    description: 'CCTV cameras, alarm system, and monitoring',
    quantity: 0
  }
];

export default function ConstructionCalculator() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'breakdown' | 'customize' | 'how-to-use'>('calculator');
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
  
  // Custom items functionality
  const [customItems, setCustomItems] = useState<CustomItem[]>([]);
  const [showAddCustomItem, setShowAddCustomItem] = useState(false);
  const [newCustomItem, setNewCustomItem] = useState({
    name: '',
    price: '',
    unit: '',
    description: '',
    quantity: ''
  });
  
  // Pricing lock functionality
  const [pricesLocked, setPricesLocked] = useState(false);
  
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

      // Custom items costs
      const customItemsCost = customItems.reduce((total, item) => {
        const adjustedPrice = item.price * regionalMultiplier;
        return total + (adjustedPrice * item.quantity);
      }, 0);

      const totalMaterialCosts = cementCost + sandCost + ballastCost + steelCost + timberCost + 
                               bricksCost + roofingCost + flooringCost + paintCost + doorsCost + windowsCost + customItemsCost;

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

      // Contingency
      const contingencyCost = subtotal * contingency;

      const totalCost = subtotal + permitCosts + contingencyCost;
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
        customItems: { quantity: customItems.length, cost: customItemsCost },
      };

      setEstimate({
        totalCost,
        costPerSqm,
        materialCosts: adjustedMaterialCosts,
        labourCosts: adjustedLabourCosts,
        permitCosts,
        contingency: contingencyCost,
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
    setCustomItems([]);
  };

  // Custom items management with 6-item limit
  const addCustomItem = () => {
    if (customItems.length >= 6) {
      alert('You can add a maximum of 6 custom items. Please remove an existing item to add a new one.');
      return;
    }
    
    if (newCustomItem.name && newCustomItem.price && newCustomItem.unit) {
      const customItem: CustomItem = {
        id: Date.now().toString(),
        name: sanitizeInput(newCustomItem.name),
        price: sanitizeNumber(newCustomItem.price),
        unit: sanitizeInput(newCustomItem.unit),
        description: sanitizeInput(newCustomItem.description),
        quantity: Math.max(0, sanitizeNumber(newCustomItem.quantity))
      };
      
      setCustomItems(prev => [...prev, customItem]);
      setNewCustomItem({ name: '', price: '', unit: '', description: '', quantity: '' });
      setShowAddCustomItem(false);
    }
  };

  const removeCustomItem = (id: string) => {
    setCustomItems(prev => prev.filter(item => item.id !== id));
  };

  const updateCustomItemQuantity = (id: string, quantity: number) => {
    setCustomItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
      )
    );
  };

  const addExampleItem = (exampleItem: Omit<CustomItem, 'id'>) => {
    if (customItems.length >= 6) {
      alert('You can add a maximum of 6 custom items. Please remove an existing item to add a new one.');
      return;
    }
    
    const customItem: CustomItem = {
      ...exampleItem,
      id: Date.now().toString(),
      name: sanitizeInput(exampleItem.name),
      description: sanitizeInput(exampleItem.description),
      unit: sanitizeInput(exampleItem.unit)
    };
    
    setCustomItems(prev => [...prev, customItem]);
  };

  // Lock/unlock prices functionality
  const togglePriceLock = () => {
    setPricesLocked(!pricesLocked);
    if (!pricesLocked) {
      // Switch back to calculator when locking prices
      setActiveTab('calculator');
    }
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
          onClick={() => setActiveTab('how-to-use')}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
            activeTab === 'how-to-use'
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

            {/* Custom Pricing Notification */}
            <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-semibold text-blue-800 mb-1">💡 Customize Your Prices</h4>
                  <p className="text-sm text-blue-700 mb-2">
                    Want to use your own material prices or add custom items like glass, granite, or solar panels? 
                  </p>
                  <button
                    onClick={() => setActiveTab('customize')}
                    className="text-blue-600 hover:text-blue-700 font-semibold text-sm underline"
                  >
                    Set your own prices and add custom items →
                  </button>
                  {pricesLocked && (
                    <div className="mt-2 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-green-600" />
                      <span className="text-xs text-green-700 font-medium">Custom prices locked and active</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

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
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <span className="text-gray-900 block">Finishing Materials</span>
                    <span className="text-xs text-gray-500">Paint, doors, windows, tiles</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(estimate.materialBreakdown.finishing.cost)}
                  </span>
                </div>
                {estimate.materialBreakdown.customItems.cost > 0 && (
                  <div className="flex justify-between items-center py-2">
                    <div>
                      <span className="text-gray-900 block">Custom Items</span>
                      <span className="text-xs text-gray-500">
                        {customItems.filter(item => item.quantity > 0).map(item => item.name).join(', ')}
                      </span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(estimate.materialBreakdown.customItems.cost)}
                    </span>
                  </div>
                )}
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
            <div className="flex items-center gap-3">
              <button
                onClick={resetToDefaults}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Reset to Defaults
              </button>
              <button
                onClick={togglePriceLock}
                className={`px-4 py-2 text-sm rounded-lg font-medium transition-all flex items-center gap-2 ${
                  pricesLocked
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                }`}
              >
                {pricesLocked ? (
                  <>
                    <ArrowLeft className="w-4 h-4" />
                    Return to Calculator
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Lock Prices & Return
                  </>
                )}
              </button>
            </div>
          </div>

          {pricesLocked && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800">Prices Locked</span>
              </div>
              <p className="text-sm text-green-700 mt-1">
                Your custom prices are now active and will be used in all calculations. Click "Return to Calculator" above to see the updated costs.
              </p>
            </div>
          )}

          {/* Quick How-to-Use Guide */}
          <div className="mb-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-3">📝 Quick Guide: How to Customize</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-gray-800 mb-2">💰 Adjust Material & Labour Prices:</h5>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Change any price to match your local supplier quotes</li>
                      <li>• <strong>Set price to 0 (zero) to exclude materials</strong> you don't need</li>
                      <li>• Example: Set paint = 0 if doing DIY painting</li>
                      <li>• Higher quality materials typically cost 20-50% more</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-800 mb-2">🏗️ Add Custom Items (Max 6):</h5>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Use quick-add buttons for common items</li>
                      <li>• Add your own custom items: specialized materials, services, etc.</li>
                      <li>• Maximum of 6 custom items to keep calculations manageable</li>
                      <li>• Set quantities to get accurate total costs</li>
                      <li>• Remove items you don't need with the X button</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>💡 Pro Tip:</strong> After customizing, click "Lock Prices & Return" to apply your changes and see the updated cost calculation. 
                    Your settings will remain active until you reset or change them.
                  </p>
                </div>
                <div className="mt-3 text-center">
                  <button
                    onClick={() => setActiveTab('how-to-use')}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm underline"
                  >
                    Need detailed instructions? → View Complete How-to-Use Guide
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Custom Items Section */}
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Custom Items & Add-ons
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Add any specialized items not included in standard materials ({customItems.length}/6 items used)
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => setShowAddCustomItem(true)}
                    disabled={customItems.length >= 6}
                    className={`px-4 py-2 text-sm rounded-lg font-medium transition-all flex items-center gap-2 ${
                      customItems.length >= 6
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                    Add Your Own Item
                  </button>
                  {customItems.length >= 6 && (
                    <p className="text-xs text-red-600 text-right">
                      Maximum 6 items reached
                    </p>
                  )}
                  {customItems.length < 6 && (
                    <p className="text-xs text-green-600 text-right">
                      {6 - customItems.length} more items available
                    </p>
                  )}
                </div>
              </div>

              {/* Example Items */}
              <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h5 className="font-semibold text-blue-800">💡 Quick Add: Common Items</h5>
                  {customItems.length >= 6 && (
                    <span className="text-xs text-red-600 font-medium">
                      Remove an item to add more
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {exampleCustomItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => addExampleItem(item)}
                      disabled={customItems.length >= 6}
                      className={`text-left p-2 text-xs border rounded-lg transition-colors ${
                        customItems.length >= 6
                          ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-white border-blue-200 hover:bg-blue-50'
                      }`}
                    >
                      <span className={`font-medium ${customItems.length >= 6 ? 'text-gray-400' : 'text-blue-800'}`}>
                        {item.name}
                      </span>
                      <br />
                      <span className={customItems.length >= 6 ? 'text-gray-400' : 'text-blue-600'}>
                        KES {item.price.toLocaleString()} per {item.unit}
                      </span>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-blue-700 mt-2">
                  Click any item above to quickly add it, or use "Add Your Own Item" for custom materials
                </p>
              </div>

              {/* Add Custom Item Form */}
              {showAddCustomItem && (
                <div className="border border-green-300 rounded-lg p-6 mb-4 bg-green-50">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h5 className="font-semibold text-green-800">✨ Add Your Custom Item</h5>
                      <p className="text-sm text-green-700 mt-1">
                        Add any specialized material or service not covered above (Item {customItems.length + 1} of 6)
                      </p>
                    </div>
                    <button
                      onClick={() => setShowAddCustomItem(false)}
                      className="text-green-400 hover:text-green-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Item Name *
                      </label>
                      <input
                        type="text"
                        value={newCustomItem.name}
                        onChange={(e) => setNewCustomItem(prev => ({...prev, name: sanitizeInput(e.target.value)}))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                        placeholder="e.g., Italian Marble, CCTV Camera, Swimming Pool Tiles"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price (KES) *
                      </label>
                      <input
                        type="number"
                        value={newCustomItem.price}
                        onChange={(e) => setNewCustomItem(prev => ({...prev, price: e.target.value}))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                        placeholder="e.g., 15000, 2500, 45000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Unit *
                      </label>
                      <input
                        type="text"
                        value={newCustomItem.unit}
                        onChange={(e) => setNewCustomItem(prev => ({...prev, unit: sanitizeInput(e.target.value)}))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                        placeholder="e.g., square meter, piece, liter, bag, roll"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity
                      </label>
                      <input
                        type="number"
                        value={newCustomItem.quantity}
                        onChange={(e) => setNewCustomItem(prev => ({...prev, quantity: e.target.value}))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description (Optional)
                    </label>
                    <input
                      type="text"
                      value={newCustomItem.description}
                      onChange={(e) => setNewCustomItem(prev => ({...prev, description: sanitizeInput(e.target.value)}))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                      placeholder="e.g., High-quality imported material, Professional installation included"
                    />
                  </div>
                  <div className="mt-4 flex justify-end gap-3">
                    <button
                      onClick={() => setShowAddCustomItem(false)}
                      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={addCustomItem}
                      className="px-4 py-2 text-sm bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                    >
                      Add Item
                    </button>
                  </div>
                </div>
              )}

              {/* Current Custom Items */}
              {customItems.length > 0 && (
                <div className="space-y-3">
                  <h5 className="font-semibold text-gray-900">Your Custom Items</h5>
                  {customItems.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h6 className="font-medium text-gray-900">{item.name}</h6>
                          <p className="text-xs text-gray-600">{item.description}</p>
                          <p className="text-sm text-gray-700 mt-1">
                            KES {item.price.toLocaleString()} per {item.unit}
                          </p>
                        </div>
                        <button
                          onClick={() => removeCustomItem(item.id)}
                          className="text-red-400 hover:text-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <label className="text-sm text-gray-600">Quantity:</label>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateCustomItemQuantity(item.id, sanitizeNumber(e.target.value))}
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                          min="0"
                        />
                        <span className="text-sm text-gray-600">{item.unit}(s)</span>
                        {item.quantity > 0 && (
                          <span className="text-sm font-medium text-green-700 ml-auto">
                            = {formatCurrency(item.price * item.quantity)}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Material Prices Section */}
            <div className="grid md:grid-cols-2 gap-8">
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
                        onChange={(e) => updateMaterialPrice(material as keyof MaterialPrices, sanitizeNumber(e.target.value))}
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
                        onChange={(e) => updateLabourRate(role as keyof LabourRates, sanitizeNumber(e.target.value))}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                      />
                      <span className="text-sm text-gray-600">per day</span>
                    </div>
                  </div>
                ))}
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
                  <li>• Always add a contingency buffer for unexpected costs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* How to Use Tab */}
      {activeTab === 'how-to-use' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              Complete Guide: How to Use the Construction Calculator
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Master our construction cost calculator with this comprehensive step-by-step guide
            </p>
          </div>

          <div className="space-y-8">
            {/* Getting Started */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h4 className="text-xl font-semibold text-green-800 mb-4 flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                1. Getting Started - Calculator Tab
              </h4>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h5 className="font-medium text-green-700 mb-2">Basic Project Setup:</h5>
                  <ul className="text-green-600 space-y-1">
                    <li>• Choose number of bedrooms or set custom size</li>
                    <li>• Select your location for regional pricing</li>
                    <li>• Pick build quality (Budget/Standard/Luxury)</li>
                    <li>• Choose roofing material (Iron sheets, clay, concrete)</li>
                    <li>• Select floor finish type</li>
                    <li>• Set contingency buffer (8-20%)</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-green-700 mb-2">Instant Results:</h5>
                  <ul className="text-green-600 space-y-1">
                    <li>• Total cost calculated in real-time</li>
                    <li>• Cost per square meter displayed</li>
                    <li>• Breakdown by materials, labor, permits</li>
                    <li>• Quick size comparisons (2BR, 3BR, 4BR)</li>
                    <li>• All prices in Kenyan Shillings (KES)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="text-xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                2. Understanding Costs - Breakdown Tab
              </h4>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">Construction Phases:</h5>
                  <ul className="text-blue-600 space-y-1">
                    <li>• <strong>Foundation:</strong> 15% of total cost</li>
                    <li>• <strong>Walling:</strong> 25% of total cost</li>
                    <li>• <strong>Roofing:</strong> 20% of total cost</li>
                    <li>• <strong>Finishing:</strong> 25% of total cost</li>
                    <li>• <strong>Electrical:</strong> 8% of total cost</li>
                    <li>• <strong>Plumbing:</strong> 7% of total cost</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">Material Quantities:</h5>
                  <ul className="text-blue-600 space-y-1">
                    <li>• Exact bags of cement needed</li>
                    <li>• Cubic meters of sand and ballast</li>
                    <li>• Kilograms of steel reinforcement</li>
                    <li>• Square meters of roofing coverage</li>
                    <li>• Feet of timber required</li>
                    <li>• Number of blocks/bricks needed</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Customization Guide */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <h4 className="text-xl font-semibold text-orange-800 mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                3. Customization - Customize Prices Tab
              </h4>
              
              <div className="space-y-6 text-sm">
                <div>
                  <h5 className="font-medium text-orange-700 mb-3">🎯 Adjusting Material & Labour Prices:</h5>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg p-4 border border-orange-200">
                      <h6 className="font-medium text-gray-800 mb-2">Price Adjustments:</h6>
                      <ul className="text-gray-700 space-y-1">
                        <li>• Enter your actual supplier quotes</li>
                        <li>• Account for transport costs</li>
                        <li>• Adjust for quality differences</li>
                        <li>• Update regional labor rates</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-orange-200">
                      <h6 className="font-medium text-gray-800 mb-2">Excluding Materials:</h6>
                      <ul className="text-gray-700 space-y-1">
                        <li>• <strong>Set price to 0 to exclude completely</strong></li>
                        <li>• Paint = 0 if doing DIY painting</li>
                        <li>• Windows = 0 if using existing</li>
                        <li>• Any material you're not using</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-orange-700 mb-3">➕ Adding Custom Items:</h5>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-orange-200">
                      <h6 className="font-medium text-gray-800 mb-2">Quick Add Examples:</h6>
                      <ul className="text-gray-700 space-y-1 text-xs">
                        <li>• Glass Windows (KES 2,500/m²)</li>
                        <li>• Granite Countertops (KES 8,000/m²)</li>
                        <li>• Solar Panels (KES 25,000/panel)</li>
                        <li>• Security System (KES 35,000)</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-orange-200">
                      <h6 className="font-medium text-gray-800 mb-2">Custom Items (Max 6):</h6>
                      <ul className="text-gray-700 space-y-1 text-xs">
                        <li>• Add any specialized item you need</li>
                        <li>• Set custom name, price, and unit</li>
                        <li>• Add description for reference</li>
                        <li>• Maximum of 6 custom items allowed</li>
                        <li>• Adjust quantities as needed</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-orange-200">
                      <h6 className="font-medium text-gray-800 mb-2">Management:</h6>
                      <ul className="text-gray-700 space-y-1 text-xs">
                        <li>• Remove items with X button</li>
                        <li>• Update quantities anytime</li>
                        <li>• See real-time cost calculations</li>
                        <li>• Reset all to defaults</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h6 className="font-medium text-yellow-800 mb-2">🔒 Locking Your Prices:</h6>
                  <ol className="text-yellow-700 space-y-1">
                    <li>1. Adjust all prices and add custom items</li>
                    <li>2. Click "Lock Prices & Return" button</li>
                    <li>3. Automatically returns to Calculator tab</li>
                    <li>4. See updated costs with your custom pricing</li>
                    <li>5. Lock indicator shows your prices are active</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Best Practices */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h4 className="text-xl font-semibold text-purple-800 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5" />
                4. Best Practices & Tips
              </h4>
              
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h5 className="font-medium text-purple-700 mb-3">📊 Getting Accurate Estimates:</h5>
                  <ul className="text-purple-600 space-y-2">
                    <li>• <strong>Get multiple supplier quotes</strong> for current prices</li>
                    <li>• Consider transport costs for remote locations</li>
                    <li>• Add 15-20% contingency for rural areas</li>
                    <li>• Factor in seasonal price variations</li>
                    <li>• Account for quality differences in materials</li>
                    <li>• Include waste factor (typically 5-10%)</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-purple-700 mb-3">💡 Pro Tips:</h5>
                  <ul className="text-purple-600 space-y-2">
                    <li>• Start with standard quality, then customize</li>
                    <li>• Compare costs across different regions</li>
                    <li>• Use custom items for specialized needs</li>
                    <li>• Set excluded materials to zero price</li>
                    <li>• Save screenshots of your calculations</li>
                    <li>• Review breakdown tab for detailed costs</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Troubleshooting */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h4 className="text-xl font-semibold text-red-800 mb-4">🔧 Common Questions & Troubleshooting</h4>
              
              <div className="space-y-4 text-sm">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-red-700 mb-2">❓ Frequently Asked:</h5>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium text-gray-800">Q: How do I exclude materials I don't need?</p>
                        <p className="text-red-600">A: Set the material price to 0 (zero) in Customize Prices tab.</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Q: Can I add items not listed?</p>
                        <p className="text-red-600">A: Yes! Use the "Add Custom Item" feature for any specialized materials.</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Q: Why are my costs different from quotes?</p>
                        <p className="text-red-600">A: Update prices with your actual supplier quotes for accuracy.</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-700 mb-2">⚠️ Important Notes:</h5>
                    <ul className="text-red-600 space-y-1">
                      <li>• Estimates are based on 2025 Kenya market rates</li>
                      <li>• Prices vary by location and supplier</li>
                      <li>• Always add contingency for unexpected costs</li>
                      <li>• Get professional quotes for final decisions</li>
                      <li>• Consider permit and approval costs</li>
                      <li>• Factor in site access and conditions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Calculator CTA */}
          <div className="mt-8 text-center bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Ready to Calculate Your Construction Costs?</h4>
            <p className="text-gray-600 mb-4">Use this guide to get the most accurate estimate for your project</p>
            <button
              onClick={() => setActiveTab('calculator')}
              className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2 mx-auto"
            >
              <Calculator className="w-4 h-4" />
              Start Calculating Now
            </button>
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
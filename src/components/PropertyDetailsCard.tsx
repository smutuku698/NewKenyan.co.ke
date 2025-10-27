import {
  Home,
  Bed,
  Bath,
  Square,
  Calendar,
  Car,
  Star
} from 'lucide-react';

interface PropertyDetailsCardProps {
  propertyType: string;
  bedrooms?: number | null;
  bathrooms?: number | null;
  garage?: number | null;
  squareFeet?: number | null;
  yearBuilt?: number | null;
  rating?: number;
}

export default function PropertyDetailsCard({
  propertyType,
  bedrooms,
  bathrooms,
  garage,
  squareFeet,
  yearBuilt,
  rating = 0
}: PropertyDetailsCardProps) {
  const details = [
    {
      icon: Home,
      label: 'Property Type',
      value: propertyType,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Bed,
      label: 'Bedrooms',
      value: bedrooms ? `${bedrooms}` : 'N/A',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Bath,
      label: 'Bathrooms',
      value: bathrooms ? `${bathrooms}` : 'N/A',
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50'
    },
    {
      icon: Car,
      label: 'Garage',
      value: garage ? `${garage}` : '0',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      icon: Square,
      label: 'Property Size',
      value: squareFeet ? `${squareFeet.toLocaleString()} sqft` : 'N/A',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Calendar,
      label: 'Year Built',
      value: yearBuilt ? `${yearBuilt}` : 'N/A',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
      {/* Rating Section */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <h3 className="text-xl font-bold text-gray-900">Property Details</h3>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-5 w-5 ${
                star <= rating
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="ml-2 text-sm font-semibold text-gray-700">
            {rating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {details.map((detail, index) => {
          const Icon = detail.icon;
          return (
            <div
              key={index}
              className="flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 rounded-lg bg-white border border-gray-100 hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className={`${detail.bgColor} p-2 sm:p-3 rounded-lg flex-shrink-0`}>
                <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${detail.color}`} />
              </div>
              <div className="flex-1 min-w-0 overflow-hidden">
                <p className="text-xs text-gray-500 font-medium mb-0.5 truncate">
                  {detail.label}
                </p>
                <p className="text-sm font-bold text-gray-900 truncate" title={detail.value}>
                  {detail.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

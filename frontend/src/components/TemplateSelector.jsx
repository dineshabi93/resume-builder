import React from 'react';
import { X, Crown, Check } from 'lucide-react';

const TemplateSelector = ({ currentTemplate, onSelect, onClose, isPremium }) => {
  const templates = [
    {
      id: 'basic',
      name: 'Basic',
      description: 'Clean and simple design perfect for any industry',
      isPremium: false,
      preview: '/api/placeholder/300/400'
    },
    {
      id: 'modern',
      name: 'Modern',
      description: 'Contemporary design with gradient header and timeline',
      isPremium: true,
      preview: '/api/placeholder/300/400'
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Colorful and artistic design for creative professionals',
      isPremium: true,
      preview: '/api/placeholder/300/400'
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Formal and elegant design for executive positions',
      isPremium: true,
      preview: '/api/placeholder/300/400'
    }
  ];

  const handleTemplateSelect = (template) => {
    //if (template.isPremium && !isPremium) {
    //  alert('This template requires a premium subscription. Please upgrade to access premium templates.');
     // return;
   // }
    onSelect(template.id);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Choose a Template</h2>
            <p className="text-gray-600 mt-1">Select a template that best fits your style</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Templates Grid */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`relative border-2 rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
                  currentTemplate === template.id
                    ? 'border-blue-500 ring-2 ring-blue-200'
                    : 'border-gray-200 hover:border-gray-300'
                } ${
                  template.isPremium && !isPremium
                    ? 'opacity-75'
                    : ''
                }`}
                onClick={() => handleTemplateSelect(template)}
              >
                {/* Premium Badge */}
                {/*template.isPremium && (
                  <div className="absolute top-2 right-2 z-10">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                      <Crown className="h-3 w-3 mr-1" />
                      Pro
                    </div>
                  </div>
                )}

                {/* Selected Badge */}
                {currentTemplate === template.id && (
                  <div className="absolute top-2 left-2 z-10">
                    <div className="bg-blue-500 text-white p-1 rounded-full">
                      <Check className="h-4 w-4" />
                    </div>
                  </div>
                )}

                {/* Template Preview */}
                <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="w-full h-32 bg-gray-200 rounded mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-300 rounded w-3/4 mx-auto"></div>
                      <div className="h-2 bg-gray-300 rounded w-1/2 mx-auto"></div>
                      <div className="h-2 bg-gray-300 rounded w-2/3 mx-auto"></div>
                    </div>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
                  <p className="text-sm text-gray-600">{template.description}</p>
                  
                  {template.isPremium && !isPremium && (
                    <div className="mt-2">
                      <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
                        Premium Required
                      </span>
                    </div>
                  )}
                </div>

                {/* Overlay for premium templates */}
                {template.isPremium && !isPremium && (
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg text-center">
                      <Crown className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-900">Premium Template</p>
                      <p className="text-xs text-gray-600">Upgrade to unlock</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Upgrade CTA */}
          {!isPremium && (
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6 text-center">
              <Crown className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Unlock All Premium Templates
              </h3>
              <p className="text-gray-600 mb-4">
                Get access to all premium templates and advanced features with our Pro plan
              </p>
              <button
                onClick={() => {
                  onClose();
                  window.location.href = '/upgrade';
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all inline-flex items-center"
              >
                <Crown className="h-5 w-5 mr-2" />
                Upgrade to Pro
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;


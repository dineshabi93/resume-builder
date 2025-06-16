import React from 'react';
import BasicTemplate from './templates/BasicTemplate';
import ModernTemplate from './templates/ModernTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';

const ResumePreview = ({ resume, template }) => {
  const renderTemplate = () => {
    if (!resume) return null;

    switch (template) {
      case 'basic':
        return <BasicTemplate resume={resume} />;
      case 'modern':
        return <ModernTemplate resume={resume} />;
      case 'creative':
        return <CreativeTemplate resume={resume} />;
      case 'professional':
        return <ProfessionalTemplate resume={resume} />;
      default:
        return <BasicTemplate resume={resume} />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-gray-900">Preview</h3>
        <p className="text-sm text-gray-600">
          Template: {template?.charAt(0).toUpperCase() + template?.slice(1)}
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div 
          id="resume-preview" 
          className="bg-white shadow-lg mx-auto"
          style={{ 
            width: '210mm', 
            minHeight: '297mm',
            transform: 'scale(0.6)',
            transformOrigin: 'top center',
            marginBottom: '-200px'
          }}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;


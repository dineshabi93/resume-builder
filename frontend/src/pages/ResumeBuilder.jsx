import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { resumeAPI } from '../utils/axios';
import ResumeForm from '../components/ResumeForm';
import ResumePreview from '../components/ResumePreview';
import TemplateSelector from '../components/TemplateSelector';
import { Save, Download, Share2, ArrowLeft } from 'lucide-react';
import html2pdf from 'html2pdf.js';

const ResumeBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('basic');
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);

  const isNewResume = id === 'new';

  useEffect(() => {
    if (isNewResume) {
      // Initialize new resume
      setResume({
        title: 'Untitled Resume',
        template: 'basic',
        personalInfo: {
          fullName: '',
          email: '',
          phone: '',
          address: '',
          linkedin: '',
          website: '',
          summary: ''
        },
        experience: [],
        education: [],
        skills: [],
        languages: [],
        projects: []
      });
      setLoading(false);
    } else {
      fetchResume();
    }
  }, [id, isNewResume]);

  const fetchResume = async () => {
    try {
      const response = await resumeAPI.getById(id);
      setResume(response.data);
      setSelectedTemplate(response.data.template);
    } catch (error) {
      setError('Failed to fetch resume');
      console.error('Fetch resume error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      let response;
      if (isNewResume) {
        response = await resumeAPI.create(resume);
        navigate(`/resume/${response.data._id}`, { replace: true });
      } else {
        response = await resumeAPI.update(id, resume);
      }
      setResume(response.data);
    } catch (error) {
      console.error('Save resume error:', error);
      alert('Failed to save resume');
    } finally {
      setSaving(false);
    }
  };

  const handleTemplateChange = (template) => {
    // Check if user can use premium templates
    if (['modern', 'creative', 'professional'].includes(template) && !user?.isPremium) {
      alert('Premium subscription required for this template');
      return;
    }
    
    setSelectedTemplate(template);
    setResume(prev => ({ ...prev, template }));
    setShowTemplateSelector(false);
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById('resume-preview');
    const opt = {
      margin: 0.5,
      filename: `${resume.title || 'resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
  };

  const handleShare = async () => {
    try {
      const response = await resumeAPI.togglePublic(id);
      setResume(response.data);
      
      if (response.data.isPublic) {
        const shareUrl = `${window.location.origin}/public/${response.data.publicSlug}`;
        navigator.clipboard.writeText(shareUrl);
        alert('Resume is now public! Share link copied to clipboard.');
      } else {
        alert('Resume is now private.');
      }
    } catch (error) {
      console.error('Share resume error:', error);
      alert('Failed to update resume visibility');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {resume?.title || 'Untitled Resume'}
                </h1>
                <p className="text-sm text-gray-600">
                  Template: {selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowTemplateSelector(true)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Change Template
              </button>
              
              {!isNewResume && (
                <>
                  <button
                    onClick={handleShare}
                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors inline-flex items-center"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    {resume?.isPublic ? 'Make Private' : 'Share'}
                  </button>
                  
                  <button
                    onClick={handleDownloadPDF}
                    className="px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors inline-flex items-center"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </button>
                </>
              )}
              
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors inline-flex items-center disabled:opacity-50"
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <ResumeForm 
              resume={resume} 
              onChange={setResume}
            />
          </div>
          
          {/* Preview Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-6">
            <ResumePreview 
              resume={resume} 
              template={selectedTemplate}
            />
          </div>
        </div>
      </div>

      {/* Template Selector Modal */}
      {showTemplateSelector && (
        <TemplateSelector
          currentTemplate={selectedTemplate}
          onSelect={handleTemplateChange}
          onClose={() => setShowTemplateSelector(false)}
          isPremium={user?.isPremium}
        />
      )}
    </div>
  );
};

export default ResumeBuilder;


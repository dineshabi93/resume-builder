import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { resumeAPI } from '../utils/axios';
import { 
  Plus, 
  FileText, 
  Edit3, 
  Trash2, 
  Eye, 
  Share2, 
  Download,
  Calendar,
  Crown
} from 'lucide-react';

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await resumeAPI.getAll();
      setResumes(response.data);
    } catch (error) {
      setError('Failed to fetch resumes');
      console.error('Fetch resumes error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateResume = () => {
    navigate('/resume/new');
  };

  const handleEditResume = (resumeId) => {
    navigate(`/resume/${resumeId}`);
  };

  const handleDeleteResume = async (resumeId) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await resumeAPI.delete(resumeId);
        setResumes(resumes.filter(resume => resume._id !== resumeId));
      } catch (error) {
        console.error('Delete resume error:', error);
        alert('Failed to delete resume');
      }
    }
  };

  const handleTogglePublic = async (resumeId) => {
    try {
      const response = await resumeAPI.togglePublic(resumeId);
      setResumes(resumes.map(resume => 
        resume._id === resumeId ? response.data : resume
      ));
    } catch (error) {
      console.error('Toggle public error:', error);
      alert('Failed to update resume visibility');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTemplateColor = (template) => {
    const colors = {
      basic: 'bg-blue-100 text-blue-800',
      modern: 'bg-purple-100 text-purple-800',
      creative: 'bg-pink-100 text-pink-800',
      professional: 'bg-green-100 text-green-800'
    };
    return colors[template] || colors.basic;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your resumes and track your job applications
              </p>
            </div>
            
            {!user?.isPremium && (
              <Link
                to="/upgrade"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all inline-flex items-center"
              >
                <Crown className="h-5 w-5 mr-2" />
                Upgrade to Pro
              </Link>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Resumes</p>
                <p className="text-2xl font-bold text-gray-900">{resumes.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Public Resumes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {resumes.filter(resume => resume.isPublic).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Crown className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Account Type</p>
                <p className="text-2xl font-bold text-gray-900">
                  {user?.isPremium ? 'Pro' : 'Free'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Create New Resume Button */}
        <div className="mb-8">
          <button
            onClick={handleCreateResume}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create New Resume
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        {/* Resumes Grid */}
        {resumes.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No resumes yet</h3>
            <p className="text-gray-600 mb-6">
              Create your first resume to get started with your job search
            </p>
            <button
              onClick={handleCreateResume}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Your First Resume
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <div key={resume._id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {resume.title}
                      </h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTemplateColor(resume.template)}`}>
                          {resume.template.charAt(0).toUpperCase() + resume.template.slice(1)}
                        </span>
                        {resume.isPublic && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Public
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        Updated {formatDate(resume.updatedAt)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditResume(resume._id)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Resume"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={() => handleTogglePublic(resume._id)}
                        className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title={resume.isPublic ? "Make Private" : "Make Public"}
                      >
                        {resume.isPublic ? <Eye className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                      </button>
                      
                      <button
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Download PDF"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => handleDeleteResume(resume._id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Resume"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;


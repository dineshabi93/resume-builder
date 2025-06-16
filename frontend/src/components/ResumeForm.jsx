import React, { useState } from 'react';
import { Plus, Trash2, User, Briefcase, GraduationCap, Code, Globe, FolderOpen } from 'lucide-react';

const ResumeForm = ({ resume, onChange }) => {
  const [activeSection, setActiveSection] = useState('personal');

  const updateResume = (section, data) => {
    onChange(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const updatePersonalInfo = (field, value) => {
    onChange(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const addArrayItem = (section, item) => {
    onChange(prev => ({
      ...prev,
      [section]: [...prev[section], item]
    }));
  };

  const updateArrayItem = (section, index, item) => {
    onChange(prev => ({
      ...prev,
      [section]: prev[section].map((existing, i) => i === index ? item : existing)
    }));
  };

  const removeArrayItem = (section, index) => {
    onChange(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'languages', label: 'Languages', icon: Globe },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
  ];

  const renderPersonalInfo = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={resume?.personalInfo?.fullName || ''}
            onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
            className="form-input"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={resume?.personalInfo?.email || ''}
            onChange={(e) => updatePersonalInfo('email', e.target.value)}
            className="form-input"
            placeholder="john@example.com"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="tel"
            value={resume?.personalInfo?.phone || ''}
            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
            className="form-input"
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            value={resume?.personalInfo?.address || ''}
            onChange={(e) => updatePersonalInfo('address', e.target.value)}
            className="form-input"
            placeholder="City, State, Country"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            LinkedIn
          </label>
          <input
            type="url"
            value={resume?.personalInfo?.linkedin || ''}
            onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
            className="form-input"
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Website
          </label>
          <input
            type="url"
            value={resume?.personalInfo?.website || ''}
            onChange={(e) => updatePersonalInfo('website', e.target.value)}
            className="form-input"
            placeholder="https://johndoe.com"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Professional Summary
        </label>
        <textarea
          value={resume?.personalInfo?.summary || ''}
          onChange={(e) => updatePersonalInfo('summary', e.target.value)}
          rows={4}
          className="form-input"
          placeholder="Brief summary of your professional background and goals..."
        />
      </div>
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-4">
      {resume?.experience?.map((exp, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-start mb-4">
            <h4 className="text-lg font-medium text-gray-900">Experience {index + 1}</h4>
            <button
              onClick={() => removeArrayItem('experience', index)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company
              </label>
              <input
                type="text"
                value={exp.company || ''}
                onChange={(e) => updateArrayItem('experience', index, { ...exp, company: e.target.value })}
                className="form-input"
                placeholder="Company Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Position
              </label>
              <input
                type="text"
                value={exp.position || ''}
                onChange={(e) => updateArrayItem('experience', index, { ...exp, position: e.target.value })}
                className="form-input"
                placeholder="Job Title"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="text"
                value={exp.startDate || ''}
                onChange={(e) => updateArrayItem('experience', index, { ...exp, startDate: e.target.value })}
                className="form-input"
                placeholder="Jan 2020"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="text"
                value={exp.endDate || ''}
                onChange={(e) => updateArrayItem('experience', index, { ...exp, endDate: e.target.value })}
                className="form-input"
                placeholder="Dec 2022"
                disabled={exp.current}
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={exp.current || false}
                onChange={(e) => updateArrayItem('experience', index, { 
                  ...exp, 
                  current: e.target.checked,
                  endDate: e.target.checked ? 'Present' : exp.endDate
                })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">
                Current Position
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={exp.description || ''}
              onChange={(e) => updateArrayItem('experience', index, { ...exp, description: e.target.value })}
              rows={3}
              className="form-input"
              placeholder="Describe your responsibilities and achievements..."
            />
          </div>
        </div>
      ))}
      
      <button
        onClick={() => addArrayItem('experience', {
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          current: false,
          description: ''
        })}
        className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center"
      >
        <Plus className="h-5 w-5 mr-2" />
        Add Experience
      </button>
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-4">
      {resume?.education?.map((edu, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-start mb-4">
            <h4 className="text-lg font-medium text-gray-900">Education {index + 1}</h4>
            <button
              onClick={() => removeArrayItem('education', index)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Institution
              </label>
              <input
                type="text"
                value={edu.institution || ''}
                onChange={(e) => updateArrayItem('education', index, { ...edu, institution: e.target.value })}
                className="form-input"
                placeholder="University Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Degree
              </label>
              <input
                type="text"
                value={edu.degree || ''}
                onChange={(e) => updateArrayItem('education', index, { ...edu, degree: e.target.value })}
                className="form-input"
                placeholder="Bachelor's, Master's, etc."
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Field of Study
              </label>
              <input
                type="text"
                value={edu.field || ''}
                onChange={(e) => updateArrayItem('education', index, { ...edu, field: e.target.value })}
                className="form-input"
                placeholder="Computer Science"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="text"
                value={edu.startDate || ''}
                onChange={(e) => updateArrayItem('education', index, { ...edu, startDate: e.target.value })}
                className="form-input"
                placeholder="2018"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="text"
                value={edu.endDate || ''}
                onChange={(e) => updateArrayItem('education', index, { ...edu, endDate: e.target.value })}
                className="form-input"
                placeholder="2022"
              />
            </div>
          </div>
        </div>
      ))}
      
      <button
        onClick={() => addArrayItem('education', {
          institution: '',
          degree: '',
          field: '',
          startDate: '',
          endDate: '',
          gpa: ''
        })}
        className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center"
      >
        <Plus className="h-5 w-5 mr-2" />
        Add Education
      </button>
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-4">
      {resume?.skills?.map((skill, index) => (
        <div key={index} className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg">
          <div className="flex-1">
            <input
              type="text"
              value={skill.name || ''}
              onChange={(e) => updateArrayItem('skills', index, { ...skill, name: e.target.value })}
              className="form-input"
              placeholder="Skill name"
            />
          </div>
          <div className="w-32">
            <select
              value={skill.level || 'Intermediate'}
              onChange={(e) => updateArrayItem('skills', index, { ...skill, level: e.target.value })}
              className="form-input"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
          <button
            onClick={() => removeArrayItem('skills', index)}
            className="text-red-600 hover:text-red-800"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      
      <button
        onClick={() => addArrayItem('skills', { name: '', level: 'Intermediate' })}
        className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center"
      >
        <Plus className="h-5 w-5 mr-2" />
        Add Skill
      </button>
    </div>
  );

  const renderLanguages = () => (
    <div className="space-y-4">
      {resume?.languages?.map((language, index) => (
        <div key={index} className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg">
          <div className="flex-1">
            <input
              type="text"
              value={language.name || ''}
              onChange={(e) => updateArrayItem('languages', index, { ...language, name: e.target.value })}
              className="form-input"
              placeholder="Language name"
            />
          </div>
          <div className="w-32">
            <select
              value={language.proficiency || 'Conversational'}
              onChange={(e) => updateArrayItem('languages', index, { ...language, proficiency: e.target.value })}
              className="form-input"
            >
              <option value="Basic">Basic</option>
              <option value="Conversational">Conversational</option>
              <option value="Fluent">Fluent</option>
              <option value="Native">Native</option>
            </select>
          </div>
          <button
            onClick={() => removeArrayItem('languages', index)}
            className="text-red-600 hover:text-red-800"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      
      <button
        onClick={() => addArrayItem('languages', { name: '', proficiency: 'Conversational' })}
        className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center"
      >
        <Plus className="h-5 w-5 mr-2" />
        Add Language
      </button>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-4">
      {resume?.projects?.map((project, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-start mb-4">
            <h4 className="text-lg font-medium text-gray-900">Project {index + 1}</h4>
            <button
              onClick={() => removeArrayItem('projects', index)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Name
              </label>
              <input
                type="text"
                value={project.name || ''}
                onChange={(e) => updateArrayItem('projects', index, { ...project, name: e.target.value })}
                className="form-input"
                placeholder="Project Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Link
              </label>
              <input
                type="url"
                value={project.link || ''}
                onChange={(e) => updateArrayItem('projects', index, { ...project, link: e.target.value })}
                className="form-input"
                placeholder="https://github.com/username/project"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Technologies Used
            </label>
            <input
              type="text"
              value={project.technologies || ''}
              onChange={(e) => updateArrayItem('projects', index, { ...project, technologies: e.target.value })}
              className="form-input"
              placeholder="React, Node.js, MongoDB"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={project.description || ''}
              onChange={(e) => updateArrayItem('projects', index, { ...project, description: e.target.value })}
              rows={3}
              className="form-input"
              placeholder="Describe the project and your role..."
            />
          </div>
        </div>
      ))}
      
      <button
        onClick={() => addArrayItem('projects', {
          name: '',
          description: '',
          technologies: '',
          link: '',
          startDate: '',
          endDate: ''
        })}
        className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center"
      >
        <Plus className="h-5 w-5 mr-2" />
        Add Project
      </button>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'personal':
        return renderPersonalInfo();
      case 'experience':
        return renderExperience();
      case 'education':
        return renderEducation();
      case 'skills':
        return renderSkills();
      case 'languages':
        return renderLanguages();
      case 'projects':
        return renderProjects();
      default:
        return renderPersonalInfo();
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Section Navigation */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex space-x-1 overflow-x-auto">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{section.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {sections.find(s => s.id === activeSection)?.label}
          </h3>
        </div>
        {renderSection()}
      </div>
    </div>
  );
};

export default ResumeForm;


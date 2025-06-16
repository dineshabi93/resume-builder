import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

const BasicTemplate = ({ resume }) => {
  const { personalInfo, experience, education, skills, languages, projects } = resume;

  return (
    <div className="p-8 bg-white text-gray-900 font-sans leading-relaxed">
      {/* Header */}
      <div className="text-center mb-8 border-b-2 border-gray-300 pb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {personalInfo?.fullName || 'Your Name'}
        </h1>
        
        <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-600">
          {personalInfo?.email && (
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              {personalInfo.email}
            </div>
          )}
          {personalInfo?.phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-1" />
              {personalInfo.phone}
            </div>
          )}
          {personalInfo?.address && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {personalInfo.address}
            </div>
          )}
          {personalInfo?.linkedin && (
            <div className="flex items-center">
              <Linkedin className="h-4 w-4 mr-1" />
              LinkedIn
            </div>
          )}
          {personalInfo?.website && (
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-1" />
              Website
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {personalInfo?.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            Professional Experience
          </h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {exp.position}
                </h3>
                <span className="text-sm text-gray-600">
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              <p className="text-gray-700 font-medium mb-2">{exp.company}</p>
              {exp.description && (
                <p className="text-gray-700 leading-relaxed">
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            Education
          </h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {edu.degree} in {edu.field}
                </h3>
                <span className="text-sm text-gray-600">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              <p className="text-gray-700">{edu.institution}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            Skills
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {skills.map((skill, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-gray-700">{skill.name}</span>
                <span className="text-sm text-gray-600">{skill.level}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {languages && languages.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            Languages
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {languages.map((language, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-gray-700">{language.name}</span>
                <span className="text-sm text-gray-600">{language.proficiency}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            Projects
          </h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {project.name}
              </h3>
              {project.technologies && (
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Technologies:</strong> {project.technologies}
                </p>
              )}
              {project.description && (
                <p className="text-gray-700 leading-relaxed">
                  {project.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BasicTemplate;


import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

const ProfessionalTemplate = ({ resume }) => {
  const { personalInfo, experience, education, skills, languages, projects } = resume;

  return (
    <div className="bg-white text-gray-900 font-serif">
      {/* Header */}
      <div className="border-b-4 border-gray-800 pb-6 mb-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-wide">
            {personalInfo?.fullName || 'Your Name'}
          </h1>
          
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-700">
            {personalInfo?.email && (
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                {personalInfo.email}
              </div>
            )}
            {personalInfo?.phone && (
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                {personalInfo.phone}
              </div>
            )}
            {personalInfo?.address && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                {personalInfo.address}
              </div>
            )}
            {personalInfo?.linkedin && (
              <div className="flex items-center">
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn Profile
              </div>
            )}
            {personalInfo?.website && (
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                Portfolio Website
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-8">
        {/* Summary */}
        {personalInfo?.summary && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wider border-b-2 border-gray-300 pb-2">
              Executive Summary
            </h2>
            <p className="text-gray-700 leading-relaxed text-justify">
              {personalInfo.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wider border-b-2 border-gray-300 pb-2">
              Professional Experience
            </h2>
            {experience.map((exp, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {exp.position}
                    </h3>
                    <p className="text-gray-700 font-semibold italic">{exp.company}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-600 font-medium bg-gray-100 px-3 py-1 rounded">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                </div>
                {exp.description && (
                  <div className="ml-4 border-l-2 border-gray-200 pl-4">
                    <p className="text-gray-700 leading-relaxed text-justify">
                      {exp.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wider border-b-2 border-gray-300 pb-2">
              Education
            </h2>
            {education.map((edu, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {edu.degree} in {edu.field}
                    </h3>
                    <p className="text-gray-700 italic">{edu.institution}</p>
                  </div>
                  <span className="text-sm text-gray-600 font-medium">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-8">
          {/* Skills */}
          {skills && skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wider border-b-2 border-gray-300 pb-2">
                Core Competencies
              </h2>
              <div className="space-y-2">
                {skills.map((skill, index) => (
                  <div key={index} className="flex justify-between items-center py-1">
                    <span className="text-gray-700 font-medium">{skill.name}</span>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((dot) => (
                        <div
                          key={dot}
                          className={`w-2 h-2 rounded-full ${
                            (skill.level === 'Expert' && dot <= 5) ||
                            (skill.level === 'Advanced' && dot <= 4) ||
                            (skill.level === 'Intermediate' && dot <= 3) ||
                            (skill.level === 'Beginner' && dot <= 2)
                              ? 'bg-gray-800'
                              : 'bg-gray-300'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages && languages.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wider border-b-2 border-gray-300 pb-2">
                Languages
              </h2>
              <div className="space-y-2">
                {languages.map((language, index) => (
                  <div key={index} className="flex justify-between items-center py-1">
                    <span className="text-gray-700 font-medium">{language.name}</span>
                    <span className="text-sm text-gray-600 font-medium bg-gray-100 px-2 py-1 rounded">
                      {language.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Projects */}
        {projects && projects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wider border-b-2 border-gray-300 pb-2">
              Notable Projects
            </h2>
            {projects.map((project, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {project.name}
                </h3>
                {project.technologies && (
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-semibold">Technologies:</span> {project.technologies}
                  </p>
                )}
                {project.description && (
                  <div className="ml-4 border-l-2 border-gray-200 pl-4">
                    <p className="text-gray-700 leading-relaxed text-justify">
                      {project.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalTemplate;


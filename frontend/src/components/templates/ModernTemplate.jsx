import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

const ModernTemplate = ({ resume }) => {
  const { personalInfo, experience, education, skills, languages, projects } = resume;

  return (
    <div className="bg-white text-gray-900 font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
        <h1 className="text-4xl font-bold mb-2">
          {personalInfo?.fullName || 'Your Name'}
        </h1>
        
        <div className="flex flex-wrap gap-4 text-sm opacity-90">
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

      <div className="p-8">
        {/* Summary */}
        {personalInfo?.summary && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4 flex items-center">
              <div className="w-1 h-6 bg-blue-600 mr-3"></div>
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
              {personalInfo.summary}
            </p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="col-span-2">
            {/* Experience */}
            {experience && experience.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-blue-600 mb-4 flex items-center">
                  <div className="w-1 h-6 bg-blue-600 mr-3"></div>
                  Professional Experience
                </h2>
                {experience.map((exp, index) => (
                  <div key={index} className="mb-6 relative pl-6">
                    <div className="absolute left-0 top-2 w-3 h-3 bg-blue-600 rounded-full"></div>
                    <div className="absolute left-1.5 top-5 w-0.5 h-full bg-blue-200"></div>
                    
                    <div className="bg-white border-l-4 border-blue-600 pl-4 py-2">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {exp.position}
                        </h3>
                        <span className="text-sm text-white bg-blue-600 px-2 py-1 rounded">
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      <p className="text-blue-600 font-medium mb-2">{exp.company}</p>
                      {exp.description && (
                        <p className="text-gray-700 leading-relaxed">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-blue-600 mb-4 flex items-center">
                  <div className="w-1 h-6 bg-blue-600 mr-3"></div>
                  Projects
                </h2>
                {projects.map((project, index) => (
                  <div key={index} className="mb-4 bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {project.name}
                    </h3>
                    {project.technologies && (
                      <div className="mb-2">
                        <span className="text-sm font-medium text-blue-600">Technologies: </span>
                        <span className="text-sm text-gray-700">{project.technologies}</span>
                      </div>
                    )}
                    {project.description && (
                      <p className="text-gray-700 leading-relaxed text-sm">
                        {project.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column */}
          <div>
            {/* Education */}
            {education && education.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-blue-600 mb-4">Education</h2>
                {education.map((edu, index) => (
                  <div key={index} className="mb-4 bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {edu.degree}
                    </h3>
                    <p className="text-blue-600 text-sm font-medium">{edu.field}</p>
                    <p className="text-gray-700 text-sm">{edu.institution}</p>
                    <p className="text-gray-600 text-xs">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            {skills && skills.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-blue-600 mb-4">Skills</h2>
                <div className="space-y-3">
                  {skills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700 font-medium">{skill.name}</span>
                        <span className="text-gray-600">{skill.level}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                          style={{ 
                            width: skill.level === 'Expert' ? '100%' : 
                                   skill.level === 'Advanced' ? '80%' : 
                                   skill.level === 'Intermediate' ? '60%' : '40%' 
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {languages && languages.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-blue-600 mb-4">Languages</h2>
                <div className="space-y-2">
                  {languages.map((language, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-700 font-medium">{language.name}</span>
                      <span className="text-blue-600">{language.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;


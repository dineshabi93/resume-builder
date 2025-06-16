import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

const CreativeTemplate = ({ resume }) => {
  const { personalInfo, experience, education, skills, languages, projects } = resume;

  return (
    <div className="bg-white text-gray-900 font-sans">
      <div className="grid grid-cols-3 min-h-full">
        {/* Left Sidebar */}
        <div className="bg-gradient-to-b from-pink-500 to-purple-600 text-white p-6">
          {/* Profile */}
          <div className="text-center mb-8">
            <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-4xl font-bold">
                {personalInfo?.fullName?.split(' ').map(n => n[0]).join('') || 'YN'}
              </span>
            </div>
            <h1 className="text-2xl font-bold mb-2">
              {personalInfo?.fullName || 'Your Name'}
            </h1>
          </div>

          {/* Contact */}
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4 border-b border-white border-opacity-30 pb-2">
              Contact
            </h2>
            <div className="space-y-3 text-sm">
              {personalInfo?.email && (
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 opacity-80" />
                  <span className="break-all">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo?.phone && (
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 opacity-80" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo?.address && (
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 opacity-80" />
                  <span>{personalInfo.address}</span>
                </div>
              )}
              {personalInfo?.linkedin && (
                <div className="flex items-center">
                  <Linkedin className="h-4 w-4 mr-2 opacity-80" />
                  <span>LinkedIn</span>
                </div>
              )}
              {personalInfo?.website && (
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-2 opacity-80" />
                  <span>Website</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {skills && skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4 border-b border-white border-opacity-30 pb-2">
                Skills
              </h2>
              <div className="space-y-3">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                      <div 
                        className="bg-white h-2 rounded-full"
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
              <h2 className="text-lg font-bold mb-4 border-b border-white border-opacity-30 pb-2">
                Languages
              </h2>
              <div className="space-y-2">
                {languages.map((language, index) => (
                  <div key={index} className="text-sm">
                    <div className="font-medium">{language.name}</div>
                    <div className="text-xs opacity-80">{language.proficiency}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="col-span-2 p-8">
          {/* Summary */}
          {personalInfo?.summary && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-pink-600 mb-4 relative">
                About Me
                <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-pink-500 to-purple-600"></div>
              </h2>
              <p className="text-gray-700 leading-relaxed italic border-l-4 border-pink-500 pl-4">
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-pink-600 mb-4 relative">
                Experience
                <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-pink-500 to-purple-600"></div>
              </h2>
              {experience.map((exp, index) => (
                <div key={index} className="mb-6 relative">
                  <div className="absolute left-0 top-0 w-4 h-4 bg-pink-500 rounded-full transform -translate-x-2"></div>
                  <div className="ml-6 border-l-2 border-pink-200 pl-6 pb-4">
                    <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-gray-900">
                          {exp.position}
                        </h3>
                        <span className="text-sm text-pink-600 font-medium bg-pink-100 px-2 py-1 rounded">
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      <p className="text-purple-600 font-semibold mb-2">{exp.company}</p>
                      {exp.description && (
                        <p className="text-gray-700 leading-relaxed">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-pink-600 mb-4 relative">
                Education
                <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-pink-500 to-purple-600"></div>
              </h2>
              {education.map((edu, index) => (
                <div key={index} className="mb-4 bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {edu.degree} in {edu.field}
                    </h3>
                    <span className="text-sm text-pink-600 font-medium">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  <p className="text-purple-600 font-medium">{edu.institution}</p>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-pink-600 mb-4 relative">
                Projects
                <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-pink-500 to-purple-600"></div>
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {projects.map((project, index) => (
                  <div key={index} className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg border-l-4 border-pink-500">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {project.name}
                    </h3>
                    {project.technologies && (
                      <div className="mb-2">
                        <span className="text-sm font-medium text-pink-600">Tech Stack: </span>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;


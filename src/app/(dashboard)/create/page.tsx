'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function CreatePage() {
  const createOptions = [
    {
      title: 'Instagram Post',
      subtitle: '1080 x 1080 px',
      icon: '📱',
      color: 'bg-pink-500',
    },
    {
      title: 'Instagram Story',
      subtitle: '1080 x 1920 px',
      icon: '📖',
      color: 'bg-purple-500',
    },
    {
      title: 'Facebook Post',
      subtitle: '1200 x 630 px',
      icon: '📘',
      color: 'bg-blue-600',
    },
    {
      title: 'Twitter Header',
      subtitle: '1500 x 500 px',
      icon: '🐦',
      color: 'bg-sky-500',
    },
    {
      title: 'LinkedIn Post',
      subtitle: '1200 x 627 px',
      icon: '💼',
      color: 'bg-blue-700',
    },
    {
      title: 'Custom Size',
      subtitle: 'Your dimensions',
      icon: '📐',
      color: 'bg-gray-500',
    },
  ];

  const handleCreateProject = (option: typeof createOptions[0]) => {
    console.log('Creating project:', option.title);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Create New Design</h1>
        <p className="mt-1 text-sm text-gray-600">
          Choose a format to get started with your design
        </p>
      </div>

      {/* Quick Start */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Start</h2>
        <Link href="/templates">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer border border-gray-200 hover:border-indigo-300">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center text-white text-2xl">
                  ⚡
                </div>
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-medium text-gray-900">
                  Start from Template
                </h3>
                <p className="text-sm text-gray-500">
                  Browse our collection of professional templates
                </p>
              </div>
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Create from Scratch */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Create from Scratch</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {createOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => handleCreateProject(option)}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow text-left border border-gray-200 hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 ${option.color} rounded-lg flex items-center justify-center text-white text-2xl mb-4`}>
                  {option.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {option.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {option.subtitle}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Projects */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Continue Recent</h2>
        <div className="bg-white rounded-lg shadow">
          <div className="p-12 text-center">
            <div className="text-4xl mb-4">📁</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No recent projects
            </h3>
            <p className="text-gray-500">
              Your recent projects will appear here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
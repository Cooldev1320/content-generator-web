'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Card, Input } from '@/components/ui';

function CreatePageContent() {
  const [projectName, setProjectName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const router = useRouter();
  const searchParams = useSearchParams();

  // Mock templates data - TODO: Replace with API call
  const [templates] = useState([
    {
      id: 'blank',
      name: 'Blank Canvas',
      description: 'Start with a completely blank canvas',
      thumbnail: '🎨',
      category: 'blank'
    },
    {
      id: 'social-post',
      name: 'Social Media Post',
      description: 'Perfect for Instagram, Facebook, Twitter posts',
      thumbnail: '📱',
      category: 'social'
    },
    {
      id: 'banner',
      name: 'Banner Design',
      description: 'Create eye-catching banners and headers',
      thumbnail: '🏷️',
      category: 'marketing'
    },
    {
      id: 'presentation',
      name: 'Presentation Slide',
      description: 'Professional presentation templates',
      thumbnail: '📊',
      category: 'business'
    },
    {
      id: 'flyer',
      name: 'Flyer Template',
      description: 'Event flyers and promotional materials',
      thumbnail: '📄',
      category: 'marketing'
    },
    {
      id: 'logo',
      name: 'Logo Design',
      description: 'Create professional logos and branding',
      thumbnail: '🎯',
      category: 'branding'
    }
  ]);

  useEffect(() => {
    // Check if template is selected from URL
    const templateId = searchParams.get('template');
    if (templateId) {
      setSelectedTemplate(templateId);
      const template = templates.find(t => t.id === templateId);
      if (template) {
        setProjectName(`${template.name} Project`);
      }
    }
  }, [searchParams, templates]);

  const handleCreateProject = async () => {
    if (!projectName.trim()) {
      setError('Please enter a project name');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // TODO: Replace with API call
      // const response = await apiClient.createProject({
      //   name: projectName,
      //   templateId: selectedTemplate,
      //   description: `Created from ${selectedTemplate || 'blank'} template`
      // });

      // For now, create project in localStorage
      const newProject = {
        id: `project_${Date.now()}`,
        name: projectName,
        templateId: selectedTemplate,
        description: `Created from ${selectedTemplate || 'blank'} template`,
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        canvasData: null,
        thumbnailUrl: null
      };

      // Save to localStorage
      const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]');
      existingProjects.push(newProject);
      localStorage.setItem('projects', JSON.stringify(existingProjects));

      // Redirect to editor
      router.push(`/editor/${newProject.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = templates.find(t => t.id === templateId);
    if (template && !projectName) {
      setProjectName(`${template.name} Project`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Create New Project</h1>
          <p className="text-gray-600">
            Choose a template or start with a blank canvas to create your content.
          </p>
        </div>

        {/* Project Name Input */}
        <div className="mb-8">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h2>
            <Input
              label="Project Name"
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter your project name"
              required
            />
          </Card>
        </div>

        {/* Template Selection */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Choose a Template</h2>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card
                key={template.id}
                className={`p-6 cursor-pointer transition-all ${
                  selectedTemplate === template.id
                    ? 'ring-2 ring-blue-500 bg-blue-50'
                    : 'hover:shadow-md hover:bg-gray-50'
                }`}
                onClick={() => handleTemplateSelect(template.id)}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{template.thumbnail}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {template.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {template.description}
                  </p>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">
                    {template.category}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => router.back()}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleCreateProject}
            isLoading={isLoading}
            disabled={!projectName.trim() || isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Project'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function CreatePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <CreatePageContent />
    </Suspense>
  );
}

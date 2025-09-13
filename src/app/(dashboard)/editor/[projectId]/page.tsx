'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button, Card } from '@/components/ui';

export default function ProjectEditorPage() {
  const [project, setProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  const router = useRouter();
  const params = useParams();
  const projectId = params.projectId as string;

  useEffect(() => {
    if (projectId) {
      loadProject();
    }
  }, [projectId]);

  const loadProject = () => {
    try {
      // TODO: Replace with API call
      // const response = await apiClient.getProject(projectId);
      // setProject(response.data);

      // For now, load from localStorage
      const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
      const foundProject = savedProjects.find((p: any) => p.id === projectId);
      
      if (foundProject) {
        setProject(foundProject);
      } else {
        setError('Project not found');
      }
    } catch (err) {
      setError('Failed to load project');
      console.error('Failed to load project:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!project) return;

    setIsSaving(true);
    try {
      // TODO: Replace with API call
      // const response = await apiClient.updateProject(projectId, {
      //   ...project,
      //   updatedAt: new Date().toISOString()
      // });

      // For now, save to localStorage
      const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
      const updatedProjects = savedProjects.map((p: any) => 
        p.id === projectId 
          ? { ...project, updatedAt: new Date().toISOString() }
          : p
      );
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
      
      // Add to history
      const history = JSON.parse(localStorage.getItem('history') || '[]');
      history.unshift({
        id: `history_${Date.now()}`,
        projectId: project.id,
        projectName: project.name,
        action: 'updated',
        description: 'Project updated',
        timestamp: new Date().toISOString(),
        details: 'Canvas and project data saved'
      });
      localStorage.setItem('history', JSON.stringify(history.slice(0, 100))); // Keep last 100 entries

      setHasUnsavedChanges(false);
    } catch (err) {
      console.error('Failed to save project:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = (format: string) => {
    if (!project) return;

    // TODO: Replace with API call
    // const response = await apiClient.exportProject(projectId, format);

    // For now, simulate export
    alert(`Exporting project as ${format.toUpperCase()}... (This will be implemented with API integration)`);
    
    // Add to history
    const history = JSON.parse(localStorage.getItem('history') || '[]');
    history.unshift({
      id: `history_${Date.now()}`,
      projectId: project.id,
      projectName: project.name,
      action: 'exported',
      description: `Project exported as ${format.toUpperCase()}`,
      timestamp: new Date().toISOString(),
      details: `Format: ${format.toUpperCase()}`
    });
    localStorage.setItem('history', JSON.stringify(history.slice(0, 100)));
  };

  const handleShare = () => {
    if (!project) return;

    // TODO: Replace with API call
    // const response = await apiClient.shareProject(projectId);

    // For now, simulate sharing
    const shareUrl = `${window.location.origin}/shared/${projectId}`;
    navigator.clipboard.writeText(shareUrl);
    alert('Share link copied to clipboard!');
    
    // Add to history
    const history = JSON.parse(localStorage.getItem('history') || '[]');
    history.unshift({
      id: `history_${Date.now()}`,
      projectId: project.id,
      projectName: project.name,
      action: 'shared',
      description: 'Project shared',
      timestamp: new Date().toISOString(),
      details: 'Share link generated'
    });
    localStorage.setItem('history', JSON.stringify(history.slice(0, 100)));
  };

  const handleDelete = () => {
    if (!project) return;

    if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      try {
        // TODO: Replace with API call
        // await apiClient.deleteProject(projectId);

        // For now, delete from localStorage
        const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
        const updatedProjects = savedProjects.filter((p: any) => p.id !== projectId);
        localStorage.setItem('projects', JSON.stringify(updatedProjects));

        // Add to history
        const history = JSON.parse(localStorage.getItem('history') || '[]');
        history.unshift({
          id: `history_${Date.now()}`,
          projectId: project.id,
          projectName: project.name,
          action: 'deleted',
          description: 'Project deleted',
          timestamp: new Date().toISOString(),
          details: 'Project permanently removed'
        });
        localStorage.setItem('history', JSON.stringify(history.slice(0, 100)));

        router.push('/projects');
      } catch (err) {
        console.error('Failed to delete project:', err);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">❌</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Project Not Found</h3>
          <p className="text-gray-600 mb-6">{error || 'The project you are looking for does not exist.'}</p>
          <Button variant="primary" onClick={() => router.push('/projects')}>
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/projects')}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">{project.name}</h1>
              <p className="text-sm text-gray-600">
                {project.templateId ? `Template: ${project.templateId}` : 'Blank Canvas'}
                {hasUnsavedChanges && ' • Unsaved changes'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExport('png')}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export PNG
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExport('pdf')}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Export PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              Share
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSave}
              isLoading={isSaving}
              disabled={!hasUnsavedChanges}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex h-[calc(100vh-73px)]">
        {/* Canvas Area */}
        <div className="flex-1 bg-white">
          <div className="h-full flex items-center justify-center bg-gray-100">
            <Card className="p-8 max-w-2xl w-full mx-4">
              <div className="text-center">
                <div className="text-6xl mb-4">🎨</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Canvas Editor</h2>
                <p className="text-gray-600 mb-6">
                  This is where the canvas editor will be implemented. 
                  The actual canvas functionality will be added with Fabric.js integration.
                </p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p>• Drag and drop elements</p>
                  <p>• Text editing and styling</p>
                  <p>• Image uploads and manipulation</p>
                  <p>• Layer management</p>
                  <p>• Export in multiple formats</p>
                </div>
                <div className="mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setHasUnsavedChanges(true)}
                  >
                    Simulate Changes
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
          {/* Tools Panel */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Tools</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Text
              </Button>
              <Button variant="outline" size="sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Image
              </Button>
              <Button variant="outline" size="sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
                Shape
              </Button>
              <Button variant="outline" size="sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v18a1 1 0 01-1 1H4a1 1 0 01-1-1V1a1 1 0 011-1h2a1 1 0 011 1v3m0 0h8" />
                </svg>
                Icon
              </Button>
            </div>
          </div>

          {/* Layers Panel */}
          <div className="p-4 border-b border-gray-200 flex-1">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Layers</h3>
            <div className="space-y-2">
              <div className="p-2 bg-gray-50 rounded text-sm text-gray-600">
                Background Layer
              </div>
              <div className="p-2 bg-blue-50 rounded text-sm text-gray-600">
                Text Layer 1
              </div>
              <div className="p-2 bg-gray-50 rounded text-sm text-gray-600">
                Image Layer 1
              </div>
            </div>
          </div>

          {/* Properties Panel */}
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Properties</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Position</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="X"
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                  />
                  <input
                    type="number"
                    placeholder="Y"
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Size</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="W"
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                  />
                  <input
                    type="number"
                    placeholder="H"
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

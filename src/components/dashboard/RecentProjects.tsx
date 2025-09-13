'use client';

import { useState } from 'react';
import { Button, Card } from '@/components/ui';
import ProjectCard from './ProjectCard';
import Link from 'next/link';

interface RecentProjectsProps {
  projects: any[];
  onOpenProject: (projectId: string) => void;
  onDuplicateProject?: (project: any) => void;
  onDeleteProject?: (projectId: string) => void;
}

export default function RecentProjects({ 
  projects, 
  onOpenProject, 
  onDuplicateProject, 
  onDeleteProject 
}: RecentProjectsProps) {
  const [showAll, setShowAll] = useState(false);
  
  const displayProjects = showAll ? projects : projects.slice(0, 6);

  if (projects.length === 0) {
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Recent Projects</h2>
        </div>
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🎨</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
          <p className="text-gray-600 mb-6">
            Create your first project to start designing amazing content.
          </p>
          <Link href="/create">
            <Button variant="primary">Create Your First Project</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Recent Projects</h2>
        {projects.length > 6 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : 'View All'}
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpen={onOpenProject}
            onDuplicate={onDuplicateProject}
            onDelete={onDeleteProject}
          />
        ))}
      </div>
    </div>
  );
}

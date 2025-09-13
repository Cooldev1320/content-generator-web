'use client';

import { Button } from '@/components/ui';
import Link from 'next/link';

export default function QuickActions() {
  const actions = [
    {
      title: 'Create New Project',
      description: 'Start with a blank canvas or template',
      href: '/create',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      variant: 'primary' as const,
    },
    {
      title: 'Browse Templates',
      description: 'Choose from our template library',
      href: '/templates',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      variant: 'secondary' as const,
    },
    {
      title: 'View History',
      description: 'See your recent activity',
      href: '/history',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      variant: 'secondary' as const,
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="flex flex-wrap gap-4">
        {actions.map((action, index) => (
          <Link key={index} href={action.href}>
            <Button variant={action.variant} size="lg" className="flex items-center">
              {action.icon}
              <span className="ml-2">{action.title}</span>
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}

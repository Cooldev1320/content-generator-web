'use client';

import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuthStore();

  const quickActions = [
    {
      title: 'Create New Design',
      description: 'Start with a blank canvas or template',
      icon: '🎨',
      href: '/create',
      color: 'bg-blue-500',
    },
    {
      title: 'Browse Templates',
      description: 'Choose from professional templates',
      icon: '📋',
      href: '/templates',
      color: 'bg-purple-500',
    },
    {
      title: 'View Projects',
      description: 'Manage your existing projects',
      icon: '📁',
      href: '/history',
      color: 'bg-green-500',
    },
  ];

  const stats = [
    { label: 'Projects Created', value: '12', change: '+3 this week' },
    { label: 'Templates Used', value: '8', change: '+2 this week' },
    { label: 'Exports This Month', value: `${user?.monthlyExportsUsed || 0}/${user?.monthlyExportsLimit || 5}`, change: 'Resets monthly' },
    { label: 'Storage Used', value: '2.4 GB', change: 'of 10 GB' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.fullName || user?.username}!
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Here's what's happening with your projects today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="text-2xl font-bold text-indigo-600">
                    {stat.value}
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.label}
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {stat.change}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href}>
              <div className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 rounded-lg shadow hover:shadow-md transition-shadow">
                <div>
                  <span className={`rounded-lg inline-flex p-3 ${action.color} text-white text-2xl`}>
                    {action.icon}
                  </span>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900">
                    {action.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {action.description}
                  </p>
                </div>
                <span
                  className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                  aria-hidden="true"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Projects */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Recent Projects</h2>
          <Link href="/history">
            <Button variant="ghost" size="sm">
              View all
            </Button>
          </Link>
        </div>
        
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <div className="text-center">
              <div className="text-4xl mb-4">📁</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No projects yet
              </h3>
              <p className="text-gray-500 mb-4">
                Create your first design to get started
              </p>
              <Link href="/create">
                <Button>Create Project</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Badge, Input } from '@/components/ui';
import { apiClient } from '@/lib/api';
import { TEMPLATE_CATEGORIES } from '@/lib/constants';
import type { TemplateListDto, PagedResult } from '@/types';

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<TemplateListDto[]>([]);
  const [featuredTemplates, setFeaturedTemplates] = useState<TemplateListDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const router = useRouter();

  useEffect(() => {
    loadTemplates();
    loadFeaturedTemplates();
  }, [currentPage, selectedCategory, searchTerm]);

  const loadTemplates = async () => {
    try {
      setIsLoading(true);
      
      // TODO: Replace with API call
      // const response = await apiClient.getTemplates({
      //   category: selectedCategory || undefined,
      //   searchTerm: searchTerm || undefined,
      //   page: currentPage,
      //   pageSize: 12,
      //   sortBy: 'CreatedAt',
      //   sortDescending: true,
      // });

      // For now, use mock data
      const mockTemplates = [
        {
          id: 'social-post-1',
          name: 'Instagram Post Template',
          description: 'Perfect for Instagram posts with modern design',
          category: 'social',
          thumbnailUrl: '',
          isPremium: false,
          downloadCount: 1250,
        },
        {
          id: 'banner-1',
          name: 'Promotional Banner',
          description: 'Eye-catching banner for marketing campaigns',
          category: 'marketing',
          thumbnailUrl: '',
          isPremium: true,
          downloadCount: 890,
        },
        {
          id: 'presentation-1',
          name: 'Business Presentation',
          description: 'Professional presentation slide template',
          category: 'business',
          thumbnailUrl: '',
          isPremium: false,
          downloadCount: 2100,
        },
        {
          id: 'flyer-1',
          name: 'Event Flyer',
          description: 'Modern flyer template for events',
          category: 'marketing',
          thumbnailUrl: '',
          isPremium: false,
          downloadCount: 750,
        },
        {
          id: 'logo-1',
          name: 'Logo Design Template',
          description: 'Clean logo template for branding',
          category: 'branding',
          thumbnailUrl: '',
          isPremium: true,
          downloadCount: 1500,
        },
        {
          id: 'social-story-1',
          name: 'Instagram Story',
          description: 'Vertical template for Instagram stories',
          category: 'social',
          thumbnailUrl: '',
          isPremium: false,
          downloadCount: 3200,
        },
      ];

      // Filter templates based on search and category
      let filteredTemplates = mockTemplates;
      
      if (searchTerm) {
        filteredTemplates = filteredTemplates.filter(template =>
          template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          template.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      if (selectedCategory) {
        filteredTemplates = filteredTemplates.filter(template =>
          template.category === selectedCategory
        );
      }

      setTemplates(filteredTemplates);
      setTotalPages(1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while loading templates');
    } finally {
      setIsLoading(false);
    }
  };

  const loadFeaturedTemplates = async () => {
    try {
      // TODO: Replace with API call
      // const response = await apiClient.getFeaturedTemplates(6);
      // if (response.success && response.data) {
      //   setFeaturedTemplates(response.data);
      // }

      // For now, use mock featured templates
      const mockFeatured = [
        {
          id: 'featured-1',
          name: 'Trending Social Post',
          description: 'Most popular social media template',
          category: 'social',
          thumbnailUrl: '',
          isPremium: false,
          downloadCount: 5000,
        },
        {
          id: 'featured-2',
          name: 'Premium Banner',
          description: 'High-quality marketing banner',
          category: 'marketing',
          thumbnailUrl: '',
          isPremium: true,
          downloadCount: 3200,
        },
        {
          id: 'featured-3',
          name: 'Business Card',
          description: 'Professional business card design',
          category: 'business',
          thumbnailUrl: '',
          isPremium: false,
          downloadCount: 2800,
        },
      ];
      
      setFeaturedTemplates(mockFeatured);
    } catch (err) {
      // Featured templates are optional, don't show error
      console.warn('Failed to load featured templates:', err);
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    router.push(`/create?template=${templateId}`);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const getCategoryName = (category: string) => {
    const cat = TEMPLATE_CATEGORIES.find(c => c.id === category);
    return cat ? cat.name : category;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Templates</h1>
          <p className="text-gray-600">
            Choose from our collection of professionally designed templates to get started quickly.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => router.push('/create')}
              className="whitespace-nowrap"
            >
              Start from Scratch
            </Button>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === '' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => handleCategoryChange('')}
            >
              All Categories
            </Button>
            {TEMPLATE_CATEGORIES.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'primary' : 'outline'}
                size="sm"
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Templates */}
        {featuredTemplates.length > 0 && !searchTerm && !selectedCategory && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Featured Templates</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTemplates.map((template) => (
                <Card
                  key={template.id}
                  className="p-0 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleTemplateSelect(template.id)}
                >
                  <div className="aspect-video bg-gray-200 flex items-center justify-center">
                    {template.thumbnailUrl ? (
                      <img
                        src={template.thumbnailUrl}
                        alt={template.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-400 text-sm">No Preview</div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 truncate">{template.name}</h3>
                      {template.isPremium && (
                        <Badge variant="warning" size="sm">Premium</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {template.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" size="sm">
                        {getCategoryName(template.category)}
                      </Badge>
                      <Button size="sm" variant="primary">
                        Use Template
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Templates */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              {searchTerm ? `Search Results for "${searchTerm}"` : 
               selectedCategory ? `${getCategoryName(selectedCategory)} Templates` : 
               'All Templates'}
            </h2>
            <span className="text-sm text-gray-500">
              {templates.length} template{templates.length !== 1 ? 's' : ''}
            </span>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <Card key={index} className="p-0 overflow-hidden">
                  <div className="aspect-video bg-gray-200 animate-pulse"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse mb-3"></div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </Card>
              ))}
            </div>
          ) : templates.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🎨</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || selectedCategory 
                  ? 'Try adjusting your search or filters'
                  : 'No templates available at the moment'
                }
              </p>
              <Button
                variant="primary"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {templates.map((template) => (
                  <Card
                    key={template.id}
                    className="p-0 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    <div className="aspect-video bg-gray-200 flex items-center justify-center">
                      {template.thumbnailUrl ? (
                        <img
                          src={template.thumbnailUrl}
                          alt={template.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-gray-400 text-sm">No Preview</div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 truncate">{template.name}</h3>
                        {template.isPremium && (
                          <Badge variant="warning" size="sm">Premium</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {template.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" size="sm">
                          {getCategoryName(template.category)}
                        </Badge>
                        <Button size="sm" variant="primary">
                          Use Template
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <span className="text-sm text-gray-600">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

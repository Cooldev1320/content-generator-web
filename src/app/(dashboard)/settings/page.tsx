'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function SettingsPage() {
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'account', name: 'Account', icon: '⚙️' },
    { id: 'subscription', name: 'Subscription', icon: '💎' },
    { id: 'preferences', name: 'Preferences', icon: '🎨' },
  ];

  const ProfileSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-indigo-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {(user?.fullName || user?.username || 'U').charAt(0).toUpperCase()}
            </div>
            <div>
              <Button variant="outline" size="sm">
                Change Avatar
              </Button>
              <p className="text-sm text-gray-500 mt-1">
                JPG, GIF or PNG. 1MB max.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Full Name"
              defaultValue={user?.fullName || ''}
              placeholder="Enter your full name"
            />
            <Input
              label="Username"
              defaultValue={user?.username || ''}
              placeholder="Enter your username"
            />
          </div>
          
          <Input
            label="Email"
            defaultValue={user?.email || ''}
            placeholder="Enter your email"
            type="email"
          />
          
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );

  const AccountSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Account Security</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Change Password</h4>
            <p className="text-sm text-gray-600 mb-4">
              Ensure your account is using a long, random password to stay secure.
            </p>
            <Button variant="outline">Update Password</Button>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Two-Factor Authentication</h4>
            <p className="text-sm text-gray-600 mb-4">
              Add additional security to your account using two-factor authentication.
            </p>
            <Button variant="outline">Enable 2FA</Button>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Danger Zone</h3>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 className="font-medium text-red-900 mb-2">Delete Account</h4>
          <p className="text-sm text-red-700 mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );

  const SubscriptionSettings = () => {
    const getSubscriptionBadgeColor = (tier: string) => {
      switch (tier) {
        case 'Premium':
          return 'bg-yellow-100 text-yellow-800';
        case 'Pro':
          return 'bg-blue-100 text-blue-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Current Plan</h3>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="text-xl font-bold text-gray-900">
                    {user?.subscriptionTier || 'Free'} Plan
                  </h4>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSubscriptionBadgeColor(user?.subscriptionTier || 'Free')}`}>
                    {user?.subscriptionTier || 'Free'}
                  </span>
                </div>
                <p className="text-gray-600">
                  {user?.subscriptionTier === 'Free' 
                    ? 'Basic features with limited exports'
                    : 'Full access to all features'
                  }
                </p>
              </div>
              {user?.subscriptionTier === 'Free' && (
                <Button>Upgrade Plan</Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600">
                  {user?.monthlyExportsUsed || 0}
                </div>
                <div className="text-sm text-gray-600">Exports Used</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600">
                  {user?.monthlyExportsLimit || 5}
                </div>
                <div className="text-sm text-gray-600">Monthly Limit</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600">12</div>
                <div className="text-sm text-gray-600">Projects</div>
              </div>
            </div>
          </div>
        </div>

        {user?.subscriptionTier === 'Free' && (
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-2">Unlock More Features</h3>
            <p className="text-indigo-100 mb-4">
              Upgrade to Pro for unlimited exports, premium templates, and advanced features.
            </p>
            <ul className="space-y-2 text-sm text-indigo-100 mb-6">
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Unlimited exports
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Access to premium templates
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Advanced editing tools
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Priority support
              </li>
            </ul>
            <Button variant="secondary" className="bg-white text-indigo-600 hover:bg-gray-100">
              Upgrade to Pro - $9.99/month
            </Button>
          </div>
        )}
      </div>
    );
  };

  const PreferencesSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Design Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-900">Auto-save</label>
              <p className="text-sm text-gray-500">Automatically save your work every 30 seconds</p>
            </div>
            <div className="relative inline-block w-10 mr-2 align-middle select-none">
              <input type="checkbox" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
              <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Default Export Quality
            </label>
            <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option>High (PNG)</option>
              <option>Medium (JPG)</option>
              <option>Low (JPG)</option>
            </select>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-900">Email notifications</label>
              <p className="text-sm text-gray-500">Get emails about your account activity</p>
            </div>
            <div className="relative inline-block w-10 mr-2 align-middle select-none">
              <input type="checkbox" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
              <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-900">Marketing emails</label>
              <p className="text-sm text-gray-500">Get emails about new features and tips</p>
            </div>
            <div className="relative inline-block w-10 mr-2 align-middle select-none">
              <input type="checkbox" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
              <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'account':
        return <AccountSettings />;
      case 'subscription':
        return <SubscriptionSettings />;
      case 'preferences':
        return <PreferencesSettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
        {/* Sidebar */}
        <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full group rounded-md px-3 py-2 flex items-center text-sm font-medium text-left ${
                  activeTab === tab.id
                    ? 'bg-gray-50 text-indigo-700'
                    : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span className="mr-3 text-lg">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <button
                onClick={() => logout()}
                className="w-full group rounded-md px-3 py-2 flex items-center text-sm font-medium text-red-600 hover:bg-red-50"
              >
                <span className="mr-3 text-lg">🚪</span>
                Sign Out
              </button>
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
          <div className="bg-white shadow px-4 py-6 sm:p-6 sm:rounded-lg">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
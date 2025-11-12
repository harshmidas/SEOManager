
"use client";
import Link from "next/link";
import { useState } from "react";

export default function CMSDashboard() {
  const [activeSection, setActiveSection] = useState("overview");
  
  // Sample content data
  const [contentStats] = useState({
    totalPages: 24,
    published: 18,
    drafts: 6,
    recentActivity: [
      { id: 1, action: "Updated", page: "Homepage", user: "Admin", time: "2 hours ago" },
      { id: 2, action: "Created", page: "Blog Post", user: "Editor", time: "5 hours ago" },
      { id: 3, action: "Published", page: "About Us", user: "Admin", time: "1 day ago" },
    ]
  });

  const contentTypes = [
    { 
      name: "SEO Websites", 
      href: "/seo-websites", 
      icon: "🌐",
      count: 12,
      description: "Manage website content and SEO optimization"
    },
    { 
      name: "SEO Press", 
      href: "/seo-press", 
      icon: "📰",
      count: 8,
      description: "Press releases and media content"
    },
    { 
      name: "SEO Blogs", 
      href: "/seo-blogs", 
      icon: "📝",
      count: 15,
      description: "Blog posts and articles"
    },
    { 
      name: "SEO News", 
      href: "/seo-news", 
      icon: "📢",
      count: 5,
      description: "News updates and announcements"
    },
    { 
      name: "SEO Article", 
      href: "/seo-article", 
      icon: "🖼️",
      count: 47,
      description: "Images, videos and documents"
    },
    // { 
    //   name: "Analytics", 
    //   href: "/analytics", 
    //   icon: "📊",
    //   count: null,
    //   description: "Performance metrics and reports"
    // },
  ];

  const quickActions = [
    { label: "Create New Page", action: "/content/new", icon: "➕" },
    { label: "Upload Media", action: "/media/upload", icon: "📁" },
    { label: "View Analytics", action: "/analytics", icon: "📈" },
    { label: "User Management", action: "/users", icon: "👥" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Content Management System</h1>
              <p className="text-sm text-gray-600">Manage your digital content efficiently</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Admin User
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                New Content
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <span className="text-2xl">📄</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Pages</p>
                <p className="text-2xl font-bold text-gray-900">{contentStats.totalPages}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <span className="text-2xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold text-gray-900">{contentStats.published}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <span className="text-2xl">📝</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Drafts</p>
                <p className="text-2xl font-bold text-gray-900">{contentStats.drafts}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <span className="text-2xl">👁️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Views Today</p>
                <p className="text-2xl font-bold text-gray-900">1.2K</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Grid */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Content Management</h2>
            
            {/* Quick Actions */}
            {/* <div className="grid grid-cols-2 gap-4 mb-8">
              {quickActions.map((action, index) => (
                <Link key={index} href={action.action}>
                  <div className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{action.icon}</span>
                      <span className="font-medium text-gray-800">{action.label}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div> */}

            {/* Content Types Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contentTypes.map((content) => (
                <Link key={content.href} href={content.href}>
                  <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-300 cursor-pointer group">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{content.icon}</span>
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {content.name}
                          </h3>
                        </div>
                        {content.count !== null && (
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm font-medium">
                            {content.count}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{content.description}</p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                          Manage content →
                        </span>
                        <div className="flex space-x-1">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {contentStats.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">
                        <span className="font-medium">{activity.user}</span> {activity.action} "{activity.page}"
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Storage</span>
                  <span className="text-sm font-medium text-gray-900">1.2GB / 5GB</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '24%' }}></div>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm text-gray-600">Uptime</span>
                  <span className="text-sm font-medium text-green-600">99.9%</span>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm text-gray-600">Last Backup</span>
                  <span className="text-sm font-medium text-gray-900">2 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
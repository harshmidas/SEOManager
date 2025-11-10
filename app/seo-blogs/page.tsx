"use client";

import { useState, useEffect } from "react";
import { BlogPost } from "@/types/blog";
import { apiFetch } from "@/utils/api";
import BlogStats from "@/components/BlogStats";
import CategoryChart from "@/components/CategoryChart";
import BlogPostCard from "@/components/BlogPostCard";
import BlogPostForm from "@/components/BlogPostForm";

const API_URL = "http://192.168.1.42:9291/api/v1/seo-blogs";
const HEADERS = {
  "X-Tenant": "68cc764fbfc57730593b4a32",
  "X-User-ID": "system",
  "Content-Type": "application/json"
};

export default function SeoBlogsPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const categories = ["Healthcare Technology", "AI", "Staffing", "Innovation", "Industry Insights"];
  const statuses = ["PUBLISHED", "DRAFT", "SCHEDULED", "ARCHIVED"];

  const loadBlogPosts = async () => {
    try {
      setLoading(true);
      const data = await apiFetch<BlogPost[]>(API_URL, { headers: HEADERS });
      setBlogPosts(data || []);
      setFilteredPosts(data || []);
    } catch (error) {
      console.error("Failed to load blog posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogPosts();
  }, []);

  useEffect(() => {
    let filtered = blogPosts;

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(post => post.status === statusFilter);
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(post => post.category === categoryFilter);
    }

    setFilteredPosts(filtered);
  }, [searchTerm, statusFilter, categoryFilter, blogPosts]);

  const handleCreate = () => {
    setSelectedPost(null);
    setShowForm(true);
  };

  const handleEdit = (post: BlogPost) => {
    setSelectedPost(post);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedPost(null);
    loadBlogPosts();
  };

  const totalViews = blogPosts.reduce((sum, post) => sum + post.viewCount, 0);
  const totalShares = blogPosts.reduce((sum, post) => sum + post.shareCount, 0);
  const totalComments = blogPosts.reduce((sum, post) => sum + post.commentCount, 0);
  const publishedCount = blogPosts.filter(post => post.published).length;
  const featuredCount = blogPosts.filter(post => post.featured).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
              <p className="text-gray-600 mt-2">Manage your blog content and SEO optimization</p>
            </div>
            <button
              onClick={handleCreate}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
            >
              <span>+</span>
              <span>New Blog Post</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          <BlogStats
            totalPosts={blogPosts.length}
            publishedCount={publishedCount}
            featuredCount={featuredCount}
            totalViews={totalViews}
            totalShares={totalShares}
            totalComments={totalComments}
          />
        </div>

        {/* Analytics and Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Category Distribution */}
          <div className="lg:col-span-1">
            <CategoryChart blogPosts={blogPosts} />
          </div>

          {/* Filters and Search */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="md:col-span-2">
                  <input
                    type="text"
                    placeholder="Search blog posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              {/* View Mode Toggle */}
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Showing {filteredPosts.length} of {blogPosts.length} posts
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg ${
                      viewMode === "grid" 
                        ? "bg-blue-100 text-blue-600" 
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    🏠 Grid
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg ${
                      viewMode === "list" 
                        ? "bg-blue-100 text-blue-600" 
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    📝 List
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid/List */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-sm p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No blog posts found</h3>
              <p className="text-gray-600 mb-6">
                {blogPosts.length === 0 
                  ? "Get started by creating your first blog post" 
                  : "No posts match your current filters"}
              </p>
              <button
                onClick={handleCreate}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Create First Post
              </button>
            </div>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <BlogPostCard
                key={post.id}
                post={post}
                onEdit={() => handleEdit(post)}
                viewMode="grid"
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <BlogPostCard
                key={post.id}
                post={post}
                onEdit={() => handleEdit(post)}
                viewMode="list"
              />
            ))}
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <BlogPostForm
          post={selectedPost}
          onClose={handleFormClose}
          onSuccess={handleFormClose}
        />
      )}
    </div>
  );
}
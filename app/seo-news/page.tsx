"use client";

import { useState, useEffect } from "react";
import { NewsArticle } from "@/types/news";
import { apiFetch } from "@/utils/api";
import NewsArticleCard from "@/components/NewsArticleCard";
import NewsArticleForm from "@/components/NewsArticleForm";
import NewsStats from "@/components/NewsStats";
import PriorityChart from "@/components/PriorityChart";

const API_URL = "http://157.20.214.84:9292/api/v1/seo-news";
const HEADERS = {
  "X-Tenant": "68b20dd0fb42964f2328b424",
  "X-User-ID": "658dfb086764754f1fa564d0",
  "Content-Type": "application/json",
};

export default function SeoNewsPage() {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [breakingNewsFilter, setBreakingNewsFilter] = useState("all");

  const categories = [
    "Technology",
    "Politics",
    "Business",
    "Health",
    "Entertainment",
    "Sports",
  ];
  const statuses = ["PUBLISHED", "DRAFT", "SCHEDULED", "ARCHIVED"];
  const priorities = ["LOW", "MEDIUM", "HIGH", "URGENT"];

  const loadNewsArticles = async () => {
    try {
      setLoading(true);
      const data = await apiFetch<NewsArticle[]>(API_URL, { headers: HEADERS });
      setNewsArticles(data || []);
      setFilteredArticles(data || []);
    } catch (error) {
      console.error("Failed to load news articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNewsArticles();
  }, []);

  useEffect(() => {
    let filtered = newsArticles;

    if (searchTerm) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          ) ||
          article.reporter.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((article) => article.status === statusFilter);
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (article) => article.category === categoryFilter
      );
    }

    if (priorityFilter !== "all") {
      filtered = filtered.filter(
        (article) => article.priority === priorityFilter
      );
    }

    if (breakingNewsFilter !== "all") {
      filtered = filtered.filter((article) =>
        breakingNewsFilter === "breaking"
          ? article.breakingNews
          : !article.breakingNews
      );
    }

    setFilteredArticles(filtered);
  }, [
    searchTerm,
    statusFilter,
    categoryFilter,
    priorityFilter,
    breakingNewsFilter,
    newsArticles,
  ]);

  const handleCreate = () => {
    setSelectedArticle(null);
    setShowForm(true);
  };

  const handleEdit = (article: NewsArticle) => {
    setSelectedArticle(article);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedArticle(null);
    loadNewsArticles();
  };

  const totalViews = newsArticles.reduce(
    (sum, article) => sum + article.viewCount,
    0
  );
  const totalShares = newsArticles.reduce(
    (sum, article) => sum + article.shareCount,
    0
  );
  const publishedCount = newsArticles.filter(
    (article) => article.published
  ).length;
  const breakingNewsCount = newsArticles.filter(
    (article) => article.breakingNews
  ).length;
  const urgentCount = newsArticles.filter(
    (article) => article.priority === "URGENT"
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                News Articles
              </h1>
              <p className="text-gray-600 mt-2">
                Manage breaking news and real-time content
              </p>
            </div>
            <button
              onClick={handleCreate}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center space-x-2"
            >
              <span>⚡</span>
              <span>Breaking News</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          <NewsStats
            totalArticles={newsArticles.length}
            publishedCount={publishedCount}
            breakingNewsCount={breakingNewsCount}
            urgentCount={urgentCount}
            totalViews={totalViews}
            totalShares={totalShares}
          />
        </div>

        {/* Analytics and Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Priority Distribution */}
          <div className="lg:col-span-1">
            <PriorityChart newsArticles={newsArticles} />
          </div>

          {/* Filters and Search */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="md:col-span-2">
                  <input
                    type="text"
                    placeholder="Search news articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="all">All Status</option>
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="all">All Priorities</option>
                  {priorities.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
                <select
                  value={breakingNewsFilter}
                  onChange={(e) => setBreakingNewsFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="all">All News</option>
                  <option value="breaking">Breaking News</option>
                  <option value="regular">Regular News</option>
                </select>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Showing {filteredArticles.length} of {newsArticles.length}{" "}
                  articles
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("all");
                      setCategoryFilter("all");
                      setPriorityFilter("all");
                      setBreakingNewsFilter("all");
                    }}
                    className="text-sm text-gray-600 hover:text-gray-800"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Breaking News Banner */}
        {filteredArticles.some(
          (article) => article.breakingNews && article.published
        ) && (
          <div className="mb-6">
            <div className="bg-red-600 text-white p-4 rounded-xl shadow-lg">
              <div className="flex items-center space-x-3">
                <span className="text-xl">🚨</span>
                <div>
                  <h3 className="font-bold">Breaking News</h3>
                  <p className="text-sm opacity-90">
                    {
                      filteredArticles.filter(
                        (article) => article.breakingNews && article.published
                      ).length
                    }
                    breaking news stories
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* News Articles Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-sm p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📰</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No news articles found
              </h3>
              <p className="text-gray-600 mb-6">
                {newsArticles.length === 0
                  ? "Get started by creating your first news article"
                  : "No articles match your current filters"}
              </p>
              <button
                onClick={handleCreate}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Create First Article
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <NewsArticleCard
                key={article.id}
                article={article}
                onEdit={() => handleEdit(article)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <NewsArticleForm
          article={selectedArticle}
          onClose={handleFormClose}
          onSuccess={handleFormClose}
        />
      )}
    </div>
  );
}

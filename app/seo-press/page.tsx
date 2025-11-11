"use client";

import { useState, useEffect } from "react";
import { PressRelease } from "@/types/press";
import { apiFetch } from "@/utils/api";
import PressReleaseCard from "@/components/PressReleaseCard";
import PressStats from "@/components/PressStats";
import DistributionChart from "@/components/DistributionChart";
import PressReleaseForm from "@/components/PressReleaseForm";

const API_URL = "http://157.20.214.84:9292/api/v1/seo-press";
const HEADERS = {
  "X-Tenant": "68b20dd0fb42964f2328b424",
  "X-User-ID": "658dfb086764754f1fa564d0",
  Authorization:
    "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhcmNoaXQubWlzaHJhQG1pZGFzY29uc3VsdGluZy5vcmciLCJpYXQiOjE3NjI4MDQ3NTgsImV4cCI6MTc2Mjg5MTE1OH0.6_JIYgzh7sdM0Z1SFVclmwSrGIxX0Pe0coOU1CueBkTJavneEWKbBcmbYf3qwxYPh__TP9g4XyUjlqB7nojIrw",
};

export default function SeoPressPage() {
  const [pressReleases, setPressReleases] = useState<PressRelease[]>([]);
  const [filteredReleases, setFilteredReleases] = useState<PressRelease[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedRelease, setSelectedRelease] = useState<PressRelease | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categories = [
    "Technology",
    "Healthcare",
    "Finance",
    "Announcement",
    "Partnership",
  ];
  const statuses = ["PUBLISHED", "DRAFT", "SCHEDULED", "ARCHIVED"];

  const loadPressReleases = async () => {
    try {
      setLoading(true);
      const data = await apiFetch<PressRelease[]>(API_URL, {
        headers: HEADERS,
      });
      setPressReleases(data || []);
      setFilteredReleases(data || []);
    } catch (error) {
      console.error("Failed to load press releases:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPressReleases();
  }, []);

  useEffect(() => {
    let filtered = pressReleases;

    if (searchTerm) {
      filtered = filtered.filter(
        (release) =>
          release.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          release.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          release.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((release) => release.status === statusFilter);
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (release) => release.category === categoryFilter
      );
    }

    setFilteredReleases(filtered);
  }, [searchTerm, statusFilter, categoryFilter, pressReleases]);

  const handleCreate = () => {
    setSelectedRelease(null);
    setShowForm(true);
  };

  const handleEdit = (release: PressRelease) => {
    setSelectedRelease(release);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedRelease(null);
    loadPressReleases();
  };

  const totalViews = pressReleases.reduce(
    (sum, release) => sum + release.viewCount,
    0
  );
  const totalShares = pressReleases.reduce(
    (sum, release) => sum + release.shareCount,
    0
  );
  const publishedCount = pressReleases.filter(
    (release) => release.published
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Press Releases
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your press releases and media distribution
              </p>
            </div>
            <button
              onClick={handleCreate}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
            >
              <span>+</span>
              <span>New Press Release</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats and Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <PressStats
            totalReleases={pressReleases.length}
            publishedCount={publishedCount}
            totalViews={totalViews}
            totalShares={totalShares}
          />
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Search press releases..."
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
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Distribution Analytics */}
        <div className="mb-8">
          <DistributionChart pressReleases={pressReleases} />
        </div>

        {/* Press Releases Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredReleases.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-sm p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📰</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No press releases found
              </h3>
              <p className="text-gray-600 mb-6">
                {pressReleases.length === 0
                  ? "Get started by creating your first press release"
                  : "No releases match your current filters"}
              </p>
              <button
                onClick={handleCreate}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Create Press Release
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredReleases.map((release) => (
              <PressReleaseCard
                key={release.id}
                release={release}
                onEdit={() => handleEdit(release)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <PressReleaseForm
          release={selectedRelease}
          onClose={handleFormClose}
          onSuccess={handleFormClose}
        />
      )}
    </div>
  );
}

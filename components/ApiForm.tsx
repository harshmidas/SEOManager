"use client";

import React, { useState } from "react";

/**
 * Universal API fetcher with improved error handling and type safety.
 * Supports GET and POST with JSON payloads.
 */
export async function apiFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      cache: "no-store", // ensures fresh SEO-related data
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`API Error ${res.status}: ${text}`);
    }

    return res.json();
  } catch (err) {
    console.error("API Fetch Error:", err);
    throw err;
  }
}

interface ApiFormProps {
  /** Form title */
  title: string;

  /** Full API endpoint URL */
  postUrl: string;

  /** Extra headers like X-Tenant, X-User-ID */
  headers?: Record<string, string>;

  /** Default data shown in JSON editor */
  defaultData: any;
}

/**
 * A reusable form that lets you edit JSON and POST it to your API.
 * Designed for SEO API uploads or dynamic configurations.
 */
const ApiForm: React.FC<ApiFormProps> = ({
  title,
  postUrl,
  headers = {},
  defaultData,
}) => {
  const [formData, setFormData] = useState(JSON.stringify(defaultData, null, 2));
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const parsedData = JSON.parse(formData);
      const result = await apiFetch<any>(postUrl, {
        method: "POST",
        body: JSON.stringify(parsedData),
        headers,
      });
      setResponse(result);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error submitting form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>

      <textarea
        value={formData}
        onChange={(e) => setFormData(e.target.value)}
        className="w-full h-96 border border-gray-300 p-2 rounded mb-4 font-mono text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${
          loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Uploading..." : "Upload JSON"}
      </button>

      {error && (
        <div className="mt-4 bg-red-100 text-red-800 p-3 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}

      {response && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Response:</h3>
          <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ApiForm;

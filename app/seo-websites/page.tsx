// "use client";

// import { useState } from "react";
// import { SEOWebsite } from "@/types/seo";
// import { apiFetch } from "@/utils/api";
// import SEOWebsiteCard from "@/components/SEOWebsiteCard";
// import SEOWebsiteForm from "@/components/SEOWebsiteForm";

// const API_URL = "http://157.20.214.84:9292/api/v1/seo-websites";
// const HEADERS = {
//   "X-Tenant": "68b20dd0fb42964f2328b424",
//   "X-User-ID": "658dfb086764754f1fa564d0",
// };

// export default function SeoWebsitesPage() {
//   const [websites, setWebsites] = useState<SEOWebsite[]>([]);
//   const [showForm, setShowForm] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [selectedWebsite, setSelectedWebsite] = useState<SEOWebsite | null>(null);

//   const loadWebsites = async () => {
//     try {
//       setLoading(true);
//       const data = await apiFetch<SEOWebsite[]>(API_URL, { headers: HEADERS });
//       setWebsites(data || []);
//     } catch (error) {
//       console.error("Failed to load websites:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCreate = () => {
//     setSelectedWebsite(null);
//     setShowForm(true);
//   };

//   const handleEdit = (website: SEOWebsite) => {
//     setSelectedWebsite(website);
//     setShowForm(true);
//   };

//   const handleFormClose = () => {
//     setShowForm(false);
//     setSelectedWebsite(null);
//     loadWebsites(); // Refresh the list
//   };

//   // Load websites on component mount
//   useState(() => {
//     loadWebsites();
//   });

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-6">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">SEO Websites</h1>
//               <p className="text-gray-600 mt-2">Manage your website configurations and SEO settings</p>
//             </div>
//             <button
//               onClick={handleCreate}
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
//             >
//               <span>+</span>
//               <span>Add New Website</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {loading ? (
//           <div className="flex justify-center items-center py-12">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//           </div>
//         ) : websites.length === 0 ? (
//           <div className="text-center py-12">
//             <div className="bg-white rounded-2xl shadow-sm p-8 max-w-md mx-auto">
//               <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <span className="text-2xl">🌐</span>
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">No websites yet</h3>
//               <p className="text-gray-600 mb-6">Get started by adding your first website configuration</p>
//               <button
//                 onClick={handleCreate}
//                 className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
//               >
//                 Create First Website
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {websites.map((website) => (
//               <SEOWebsiteCard
//                 key={website.id}
//                 website={website}
//                 onEdit={() => handleEdit(website)}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Form Modal */}
//       {showForm && (
//         <SEOWebsiteForm
//           website={selectedWebsite}
//           onClose={handleFormClose}
//           onSuccess={handleFormClose}
//         />
//       )}
//     </div>
//   );
// }























"use client";

import { useState, useEffect } from "react";
import { SEOWebsite } from "@/types/seo";
import { apiFetch } from "@/utils/api";
import SEOWebsiteCard from "@/components/SEOWebsiteCard";
import SEOWebsiteForm from "@/components/SEOWebsiteForm";

const API_URL = "http://157.20.214.84:9292/api/v1/seo-websites";
const HEADERS = {
  "X-Tenant": "68b20dd0fb42964f2328b424",
  "X-User-ID": "658dfb086764754f1fa564d0",
};

export default function SeoWebsitesPage() {
  const [websites, setWebsites] = useState<SEOWebsite[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedWebsite, setSelectedWebsite] = useState<SEOWebsite | null>(null);

  const loadWebsites = async () => {
    try {
      setLoading(true);
      const data = await apiFetch<SEOWebsite[]>(API_URL, { headers: HEADERS });
      setWebsites(data || []);
    } catch (error) {
      console.error("Failed to load websites:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedWebsite(null);
    setShowForm(true);
  };

  const handleEdit = (website: SEOWebsite) => {
    setSelectedWebsite(website);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedWebsite(null);
    loadWebsites(); // Refresh the list
  };

  // Load websites on component mount
  useEffect(() => {
    loadWebsites();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">SEO Websites</h1>
              <p className="text-gray-600 mt-2">Manage your website configurations and SEO settings</p>
            </div>
            <button
              onClick={handleCreate}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
            >
              <span>+</span>
              <span>Add New Website</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : websites.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-sm p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌐</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No websites yet</h3>
              <p className="text-gray-600 mb-6">Get started by adding your first website configuration</p>
              <button
                onClick={handleCreate}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Create First Website
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {websites.map((website) => (
              <SEOWebsiteCard
                key={website.id}
                website={website}
                onEdit={() => handleEdit(website)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <SEOWebsiteForm
          website={selectedWebsite}
          onClose={handleFormClose}
          onSuccess={handleFormClose}
        />
      )}
    </div>
  );
}
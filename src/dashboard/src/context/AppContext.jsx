import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const API_BASE = "http://localhost:8000/api";
const FIRESTORE_URL = "https://firestore.googleapis.com/v1/projects/civicroute-mysuru/databases/(default)/documents";

const cleanImage = (url) => {
  if (!url || typeof url !== 'string') return "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80";
  if (url.startsWith('http') || url.startsWith('data:image')) return url;
  return "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80";
};

export const AppProvider = ({ children }) => {
  const [complaints, setComplaints] = useState(() => {
    try {
      const saved = localStorage.getItem("civicroute_web_complaints_v1");
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return [];
  });
  const [jurisdictionVersion, setJurisdictionVersion] = useState("V3");
  const [activeRole, setActiveRole] = useState("officer"); // "officer" | "admin" | "citizen_sim"
  const [selectedComplaintId, setSelectedComplaintId] = useState("HM-1024");
  const [loading, setLoading] = useState(false);
  const [analytics, setAnalytics] = useState(null);

  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Sync complaints to localStorage whenever they update
  useEffect(() => {
    if (complaints && complaints.length > 0) {
      try {
        localStorage.setItem("civicroute_web_complaints_v1", JSON.stringify(complaints));
      } catch (_) {}
    }
  }, [complaints]);

  const loginWebUser = (email, password) => {
    if (email.toLowerCase().includes('admin')) {
      const u = {
        name: 'Admin Governance',
        role: 'admin',
        email: 'admin.governance@mysuru.gov.in',
        designation: 'Chief Governance Director',
        department: 'Mysuru Municipal Administration'
      };
      setCurrentUser(u);
      setActiveRole('admin');
      setIsAuthenticated(true);
      return { success: true, user: u, message: 'Welcome, Admin Governance!' };
    } else if (email.toLowerCase().includes('officer')) {
      const u = {
        name: 'Eng. Rajesh Kumar',
        role: 'officer',
        email: 'officer.rajesh@mysuru.gov.in',
        designation: 'Senior AEE, Ward 42',
        department: 'Road Engineering & Infrastructure'
      };
      setCurrentUser(u);
      setActiveRole('officer');
      setIsAuthenticated(true);
      return { success: true, user: u, message: 'Welcome, Eng. Rajesh Kumar!' };
    } else {
      const u = {
        name: 'Citizen Mysuru',
        role: 'citizen_sim',
        email: email || 'citizen@civicroute.org',
        designation: 'Mysuru Citizen',
        department: 'Citizen Mobile Simulator'
      };
      setCurrentUser(u);
      setActiveRole('citizen_sim');
      setIsAuthenticated(true);
      return { success: true, user: u, message: 'Switched to Citizen Simulator' };
    }
  };

  const logoutWebUser = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const fetchComplaints = async () => {
    let combined = [];

    // 1. Fetch local FastAPI complaints if server is active
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/complaints?jurisdiction_version=${jurisdictionVersion}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          combined.push(...data);
        }
      }
    } catch (err) {
      console.warn("Backend API offline or unreachable, continuing to Firestore...");
    }

    // 2. Direct query to Firebase Firestore REST API (Always run so mobile app reports appear)
    try {
      const fsRes = await fetch(`${FIRESTORE_URL}/complaints`);
      if (fsRes.ok) {
        const fsData = await fsRes.json();
        const docs = fsData.documents || [];
        if (docs.length > 0) {
          const parsedFs = docs.map(doc => {
            const f = doc.fields || {};
            const id = f.id?.stringValue || doc.name.split("/").pop();
            const status = f.status?.stringValue || "Reported";
            const beforeImg = f.before_image_url?.stringValue || f.beforeImageUrl?.stringValue || "";
            const sessionToken = f.session_token?.stringValue || f.sessionToken?.stringValue || `SES-${id}`;
            const userName = f.user_name?.stringValue || f.userName?.stringValue || "Citizen Mysuru";
            const userEmail = f.user_email?.stringValue || f.userEmail?.stringValue || "citizen@civicroute.org";
            const userPhone = f.user_phone?.stringValue || f.userPhone?.stringValue || "+91 98450 12345";
            const createdAt = f.created_at?.stringValue || new Date().toISOString();

            return {
              id,
              category: f.category?.stringValue || "Pothole",
              description: f.description?.stringValue || "Civic issue reported via Mobile App.",
              address: f.address?.stringValue || "Agrahara Circle, Ward 42, Mysuru",
              ward_id: f.ward_id?.stringValue || "WARD-42",
              ward_name: f.ward_name?.stringValue || "Ward 42 — Devaraja / Agrahara",
              authority_name: f.authority_name?.stringValue || "Mysuru City Corporation (MCC)",
              department_name: f.department_name?.stringValue || "Road Engineering & Infrastructure",
              officer_name: f.officer_name?.stringValue || "Eng. Rajesh Kumar",
              contract_title: f.contract_title?.stringValue || "Ward 42 Road Maintenance Contract",
              status: status,
              priority: f.priority?.stringValue || "High",
              sla_hours: parseInt(f.sla_hours?.integerValue || "24"),
              created_at: createdAt,
              expected_resolution: new Date(Date.now() + 18 * 3600 * 1000).toISOString(),
              ai_confidence: parseInt(f.ai_confidence?.integerValue || "94"),
              session_token: sessionToken,
              user_name: userName,
              user_email: userEmail,
              user_phone: userPhone,
              before_image_url: cleanImage(beforeImg),
              after_image_url: f.after_image_url?.stringValue || null,
              upvotes: parseInt(f.upvotes?.integerValue || "1"),
              is_live_citizen: true,
              sla_info: {
                status: status === "Escalated" ? "Escalated" : "On Track",
                is_breached: status === "Escalated",
                remaining_formatted: status === "Escalated" ? "SLA Overdue" : "24h remaining",
                percentage_remaining: 100
              },
              timeline: [
                { time: "Just now", status: status, actor: "Citizen Mobile App", desc: `Submitted evidence photo via session ${sessionToken}.` }
              ]
            };
          });

          combined.push(...parsedFs);
        }
      }
    } catch (fsErr) {
      console.warn("Firestore fetch notice:", fsErr);
    }

    // 3. Merge with current state & localStorage (Deduplicate by ID, local/Firestore overrides static)
    setComplaints(prev => {
      const mergedMap = new Map();
      
      // Load Firestore / API combined items FIRST
      combined.forEach(item => {
        mergedMap.set(item.id, item);
      });

      // Include previous state items if not already present
      prev.forEach(item => {
        if (!mergedMap.has(item.id)) {
          mergedMap.set(item.id, item);
        }
      });

      const mergedList = Array.from(mergedMap.values());
      
      // SORT mergedList so newest items (by created_at or numeric ID) are FIRST (Index 0)
      mergedList.sort((a, b) => {
        const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
        const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;
        if (timeA !== timeB) return timeB - timeA;
        return (b.id || "").localeCompare(a.id || "");
      });

      // Save 10-day persistent cache to localStorage
      try {
        localStorage.setItem("civicroute_web_complaints_v1", JSON.stringify(mergedList));
        localStorage.setItem("civicroute_cache_timestamp", Date.now().toString());
      } catch (_) {}

      return mergedList;
    });

    setLoading(false);
  };

  const fetchAnalytics = async () => {
    try {
      const res = await fetch(`${API_BASE}/analytics`);
      if (res.ok) {
        const data = await res.json();
        setAnalytics(data);
      }
    } catch (e) {
      console.warn("Analytics API unavailable, using local summary");
    }
  };

  useEffect(() => {
    fetchComplaints();
    fetchAnalytics();

    // Live background polling interval (every 3 seconds) for real-time Officer Dashboard sync
    const interval = setInterval(() => {
      fetchComplaints();
    }, 3000);

    return () => clearInterval(interval);
  }, [jurisdictionVersion]);

  const updateStatus = async (id, status, notes = "", afterImage = null) => {
    // Try FastAPI update
    try {
      await fetch(`${API_BASE}/complaints/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, officer_notes: notes, after_image_url: afterImage })
      });
    } catch (e) {}

    // Direct Patch to Firebase Firestore
    try {
      const patchUrl = `${FIRESTORE_URL}/complaints/${id}?updateMask.fieldPaths=status&updateMask.fieldPaths=after_image_url`;
      const payload = {
        fields: {
          status: { stringValue: status },
          after_image_url: { stringValue: afterImage || "" }
        }
      };
      await fetch(patchUrl, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } catch (e) {}

    setComplaints(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          status,
          after_image_url: afterImage || c.after_image_url,
          timeline: [
            ...c.timeline,
            { time: "Just now", status, actor: c.officer_name, desc: notes || `Status updated to ${status}` }
          ]
        };
      }
      return c;
    }));
  };

  const createComplaint = async (newComplaintData) => {
    const fakeId = `HM-${Math.floor(1000 + Math.random() * 9000)}`;
    const sessionToken = newComplaintData.session_token || `SES-WEB-${Math.floor(100000 + Math.random() * 900000)}`;
    try {
      const res = await fetch(`${API_BASE}/complaints`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newComplaintData, session_token: sessionToken, jurisdiction_version: jurisdictionVersion })
      });
      if (res.ok) {
        const result = await res.json();
        fetchComplaints();
        return result;
      }
    } catch (e) {}

    // Direct push to Firebase Firestore REST API
    try {
      const postUrl = `${FIRESTORE_URL}/complaints?documentId=${fakeId}`;
      const payload = {
        fields: {
          id: { stringValue: fakeId },
          category: { stringValue: newComplaintData.category || "Pothole" },
          description: { stringValue: newComplaintData.description || "" },
          address: { stringValue: newComplaintData.address || "Agrahara Circle, Ward 42, Mysuru" },
          ward_name: { stringValue: newComplaintData.ward_name || "Ward 42 — Devaraja / Agrahara" },
          authority_name: { stringValue: "Mysuru City Corporation (MCC)" },
          department_name: { stringValue: newComplaintData.department_name || "Road Engineering & Infrastructure" },
          officer_name: { stringValue: "Eng. Rajesh Kumar" },
          status: { stringValue: "Reported" },
          session_token: { stringValue: sessionToken },
          before_image_url: { stringValue: newComplaintData.before_image_url || "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80" }
        }
      };
      await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } catch (e) {}

    const created = {
      id: fakeId,
      category: newComplaintData.category || "Pothole",
      description: newComplaintData.description || "Civic defect reported.",
      address: newComplaintData.address || "Agrahara Circle, Ward 42, Mysuru",
      ward_name: newComplaintData.ward_name || "Ward 42 — Devaraja / Agrahara",
      authority_name: "Mysuru City Corporation (MCC)",
      department_name: newComplaintData.department_name || "Road Engineering & Infrastructure",
      officer_name: "Eng. Rajesh Kumar",
      status: "Reported",
      session_token: sessionToken,
      is_live_citizen: true,
      created_at: new Date().toISOString(),
      before_image_url: newComplaintData.before_image_url || "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80",
      after_image_url: null,
      upvotes: 1,
      ai_confidence: 94,
      sla_info: { status: "On Track", remaining_formatted: "24h remaining", percentage_remaining: 100 },
      timeline: [{ time: "Just now", status: "Reported", actor: "Citizen App/Web", desc: `Submitted via session ${sessionToken}.` }]
    };

    setComplaints(prev => {
      const updated = [created, ...prev];
      try {
        localStorage.setItem("civicroute_web_complaints_v1", JSON.stringify(updated));
      } catch (_) {}
      return updated;
    });

    return { success: true, complaint: created };
  };

  const selectedComplaint = complaints.find(c => c.id === selectedComplaintId) || complaints[0];

  return (
    <AppContext.Provider
      value={{
        complaints,
        jurisdictionVersion,
        setJurisdictionVersion,
        activeRole,
        setActiveRole,
        selectedComplaintId,
        setSelectedComplaintId,
        selectedComplaint,
        loading,
        analytics,
        currentUser,
        isAuthenticated,
        loginWebUser,
        logoutWebUser,
        updateStatus,
        createComplaint,
        fetchComplaints
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

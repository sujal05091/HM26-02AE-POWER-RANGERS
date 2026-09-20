import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NeuCard, NeuBadge, NeuButton, NeuInput } from '../../components/NeumorphicUI';
import { Search, Filter, Eye, CheckCircle, Clock } from 'lucide-react';

export const OfficerQueueTable = ({ onSelectComplaint }) => {
  const { complaints, updateStatus } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filtered = complaints.filter(c => {
    const matchesSearch = c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesCat = categoryFilter === 'All' || c.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesStatus && matchesCat;
  });

  return (
    <NeuCard style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b' }}>Officer Complaint Queue</h3>
          <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Manage field assignments, update progress, and upload resolution proof</p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div style={{ width: '200px' }}>
            <NeuInput
              placeholder="Search Ticket ID / Issue..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="neu-select">
            <option value="All">All Statuses</option>
            <option value="Reported">Reported</option>
            <option value="Assigned">Assigned</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Escalated">Escalated</option>
          </select>

          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="neu-select">
            <option value="All">All Categories</option>
            <option value="Pothole">Potholes</option>
            <option value="Garbage Overflow">Garbage</option>
            <option value="Drainage Blockage">Drainage</option>
            <option value="Broken Streetlight">Streetlights</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.5rem' }}>
          <thead>
            <tr style={{ textTransform: 'uppercase', fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textAlign: 'left' }}>
              <th style={{ padding: '0.5rem 1rem' }}>Ticket ID</th>
              <th style={{ padding: '0.5rem 1rem' }}>Issue & Location</th>
              <th style={{ padding: '0.5rem 1rem' }}>Jurisdiction / Ward</th>
              <th style={{ padding: '0.5rem 1rem' }}>SLA Target</th>
              <th style={{ padding: '0.5rem 1rem' }}>Status</th>
              <th style={{ padding: '0.5rem 1rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} className="neu-card-sm" style={{ background: '#e6ecf5' }}>
                <td style={{ padding: '0.75rem 1rem', fontWeight: 800, color: '#2563eb' }}>#{c.id}</td>
                <td style={{ padding: '0.75rem 1rem' }}>
                  <div style={{ fontWeight: 700, color: '#1e293b' }}>{c.category}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{c.address}</div>
                </td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.82rem', fontWeight: 600, color: '#475569' }}>
                  {c.ward_name || "Ward 42"}
                </td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.82rem', fontWeight: 700, color: c.sla_info?.is_breached ? '#dc2626' : '#1e293b' }}>
                  {c.sla_info?.remaining_formatted || `${c.sla_hours}h`}
                </td>
                <td style={{ padding: '0.75rem 1rem' }}>
                  <NeuBadge status={c.status} />
                </td>
                <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                    <NeuButton onClick={() => onSelectComplaint(c.id)} style={{ padding: '0.4rem 0.6rem', fontSize: '0.75rem' }}>
                      <Eye size={14} /> Inspect
                    </NeuButton>
                    {c.status !== 'Resolved' && (
                      <NeuButton
                        onClick={() => updateStatus(c.id, 'In Progress', 'Officer acknowledged and dispatched team')}
                        style={{ padding: '0.4rem 0.6rem', fontSize: '0.75rem', color: '#d97706' }}
                      >
                        Start Work
                      </NeuButton>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </NeuCard>
  );
};

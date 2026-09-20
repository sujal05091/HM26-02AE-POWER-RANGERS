import React from 'react';
import { useApp } from '../../context/AppContext';
import { MapViewer } from '../../components/MapViewer';
import { NeuCard } from '../../components/NeumorphicUI';
import { Navigation, MapPin } from 'lucide-react';

export const OfficerFieldMap = ({ onSelectComplaint }) => {
  const { complaints } = useApp();

  return (
    <NeuCard style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Navigation size={20} color="#2563eb" />
            Field Officer Route & Spatial Map
          </h3>
          <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Interactive map for field officer inspection routes in Mysuru</p>
        </div>
      </div>

      <MapViewer complaints={complaints} onSelectComplaint={onSelectComplaint} />
    </NeuCard>
  );
};

import React from 'react';

export const NeuCard = ({ children, className = '', convex = false, concave = false, onClick }) => {
  const mode = convex ? 'neu-card-convex' : concave ? 'neu-card-concave' : 'neu-card';
  return (
    <div className={`${mode} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export const NeuButton = ({ children, primary = false, active = false, onClick, className = '', type = 'button' }) => {
  const base = primary ? 'neu-button neu-button-primary' : 'neu-button';
  const stateClass = active ? 'active' : '';
  return (
    <button type={type} onClick={onClick} className={`${base} ${stateClass} ${className}`}>
      {children}
    </button>
  );
};

export const NeuInput = ({ value, onChange, placeholder, type = 'text', className = '' }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`neu-input ${className}`}
    />
  );
};

export const NeuPillTabs = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="neu-pill-container">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`neu-pill ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export const NeuBadge = ({ status }) => {
  let badgeClass = 'neu-badge-primary';
  let ledClass = 'led-primary';

  if (['Resolved', 'Completed', 'On Track'].includes(status)) {
    badgeClass = 'neu-badge-success';
    ledClass = 'led-success';
  } else if (['Assigned', 'In Progress', 'SLA Warning'].includes(status)) {
    badgeClass = 'neu-badge-warning';
    ledClass = 'led-warning';
  } else if (['Escalated', 'Overdue', 'High Priority'].includes(status)) {
    badgeClass = 'neu-badge-danger';
    ledClass = 'led-danger';
  }

  return (
    <span className={`neu-badge ${badgeClass}`}>
      <span className={`led-indicator ${ledClass}`}></span>
      {status}
    </span>
  );
};

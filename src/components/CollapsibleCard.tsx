import React from 'react';
import './CollapsibleCard.css';

interface CollapsibleCardProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const CollapsibleCard: React.FC<CollapsibleCardProps> = ({ title, children, isOpen, onToggle }) => {
  return (
    <div className="collapsible-card">
      <div className="card-header" onClick={onToggle}>
        <h2>{title}</h2>
        <span>{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <div className="card-content">
          {children}
        </div>
      )}
    </div>
  );
};

export default CollapsibleCard;

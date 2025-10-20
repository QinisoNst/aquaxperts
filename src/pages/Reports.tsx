import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { submitReport } from '../services/reports';
import './Reports.css';

const Reports: React.FC = () => {
  const [issue, setIssue] = useState('');
  const [otherIssue, setOtherIssue] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setError('You must be logged in to submit a report.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await submitReport(issue, otherIssue, description, location);

      // Reset form
      setIssue('');
      setOtherIssue('');
      setDescription('');
      setLocation('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="reports-container">
      <form className="report-form" onSubmit={handleSubmit}>
        <h1>Report a Water Issue</h1>
        
        <div className="input-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your location"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="issue">Type of Water Issue</label>
          <select id="issue" value={issue} onChange={(e) => setIssue(e.target.value)} required>
            <option value="" disabled>Select an issue</option>
            <option value="no-water">No Water</option>
            <option value="low-pressure">Low Water Pressure</option>
            <option value="discolored-water">Discolored Water</option>
            <option value="bad-taste">Bad Taste or Smell</option>
            <option value="leak">Leak</option>
            <option value="other">Other</option>
          </select>
        </div>

        {issue === 'other' && (
          <div className="input-group">
            <label htmlFor="other-issue">Please Specify</label>
            <input
              type="text"
              id="other-issue"
              value={otherIssue}
              onChange={(e) => setOtherIssue(e.target.value)}
              required
            />
          </div>
        )}

        <div className="input-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
          ></textarea>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="submit-button" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Report'}
        </button>
      </form>
    </div>
  );
};

export default Reports;

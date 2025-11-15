import React from 'react';
import { useEffect, useState } from "react";
import "./App.css";
import TestField from "./TestField";

/**
 * 
 * @returns {String|App.handleSubmit|Boolean}
 * Feather Hoshizora
 * 10/5/2025
 * App (currently mostly temporary name)
 * using testfield, provides a reusable template that allows users to input pertinent data and stores and displays it for testing purposes, can easily be
 * used to send said data wherever needed
 */
function App() {
  // List of all submissions
  const [entries, setEntries] = useState([]);
  // Last submitted values to display immediately
  const [last, setLast] = useState(null);

  // Load saved entries on mount
  useEffect(() => {
    const stored = localStorage.getItem("fitpal_entries");
    if (stored) setEntries(JSON.parse(stored));
  }, []);

  // Persist whenever entries change
  useEffect(() => {
    localStorage.setItem("fitpal_entries", JSON.stringify(entries));
  }, [entries]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const entry = {
      name: formData.get("Name")?.trim() || "",
      height: formData.get("Height")?.trim() || "",
      weight: formData.get("Weight")?.trim() || "",
      gender: formData.get("Gender")?.trim() || "",
      createdAt: new Date().toISOString(),
    };

    // Show on screen (mostly placeholder to confirm it works)
    setLast(entry);
    // Save to end of localStorage-backed list
    setEntries((prev) => [entry, ...prev]);

    // If we want to clear inputs after submit:
    e.currentTarget.reset();
  };

  return (
    <>
      <h1>FitPal</h1>

      <form onSubmit={handleSubmit}>
        <TestField field="Name" />
        <TestField field="Height" type="number" step="0.1" min="0" />
        <TestField field="Weight" type="number" step="0.1" min="0" />
        <TestField field="Gender" />
        <button type="submit">Submit</button>
      </form>

      {/* Display the most recent submission */}
      {last && (
        <section style={{ marginTop: 16 }}>
          <h2>Latest Submission</h2>
          <p><strong>Name:</strong> {last.name}</p>
          <p><strong>Height:</strong> {last.height}</p>
          <p><strong>Weight:</strong> {last.weight}</p>
          <p><strong>Gender:</strong> {last.gender}</p>
        </section>
      )}

      {/* Display the saved history */}
      {entries.length > 0 && (
        <section style={{ marginTop: 16 }}>
          <h2>Saved Entries</h2>
          <table>
            <thead>
              <tr>
                <th>When</th>
                <th>Name</th>
                <th>Height</th>
                <th>Weight</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e, i) => (
                <tr key={i}>
                  <td>{new Date(e.createdAt).toLocaleString()}</td>
                  <td>{e.name}</td>
                  <td>{e.height}</td>
                  <td>{e.weight}</td>
                  <td>{e.gender}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            style={{ marginTop: 8 }}
            onClick= {() => {
              setEntries([]);
              setLast(null);
              localStorage.removeItem("fitpal_entries");
            }}
          >
            Clear Saved Data
          </button>
        </section>
      )}
    </>
  );
}
export default App
//the command is npm run dev

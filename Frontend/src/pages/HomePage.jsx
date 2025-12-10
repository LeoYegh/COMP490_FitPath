import React from "react";
import "./HomePage.css";
import TestField from "./TestField";
/**
 * 
 * @type type
 */

const mockSummary = {
  steps: 8423,
  calories: 560,
  activeMinutes: 47,
  distanceKm: 6.3,
};

const weeklyCalories = [
  { day: "Mon", calories: 450 },
  { day: "Tue", calories: 520 },
  { day: "Wed", calories: 610 },
  { day: "Thu", calories: 480 },
  { day: "Fri", calories: 700 },
  { day: "Sat", calories: 800 },
  { day: "Sun", calories: 300 },
];

const goals = [
  { label: "Daily Steps", current: 8423, target: 10000, unit: "steps" },
  { label: "Active Minutes", current: 47, target: 60, unit: "min" },
  { label: "Calories Burned", current: 560, target: 700, unit: "kcal" },
];

const recentWorkouts = [
  { id: 1, type: "Run", duration: 32, calories: 310, date: "2025-12-08" },
  { id: 2, type: "Cycling", duration: 45, calories: 420, date: "2025-12-07" },
  { id: 3, type: "Strength", duration: 40, calories: 350, date: "2025-12-06" },
];

function StatCard({ label, value, unit }) {
  return (
    <div className="stat-card">
      <p className="stat-label">{label}</p>
      <p className="stat-value">
        {value}
        {unit && <span className="stat-unit"> {unit}</span>}
      </p>
    </div>
  );
}
// A generic name label component
const NameLabel = ({ name, style }) => {
  return (
    <div className="name-label" style={style}>
      <span>{name}</span>
    </div>
  );
};

function ProgressBar({ label, current, target, unit }) {
  const percentage = Math.min(100, Math.round((current / target) * 100));

  return (
    <div className="goal">
      <div className="goal-header">
        <span className="goal-label">{label}</span>
        <span className="goal-value">
          {current}/{target} {unit}
        </span>
      </div>
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function WorkoutList({ workouts }) {
  return (
    <div className="workout-list">
      {workouts.map((w) => (
        <div key={w.id} className="workout-item">
          <div>
            <p className="workout-type">{w.type}</p>
            <p className="workout-meta">
              {w.duration} min · {w.calories} kcal
            </p>
          </div>
          <span className="workout-date">
            {new Date(w.date).toLocaleDateString()}
          </span>
        </div>
      ))}
    </div>
  );
}

function WeeklyCaloriesChart({ data }) {
  // Normalize & guard against bad data
  const normalized = (data || []).map((d) => ({
    day: d.day ?? "",
    calories: Number(d.calories) || 0, // convert to number, fallback to 0
  }));

  const maxCalories =
    normalized.length > 0
      ? Math.max(...normalized.map((d) => d.calories))
      : 0;

  if (!normalized.length || maxCalories === 0) {
    return <p>No calorie data available for this period.</p>;
  }

  return (
    <div className="chart">
      {normalized.map((d) => {
        const height = Math.round((d.calories / maxCalories) * 100);

        return (
          <div key={d.day} className="chart-bar-wrapper">
            {/* Numeric label above the bar */}
            <span className="chart-value">{d.calories}</span>
            <div className="chart-bar-bg">
              <div
                className="chart-bar-fill"
                style={{ height: `${height}%` }}
              />
            </div>
            <span className="chart-day">{d.day}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function FitnessDashboard() {
  return (
    <div className="page">
      <header className="header">
        <div>
          <h1>Welcome back,  
          <NameLabel name="Feather" style={{ display: 'inline' }} />
          👋</h1>
          <p className="subtitle">Here’s a summary of your activity today.</p>
        </div>
        <button className="primary-btn">Start Workout</button>
      </header>

      {/* Top stats */}
      <section className="stats-grid">
        <StatCard label="Steps" value={mockSummary.steps.toLocaleString()} />
        <StatCard label="Calories" value={mockSummary.calories} unit="kcal" />
        <StatCard
          label="Active time"
          value={mockSummary.activeMinutes}
          unit="min"
        />
        <StatCard
          label="Distance"
          value={mockSummary.distanceKm}
          unit="km"
        />
      </section>

      {/* Middle: chart + goals */}
      <section className="middle-grid">
        <div className="card">
          <h2>Weekly calories</h2>
          <p className="card-subtitle">Last 7 days</p>
          <WeeklyCaloriesChart data={weeklyCalories} />
        </div>

        <div className="card">
          <h2>Today’s goals</h2>
          <p className="card-subtitle">Keep it up, you’re almost there!</p>
          <div className="goals-list">
            {goals.map((g) => (
              <ProgressBar
                key={g.label}
                label={g.label}
                current={g.current}
                target={g.target}
                unit={g.unit}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom: recent workouts */}
      <section className="card">
        <h2>Recent workouts</h2>
        <WorkoutList workouts={recentWorkouts} />
      </section>
    </div>
  );
}
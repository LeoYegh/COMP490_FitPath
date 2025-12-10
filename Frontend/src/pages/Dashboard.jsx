import React, { useState } from 'react';
import './SignUp';
import '../styles/Dashboard.css';

// --- DATA CONSTANTS (The "Database") ---
// We rename this slightly to indicate these are the starting goals/values
const INITIAL_MACROS = {
  protein: { current: 150, total: 200 }, // Increased total slightly for the demo
  carbs: { current: 150, total: 300 },
  fat: { current: 70, total: 80 }
};

const SLEEP_DATA = {
  hours: { current: 7.5, total: 8 }
};

const EXERCISE_DATA = {
  weightlifting: { calories: 150 },
  running: { calories: 100 },
};

// The "Menu" of available foods
const FOOD_DATABASE = {
  Salmon: { calories: 350, fat: 20, carbs: 0, protein: 35, icon: "🐟" },
  Burger: { calories: 500, fat: 30, carbs: 40, protein: 25, icon: "🍔" },
  Lettuce: { calories: 15, fat: 0, carbs: 3, protein: 1, icon: "🥬" },
  Ham: { calories: 120, fat: 4, carbs: 2, protein: 18, icon: "🍖" },
  Apple: { calories: 95, fat: 0, carbs: 25, protein: 0, icon: "🍎" },
};

// --- HELPER FUNCTIONS ---
function calculateCalories(protein, carbs, fat) {
  return (protein * 4) + (carbs * 4) + (fat * 9);
}

function currentPercentage(current, total) {
  const percent = (current / total * 100.0);
  return Math.min(Math.round(percent), 100); // Cap at 100 for visual cleanliness
}

const Icons = {
  Runner: () => (
    <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#f97316' }}>
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
    </svg>
  ),
  Moon: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#9ca3af' }}>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
    </svg>
  ),
  Dumbbell: () => (
    <svg viewBox="0 0 24 24" width="60" height="60" stroke="#f97316" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6.5 6.5 11 11"></path>
      <path d="m21 21-1-1"></path>
      <path d="m3 3 1 1"></path>
      <path d="m18 22 4-4"></path>
      <path d="m2 6 4-4"></path>
      <path d="m3 10 7-7"></path>
      <path d="m14 21 7-7"></path>
    </svg>
  ),
  Plus: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  )
};

const Dashboard = () => {
  // --- STATE MANAGEMENT ---

  // 1. Macros State (initialized with the constants)
  const [macros, setMacros] = useState(INITIAL_MACROS);

  // 2. Food Log State (Starts with an empty array)
  const [dailyLog, setDailyLog] = useState([]);

  // 3. UI State for the dropdown menu
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);

  // --- ACTIONS ---

  const handleAddFood = (foodKey) => {
    const foodItem = FOOD_DATABASE[foodKey];

    // 1. Update the Log List
    setDailyLog(prevLog => [...prevLog, { name: foodKey, ...foodItem }]);

    // 2. Update the Macro Math
    setMacros(prevMacros => ({
      protein: { ...prevMacros.protein, current: prevMacros.protein.current + foodItem.protein },
      carbs: { ...prevMacros.carbs, current: prevMacros.carbs.current + foodItem.carbs },
      fat: { ...prevMacros.fat, current: prevMacros.fat.current + foodItem.fat }
    }));

    // 3. Close the menu
    setIsAddMenuOpen(false);
  };

  // Calculate dynamic totals for display
  const currentCals = calculateCalories(macros.protein.current, macros.carbs.current, macros.fat.current);
  const totalCals = calculateCalories(macros.protein.total, macros.carbs.total, macros.fat.total);

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">

        {/* LEFT COLUMN */}
        <div className="main-content">
          <div className="header-section">
            <div className="logo-area">
              <span className="logo-text">FITPATH</span>
              <Icons.Runner />
            </div>
            <div className="sub-header">PERSONAL STATS</div>
          </div>

          <div className="stats-grid">

            {/* 1. Daily Overview */}
            <div className="card overview-card" style={{ gridColumn: 'span 2' }}>
              <div className="card-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>DAILY OVERVIEW</span>
                <div style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 'normal', textAlign: 'right' }}>
                  Today Slept: {SLEEP_DATA.hours.current}h<br />
                  Meals Logged: {dailyLog.length}
                </div>
              </div>

              <div className="overview-content">
                <div className="stats-details">
                  <div style={{ marginBottom: '15px' }}>
                    <span className="kcal-count">{currentCals}</span>
                    <span className="kcal-total"> / {totalCals} kcal</span>
                  </div>

                  <MacroBar label="Protein" current={macros.protein.current} total={macros.protein.total}
                    percent={currentPercentage(macros.protein.current, macros.protein.total)}
                    colorClass="orange" bgClass="bg-orange" badgeClass="bg-orange-light" />

                  <MacroBar label="Carbs" current={macros.carbs.current} total={macros.carbs.total}
                    percent={currentPercentage(macros.carbs.current, macros.carbs.total)}
                    colorClass="blue" bgClass="bg-blue" badgeClass="bg-blue-light" />

                  <MacroBar label="Fat" current={macros.fat.current} total={macros.fat.total}
                    percent={currentPercentage(macros.fat.current, macros.fat.total)}
                    colorClass="green" bgClass="bg-green" badgeClass="bg-green-light" />

                  <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '10px' }}>
                    Stats update automatically as you add food.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Sleep Tracker */}
            <div className="card">
              <h3 className="card-title">SLEEP TRACKER</h3>
              <div style={{ display: 'flex', gap: '5px', marginBottom: '15px', alignItems: 'center' }}>
                <Icons.Moon />
                <span style={{ fontSize: '0.7rem', color: '#9ca3af', textTransform: 'uppercase', fontWeight: 'bold' }}>Last Night</span>
              </div>

              <div className="sleep-stats">
                <span className="stat-label">LAST NIGHT:</span>
                <span className="stat-value">{SLEEP_DATA.hours.current}h 00m</span>
                <span className="goal-badge">goal</span>
                <span className="stat-value">{SLEEP_DATA.hours.total}h 00m</span>
              </div>

              <div className="chart-container">
                <svg viewBox="0 0 100 40" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                  <path d="M0 30 L10 25 L20 28 L30 15 L40 20 L50 10 L60 18 L70 5 L80 15 L90 10 L100 20" fill="none" stroke="#60a5fa" strokeWidth="2" />
                  <path d="M0 30 L10 25 L20 28 L30 15 L40 20 L50 10 L60 18 L70 5 L80 15 L90 10 L100 20 V 40 H 0 Z" fill="rgba(96, 165, 250, 0.2)" />
                </svg>
                <div className="chart-days">
                  <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                </div>
              </div>
            </div>

            {/* 3. Food Log (Interactive) */}
            <div className="card" style={{ position: 'relative' }}>
              <h3 className="card-title">FOOD LOG</h3>

              {/* The List of Eaten Food */}
              <div className="food-list">
                {dailyLog.length === 0 ? (
                  <div style={{ color: '#6b7280', fontSize: '0.8rem', fontStyle: 'italic', padding: '10px' }}>
                    No food logged yet.
                  </div>
                ) : (
                  dailyLog.map((food, index) => (
                    <FoodItem
                      key={index}
                      icon={food.icon}
                      name={food.name}
                      cal={`${food.calories} kcal`}
                    />
                  ))
                )}
              </div>

              {/* The Add Button & Dropdown */}
              <button
                className="add-btn"
                onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
              >
                <Icons.Plus /> {isAddMenuOpen ? "CLOSE MENU" : "ADD FOOD"}
              </button>

              {/* The Pop-up Menu */}
              {isAddMenuOpen && (
                <div style={{
                  position: 'absolute', bottom: '50px', left: '10px', right: '10px',
                  backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px',
                  padding: '10px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)', zIndex: 10
                }}>
                  <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '8px' }}>Select to add:</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    {Object.keys(FOOD_DATABASE).map((key) => (
                      <button
                        key={key}
                        onClick={() => handleAddFood(key)}
                        style={{
                          textAlign: 'left', padding: '8px', borderRadius: '6px',
                          backgroundColor: '#374151', color: 'white', border: 'none', cursor: 'pointer',
                          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                        }}
                      >
                        <span>{FOOD_DATABASE[key].icon} {key}</span>
                        <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{FOOD_DATABASE[key].calories} cal</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 4. Workouts */}
            <div className="card dark" style={{ gridColumn: 'span 2' }}>
              <h3 className="card-title">WORKOUTS COMPLETED</h3>
              <div className="workout-container">
                <div className="workout-icon"><Icons.Dumbbell /></div>
                <div className="workout-list">
                  {Object.entries(EXERCISE_DATA).map(([name, data]) => (
                    <div className="workout-item" key={name}>
                      <strong style={{ textTransform: 'uppercase' }}>{name}:</strong> {data.calories} kcal burned
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="sidebar">
          <h3 className="card-title">Recommend actions</h3>
          <Recommendation title="Sleep" text="Goal is 8 hours judging by the time try turning on blue light filter." />
          <Recommendation title="Macros" text="You're doing well keep it up :)" />
          <Recommendation title="Exercise" text="You have not worked out your biceps or quads in the past week." />
        </div>

      </div>
    </div>
  );
};

// --- Helper Components ---

const MacroBar = ({ label, current, total, percent, colorClass, bgClass, badgeClass }) => (
  <div className="macro-item">
    <div className={`macro-header ${colorClass}`}>
      <span>{label}: {current}g / {total}g</span>
    </div>
    <div className="macro-row">
      <div className="progress-track">
        <div className={`progress-fill ${bgClass}`} style={{ width: `${percent}%` }}></div>
      </div>
      <span className={`percent-badge ${badgeClass}`}>{percent}%</span>
    </div>
  </div>
);

const FoodItem = ({ icon, name, cal }) => (
  <div className="food-item">
    <div className="food-icon">{icon}</div>
    <div>
      <div style={{ fontWeight: '500', fontSize: '0.9rem' }}>{name}</div>
      {cal && <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#9ca3af' }}>{cal}</div>}
    </div>
  </div>
);

const Recommendation = ({ title, text }) => (
  <div className="rec-card">
    <h4>{title}</h4>
    <div className="rec-box">
      <p className="rec-text">{text}</p>
    </div>
  </div>
);

export default Dashboard;
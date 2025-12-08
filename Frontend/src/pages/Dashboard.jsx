import React from 'react';
import './SignUp';
import '../styles/Dashboard.css';

const macros = {
  protein: { current: 150, total: 180 },
  carbs:   { current: 150, total: 300 },
  fat:     { current: 70,  total: 80 }
};

const sleep ={
  hours: {current: 8 ,total: 8}
}

const exercises ={
   wheightlifting: { calories: 150},
   running:  { calories: 100},
}
const foods ={
  Salmon: {calories:150, fat: 10, carbs:0, protein:15},
  burger: {calories:200, fat: 50, carbs:20, protein:10},
  lettuce: {calories:50, fat: 0, carbs:1, protein:0},
  ham: {calories:150, fat: 5, carbs:0, protein:15},
  bread: {calories:350, fat: 5, carbs:30, protein:0},
  crackers: {calories:150, fat: 10, carbs:10, protein:0}
}

function addFoodMacros(food){
  macros.calories.current+=food.FoodItem.calories;
  macros.fat.current+=food.FoodItem.fat;
  macros.protein.current+=food.FoodItem.protein;
  macros.carbs.current+=food.FoodItem.carbs;
}

function removeCalsForexercise(exercises, time){
  macros.calories.current-= exercises* (time/60.0);
}

function currentPercentage(current, total){
     return (current/total*100.0);
}
function isdoingWell(currentPercentage, thing){
  if(currentPercentage<=100){
    return "Your doing well on " + thing + "keep it up." 
  }
  else 
    return "You need more " + thing + ". " 
}


const Icons = {
  Runner: () => (
    <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{color: '#f97316'}}>
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
    </svg>
  ),
  Moon: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{color: '#9ca3af'}}>
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
  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        
        {/* LEFT COLUMN: Main Stats */}
        <div className="main-content">
          
          {/* Header */}
          <div className="header-section">
            <div className="logo-area">
              <span className="logo-text">FITPATH</span>
              <Icons.Runner />
            </div>
            <div className="sub-header">PERSONAL STATS</div>
          </div>

          <div className="stats-grid">
            
            {/* 1. Daily Overview */}
            <div className="card overview-card" style={{ gridColumn: 'span 2' }}> {/* Span 2 on large screens, handled by CSS media query fallback */}
              <div className="card-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>DAILY OVERVIEW</span>
                <div style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 'normal', textAlign: 'right', textTransform: 'none' }}>
                   Today Slept: 7h 30m<br/>Food Logged: 3 meals
                </div>
              </div>
              
              <div className="overview-content">
                {/* Circular Chart */}
              

                {/* Macro Bars */}
                <div className="stats-details">
                   <div style={{ marginBottom: '15px' }}>
                     <span className="kcal-count">2250</span>
                     <span className="kcal-total"> / 3000 kcal</span>
                   </div>
                   
                   {/* Protein */}
                   <MacroBar label="Protein"  current = {macros.protein.current} total={macros.protein.total} percent={currentPercentage(macros.protein.current, macros.protein.total)} 
                   colorClass="orange" bgClass="bg-orange" badgeClass="bg-orange-light" />
                   {/* Carbs */}
                   <MacroBar label="Carbs" current = {macros.carbs.current} total={macros.carbs.total} percent={currentPercentage(macros.carbs.current, macros.carbs.total)} 
                   colorClass="blue" bgClass="bg-blue" badgeClass="bg-blue-light" />
                   {/* Fat */}
                   <MacroBar label="Fat" current = {macros.fat.current} total={macros.fat.total} percent={currentPercentage(macros.protein.current, macros.protein.total)} colorClass="green" bgClass="bg-green" badgeClass="bg-green-light" />

                   <p style={{fontSize: '0.75rem', color: '#9ca3af', marginTop: '10px'}}>
                     TOTAL CALORIES FROM MACROS: 2330 kcal
                   </p>
                </div>
              </div>
            </div>

            {/* 2. Sleep Tracker */}
            <div className="card">
              <h3 className="card-title">SLEEP TRACKER</h3>
              <div style={{display:'flex', gap:'5px', marginBottom:'15px', alignItems:'center'}}>
                 <Icons.Moon /> 
                 <span style={{fontSize:'0.7rem', color:'#9ca3af', textTransform:'uppercase', fontWeight:'bold'}}>Last Night</span>
              </div>
              
              <div className="sleep-stats">
                 <span className="stat-label">LAST NIGHT:</span>
                 <span className="stat-value">7h 45m</span>
                 
                 <span className="goal-badge">goal</span>
                 <span className="stat-value">8h 00m</span>
                 
                 <span className="stat-label">AVERAGE:</span>
                 <span className="stat-value" style={{color:'#9ca3af'}}>7h 15m</span>
              </div>

              <div className="chart-container">
                 <svg viewBox="0 0 100 40" style={{width:'100%', height:'100%', overflow:'visible'}}>
                   <path d="M0 30 L10 25 L20 28 L30 15 L40 20 L50 10 L60 18 L70 5 L80 15 L90 10 L100 20" fill="none" stroke="#60a5fa" strokeWidth="2" />
                   <path d="M0 30 L10 25 L20 28 L30 15 L40 20 L50 10 L60 18 L70 5 L80 15 L90 10 L100 20 V 40 H 0 Z" fill="rgba(96, 165, 250, 0.2)" />
                 </svg>
                 <div className="chart-days">
                    <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                 </div>
              </div>
            </div>

            {/* 3. Food Log */}
            <div className="card">
              <h3 className="card-title">FOOD LOG</h3>
              <div className="food-list">
                <FoodItem icon="🥣" name="Breakfast: Oatmeal" cal="450 kcal" />
                <FoodItem icon="🥗" name="Lunch: Chicken Salad" cal="" />
                <FoodItem icon="🐟" name="Dinner: Salmon & Veggies" cal="" />
              </div>
              <button className="add-btn">
                <Icons.Plus /> ADD FOOD
              </button>
            </div>

            {/* 4. Workouts Completed */}
            <div className="card dark" style={{ gridColumn: 'span 2' }}>
               <h3 className="card-title">WORKOUTS COMPLETED</h3>
               <div className="workout-container">
                 <div className="workout-icon">
                    <Icons.Dumbbell />
                 </div>
                 <div className="workout-list">
                    <div className="workout-item">
                      <strong>RUNNING:</strong> 5 km, 30 min (350 kcal)
                    </div>
                    <div className="workout-item">
                      <strong>WEIGHTS:</strong> Full Body, 45 min (400 kcal)
                    </div>
                    <div className="workout-item">
                      <strong>YOGA:</strong> Flow, 20 min (120 kcal)
                    </div>
                 </div>
               </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar */}
        <div className="sidebar">
          <h3 className="card-title">Recommend actions</h3>
          
          <Recommendation 
            title="Sleep" 
            text="Goal is 8 hours judging by the time try turning on blue light filter to make you fall asleep earlier" 
          />
          <Recommendation 
            title="Macros" 
            text="Your doing well keep it up :)" 
          />
          <Recommendation 
            title="Exercise" 
            text="You have not worked out your biceps or quads in the past week maybe try incorporating some full body rows too help both." 
          />
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
         <div className={`progress-fill ${bgClass}`} style={{ width: `${(current/total)*100}%` }}></div>
      </div>
      <span className={`percent-badge ${badgeClass}`}>{percent}</span>
    </div>
  </div>
);

const FoodItem = ({ icon, name, cal }) => (
  <div className="food-item">
    <div className="food-icon">{icon}</div>
    <div>
      <div style={{ fontWeight: '500', fontSize:'0.9rem' }}>{name}</div>
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
// Dashboard.jsx

import React, { useState } from 'react';
import './SignUp';
import '../styles/Dashboard.css';
import { useUser } from '../Context/UserContext'; // <-- Import the user context

// --- ICONS (Added a few more for the food/workout data) ---
const Icons = {
    // --- Utility & Status Icons (Kept as SVG for visual consistency/utility) ---
    heartmonitorlookingsymbol: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>,
    Moon: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6.364 6.364 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>,
    Plus: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>,
    Check: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>,
    X: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>,

    // --- Exercise Emojis ---
    Running: () => <span role="img" aria-label="running" style={{ fontSize: '18px' }}>🏃</span>,
    Dumbbell: () => <span role="img" aria-label="dumbbell" style={{ fontSize: '18px' }}>🏋️</span>,
    Yoga: () => <span role="img" aria-label="yoga" style={{ fontSize: '18px' }}>🧘</span>,
    Walk: () => <span role="img" aria-label="walk" style={{ fontSize: '18px' }}>🚶</span>,

    // --- Food Emojis ---
    Chicken: () => <span role="img" aria-label="chicken" style={{ fontSize: '18px' }}>🍗</span>,
    Avocado: () => <span role="img" aria-label="avocado" style={{ fontSize: '18px' }}>🥑</span>,
    Bread: () => <span role="img" aria-label="bread" style={{ fontSize: '18px' }}>🍞</span>,
    Apple: () => <span role="img" aria-label="apple" style={{ fontSize: '18px' }}>🍎</span>,
    Shake: () => <span role="img" aria-label="shake" style={{ fontSize: '18px' }}>🥤</span>,
    Rice: () => <span role="img" aria-label="rice" style={{ fontSize: '18px' }}>🍚</span>,
};
export { Icons };

// --- DATA CONSTANTS (The "Database") ---

/**
 * Mock Food Database (1 serving size)
 * Includes protein, carbs, fat (grams) and total calories (kcal)
 */
const FOOD_DATABASE = { 
    'Grilled Chicken Breast': { 
        protein: 30, carbs: 0, fat: 3, icon: <Icons.Chicken />, 
        calories: calculateCalories(30, 0, 3) 
    },
    'Avocado Toast (1 slice)': { 
        protein: 5, carbs: 30, fat: 15, icon: <Icons.Avocado />, 
        calories: calculateCalories(5, 30, 15) 
    },
    'Large Apple': { 
        protein: 1, carbs: 25, fat: 0, icon: <Icons.Apple />, 
        calories: calculateCalories(1, 25, 0) 
    },
    'Protein Shake (Whey)': { 
        protein: 25, carbs: 5, fat: 2, icon: <Icons.Plus />, // Re-using Plus for supplement
        calories: calculateCalories(25, 5, 2) 
    },
    'Rice (1 cup)': { 
        protein: 4, carbs: 45, fat: 0, icon: <Icons.Bread />, // Re-using bread icon
        calories: calculateCalories(4, 45, 0) 
    },
};

/**
 * Mock Exercise Database (Calories burned per 30 minutes)
 */
const EXERCISE_DATA = { 
    'Brisk Walk': { 
        calories: 120, 
        icon: <Icons.Walk /> 
    },
    'Weightlifting (Moderate)': { 
        calories: 180, 
        icon: <Icons.Dumbbell /> 
    },
    'Yoga (30m)': { 
        calories: 140, 
        icon: <Icons.Yoga /> 
    },
    'Running (30 min)': { 
        calories: 300, 
        icon: <Icons.Running /> 
    },
};


// --- HELPER FUNCTIONS (Kept the same) ---
function calculateCalories(protein, carbs, fat) {
    // Protein (4 kcal/g), Carbs (4 kcal/g), Fat (9 kcal/g)
    return (protein * 4) + (carbs * 4) + (fat * 9);
}

function currentPercentage(current, total){
    const percent = (current/total*100.0);
    return Math.min(Math.round(percent), 100);
}

const generateRecommendations = (macros, sleepHours, SLEEP_GOAL_FROM_CONTEXT, caloriesBurned, calorieNet, totalCalsGoal) => { 
    const recs = {};
    const proteinPct = currentPercentage(macros.protein.current, macros.protein.total);

    // 1. Sleep Recommendation
    if (sleepHours < SLEEP_GOAL_FROM_CONTEXT - 0.5) {
        recs.sleep = `You slept ${sleepHours}h, below your ${SLEEP_GOAL_FROM_CONTEXT}h goal. Prioritize good sleep tonight.`;
    } else if (sleepHours >= SLEEP_GOAL_FROM_CONTEXT) {
        recs.sleep = `Excellent! You met your ${SLEEP_GOAL_FROM_CONTEXT}h goal. try your best to keep this up tommrow as well`;
    } else {
        recs.sleep = `Good job with ${sleepHours} h Just a little bit more sleep to hit your ${SLEEP_GOAL_FROM_CONTEXT}h goal.`;
    }

    // 2. Calorie Recommendation
    if (calorieNet < totalCalsGoal * 0.75) { 
        recs.calorieNet = `Calorie Net is ${calorieNet} kcal. Consider a healthy snack to refuel if this is too low.`;
    } else if ((calorieNet > totalCalsGoal * 0.75) &&(calorieNet < totalCalsGoal * 1)) { 
        recs.calorieNet = `You have a remaining budget of ${totalCalsGoal -calorieNet} kcal today. Plan your next meal wisely.`;
    } else if ((calorieNet > totalCalsGoal * 1) &&(calorieNet < totalCalsGoal * 1.25)){  
        recs.calorieNet = `You are over the amount of calories you set as goal ${totalCalsGoal} kcal. if you are still hungry maybe try adjusting goal 
        or eating more filling foods per calorie, protiens are very filling`;
    } else if ((calorieNet > totalCalsGoal * 1,25) &&(calorieNet < totalCalsGoal * 2)) {
        recs.calorieNet = `You ate more than the amount of calories you set as goal ${totalCalsGoal} kcal. if you are still hungry maybe try adjusting goal 
        or eating more filling foods per calorie, protiens are very filling`;
      }
      else{
        recs.calorieNet = `You ate alot more than the amount of calories you set as goal ${calorieNet} kcal. if you are still hungry maybe try adjusting goal 
        or eating more filling foods per calorie, protiens are very filling but best not to eat anymore today`;
      }

    
    // 3. Macro (Protein) Recommendation
    if (proteinPct < 75) {
        const highProteinFoods = Object.keys(FOOD_DATABASE)
            .map(key => ({ name: key, protein: FOOD_DATABASE[key].protein, icon: FOOD_DATABASE[key].icon }))
            .filter(food => food.protein > 15) 
            .sort((a, b) => b.protein - a.protein)
            .slice(0, 2);

        let proteinRec = `You've only hit ${proteinPct}% of your Protein goal.`;
        if (highProteinFoods.length > 0) {
            const foodNames = highProteinFoods.map(f => `${f.icon} ${f.name}`);
            proteinRec += ` Try adding ${foodNames.join(' or ')} to your next meal.`;
        } else {
            proteinRec += ` Try to focus on lean protein sources like chicken or eggs.`;
        }
        recs.macro = proteinRec;

    } else if (proteinPct >= 100) {
        recs.macro = `Protein Goal met (${proteinPct}%). Focus on balancing remaining Carbs and Fat.`;
    } else {
        recs.macro = `Great progress on Protein (${proteinPct}%). Almost there!`;
    }
    
    // 4. Exercise Recommendation
    if (caloriesBurned < 150) {
        recs.exercise = `You've burned less than 150 cal. A quick 30-min run/yoga could boost this. Log a workout!`;
    } else if ((caloriesBurned >= 150) && (caloriesBurned < 650)) {
        recs.exercise = `You've burned ${caloriesBurned} cal! Excellent activity level today. you can still workout more, but good work so far`;
    } else {
        recs.exercise = `You've burned ${caloriesBurned} cal. Great moderate activity level. don't push it to hard`;
    }

    return recs;
};


// --- FIXED: HELPER COMPONENTS DEFINED OUTSIDE THE MAIN FUNCTION (Kept the same) ---
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

const FoodItem = ({ id, icon, name, cal, onRemove }) => (
    <div className="food-item">
        <div className="food-item-content">
            <div className="food-icon">{icon}</div>
            <div>
                <div className="food-item-name">{name}</div>
                {cal && <div className="food-item-cal">{cal}</div>}
            </div>
        </div>
        <button 
            onClick={() => onRemove(id)}
            className="remove-btn"
            title="Remove item"
        >
            <Icons.X />
        </button>
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


// --- Dashboard Component (The main function) ---

const Dashboard = () => {
    // --- CONTEXT & GOAL RETRIEVAL ---
        
    const  {userMetrics}  = useUser(); // <-- Get user metrics from context

    // Calculate initial dynamic goals based on userMetrics
    const INITIAL_MACROS = {
        protein: { current: 0, total: userMetrics.proteinGoal },
        carbs: 	 { current: 0, total: userMetrics.carbsGoal },
        fat: 	 { current: 0, total: userMetrics.fatGoal }
    };
    const SLEEP_GOAL = userMetrics.sleepGoal; // Dynamic sleep goal

    // --- STATE MANAGEMENT ---
    const [macros, setMacros] = useState(INITIAL_MACROS);
    const [dailyLog, setDailyLog] = useState([]);
    const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
    const [isWorkoutMenuOpen, setIsWorkoutMenuOpen] = useState(false);
    const [sleepHours, setSleepHours] = useState(7.5); 
    const [saveMessage, setSaveMessage] = useState('');
    const [caloriesBurned, setCaloriesBurned] = useState(0);
    const [workoutLog, setWorkoutLog] = useState([]);

    // --- ACTIONS (Kept the same) ---
    const handleAddWorkout = (workoutKey) => {
        const workout = EXERCISE_DATA[workoutKey];
        if (workout) {
            const newWorkout = { id: Date.now() + Math.random(), name: workoutKey, calories: workout.calories, icon: workout.icon };
            setWorkoutLog(prev => [...prev, newWorkout]);
            setCaloriesBurned(prev => prev + workout.calories);
            setIsWorkoutMenuOpen(false);
        }
    };
    
    const handleRemoveWorkout = (idToRemove) => {
        const removedWorkout = workoutLog.find(w => w.id === idToRemove);
        if (removedWorkout) {
            setWorkoutLog(prev => prev.filter(w => w.id !== idToRemove));
            setCaloriesBurned(prev => prev - removedWorkout.calories);
        }
    };
    
    const handleSleepChange = (e) => {
        setSleepHours(parseFloat(e.target.value) || 0);
    };
    
    const handleSaveSleep = () => {
        setSaveMessage(`Sleep saved: ${sleepHours} hours!`);
        setTimeout(() => setSaveMessage(''), 3000);
    };
    
    const handleUpdateMacros = (foodItem, operation = 'add') => {
        const factor = operation === 'add' ? 1 : -1;
        
        setMacros(prev => ({
            protein: { ...prev.protein, current: prev.protein.current + (foodItem.protein * factor) },
            carbs: 	 { ...prev.carbs, 	current: prev.carbs.current + (foodItem.carbs 	* factor) },
            fat: 	 { ...prev.fat, 	current: prev.fat.current 	+ (foodItem.fat 	* factor) },
        }));
    };
    
    const handleAddFood = (foodKey) => {
        const food = FOOD_DATABASE[foodKey];
        if (food) {
            const newFood = { 
                id: Date.now() + Math.random(), 
                name: foodKey, 
                calories: food.calories, 
                protein: food.protein, 
                carbs: food.carbs, 
                fat: food.fat, 
                icon: food.icon 
            };
            setDailyLog(prev => [...prev, newFood]);
            handleUpdateMacros(newFood, 'add');
            setIsAddMenuOpen(false);
        }
    };
    
    const handleRemoveFood = (idToRemove) => {
        const removedFood = dailyLog.find(f => f.id === idToRemove);
        if (removedFood) {
            setDailyLog(prev => prev.filter(f => f.id !== idToRemove));
            handleUpdateMacros(removedFood, 'remove');
        }
    };
    
    // Calculate dynamic totals for display
    const currentCals = calculateCalories(macros.protein.current, macros.carbs.current, macros.fat.current);
    const totalCals = userMetrics.calorieGoal; 
    const calorieNet = currentCals - caloriesBurned;
    
    // Generate dynamic recommendations (Pass dynamic SLEEP_GOAL and totalCals)
    const recommendations = generateRecommendations(macros, sleepHours, SLEEP_GOAL, caloriesBurned, calorieNet, totalCals); 
    
    // --- RENDERING (Kept the same) ---

    return (
        <div className="dashboard-container">
            <div className="dashboard-wrapper">
                
                {/* LEFT COLUMN */}
                <div className="main-content">
                    <div className="header-section">
                        <div className="logo-area">
                            <span className="logo-text">FITPATH</span>
                            <Icons.heartmonitorlookingsymbol />
                        </div>
                        <div className="sub-header">PERSONAL STATS</div>
                    </div>

                    <div className="stats-grid">
                        
                        {/* 1. Daily Overview */}
                        <div className="card overview-card grid-span-2">
                            <div className="card-title title-flex">
                                <span>DAILY OVERVIEW</span>
                                <div className="overview-stats-text">
                                    Today Slept: {sleepHours}h<br/> 
                                    Meals Logged: {dailyLog.length}
                                </div>
                            </div>
                            
                            <div className="overview-content">
                                <div className="stats-details">
                                    <div className="kcal-header-spacing">
                                        <span className="kcal-count">{currentCals}</span>
                                        <span className="kcal-total"> / {totalCals} kcal EATEN</span> 
                                    </div>
                                    
                                    <div className="kcal-burned-display">
                                        -{caloriesBurned} kcal BURNED from exercise
                                    </div>
                                    <div className="calorie-net-display">
                                        NET: {calorieNet} kcal
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

                                    <p className="stats-note-text">
                                        Stats update automatically as you add food.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 2. Sleep Tracker */}
                        <div className="card">
                            <h3 className="card-title">SLEEP TRACKER</h3>
                            <div className="sleep-header-flex">
                                <Icons.Moon /> 
                                <span className="sleep-last-night-text">Last Night</span>
                            </div>
                            
                            <div className="sleep-stats">
                                <span className="stat-label">INPUT:</span>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={sleepHours}
                                    onChange={handleSleepChange}
                                    min="0"
                                    max="10"
                                    className="sleep-input"
                                />
                                <span className="stat-value">h</span>
                                <span className="goal-badge">goal</span>
                                <span className="stat-value">{SLEEP_GOAL}h</span> 
                            </div>
                            
                            <button 
                                onClick={handleSaveSleep}
                                className="sleep-log-btn"
                            >
                                LOG SLEEP
                            </button>
                            
                            {saveMessage && (
                                <div className="save-message-flex">
                                    <Icons.Check />
                                    {saveMessage}
                                </div>
                            )}
                        </div>

                        {/* 3. Food Log (Interactive) */}
                        <div className="card card-relative">
                            <h3 className="card-title">FOOD LOG</h3>
                            
                            <div className="food-list">
                                {dailyLog.length === 0 ? (
                                    <div className="log-empty-text">
                                        No food logged yet.
                                    </div>
                                ) : (
                                    dailyLog.map((food) => (
                                        <FoodItem 
                                            key={food.id}
                                            id={food.id}
                                            icon={food.icon} 
                                            name={food.name} 
                                            cal={`${food.calories} kcal`}
                                            onRemove={handleRemoveFood}
                                        />
                                    ))
                                )}
                            </div>

                            <button 
                                className="add-btn" 
                                onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
                            >
                                <Icons.Plus /> {isAddMenuOpen ? "CLOSE FOOD MENU" : "ADD FOOD"}
                            </button>

                            {isAddMenuOpen && (
                                <div className="add-menu-popup">
                                    <p className="add-menu-header">Select to add:</p>
                                    <div className="add-menu-list">
                                        {Object.keys(FOOD_DATABASE).map((key) => (
                                            <button 
                                                key={key}
                                                onClick={() => handleAddFood(key)}
                                                className="add-menu-item-btn"
                                            >
                                                <span>{FOOD_DATABASE[key].icon} {key}</span>
                                                <span className="add-menu-cal">{FOOD_DATABASE[key].calories} cal</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* 4. Workouts (LOGGING MENU) */}
                        <div className="card card-relative grid-span-2">
                            <h3 className="card-title">WORKOUT LOG</h3>
                            
                            <div className="workout-container">
                                <div className="workout-list">
                                    {workoutLog.length === 0 ? (
                                        <div className="log-empty-text">
                                            No workouts logged today.
                                        </div>
                                    ) : (
                                        workoutLog.map((workout) => (
                                            <FoodItem 
                                                key={workout.id}
                                                id={workout.id}
                                                icon={workout.icon} 
                                                name={workout.name} 
                                                cal={`Burned: ${workout.calories} kcal`}
                                                onRemove={handleRemoveWorkout}
                                            />
                                        ))
                                    )}
                                </div>
                            </div>
                            
                            <button 
                                className="add-btn workout-log-btn" 
                                onClick={() => setIsWorkoutMenuOpen(!isWorkoutMenuOpen)}
                                style={{backgroundColor: isWorkoutMenuOpen ? '#ef4444' : '#f97316'}}
                            >
                                <Icons.Plus /> {isWorkoutMenuOpen ? "CLOSE WORKOUT MENU" : "LOG WORKOUT"}
                            </button>
                            
                            {isWorkoutMenuOpen && (
                                <div className="add-menu-popup">
                                    <p className="add-menu-header">Select activity:</p>
                                    <div className="add-menu-list">
                                        {Object.keys(EXERCISE_DATA).map((key) => (
                                            <button 
                                                key={key}
                                                onClick={() => handleAddWorkout(key)}
                                                className="add-menu-item-btn"
                                            >
                                                <span>{EXERCISE_DATA[key].icon} {key}</span>
                                                <span className="add-menu-cal-orange">{EXERCISE_DATA[key].calories} cal</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>

                {/* RIGHT COLUMN - Dynamic Recommendations */}
                <div className="sidebar">
                    <h3 className="card-title">Recommend actions</h3>
                    {/* Calorie Net Recommendation */}
                    <Recommendation title="Calorie Net" text={recommendations.calorieNet} />
                    {/* Sleep Recommendation */}
                    <Recommendation title="Sleep" text={recommendations.sleep} /> 
                    {/* Macro (Protein) Recommendation */}
                    <Recommendation title="Protein Intake" text={recommendations.macro} /> 
                    {/* Exercise Recommendation */}
                    <Recommendation title="Exercise" text={recommendations.exercise} />
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
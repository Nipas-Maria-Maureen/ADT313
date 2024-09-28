import React, { useState, useReducer, useEffect, useCallback, createContext, useContext } from 'react';
import './App.css';

// User Context
const UserContext = createContext();

// Debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

// Initial state and reducer for user
const initialState = {
  users: [],
  loggedInUser: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SIGN_UP':
      return { ...state, users: [...state.users, action.payload] };
    case 'LOGIN':
      return { ...state, loggedInUser: action.payload };
    default:
      return state;
  }
};

// Main App Component
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [operation, setOperation] = useState('');
  const [formType, setFormType] = useState('login'); // 'login' or 'signup'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [section, setSection] = useState('');

  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState(null);
  
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

  const debouncedUsername = useDebounce(username, 300);
  const debouncedPassword = useDebounce(password, 300);

  const handleSignUp = (e) => {
    e.preventDefault();
    const newUser = {
      firstName,
      lastName,
      section,
      username: debouncedUsername,
      password: debouncedPassword,
    };
    dispatch({ type: 'SIGN_UP', payload: newUser });
    setFormType('login'); // Switch to login form after signing up
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = state.users.find(user => user.username === debouncedUsername && user.password === debouncedPassword);
    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
    } else {
      alert('Invalid credentials');
    }
  };

  const handleOperation = useCallback((op) => {
    setOperation(op);
    const num1Float = parseFloat(num1);
    const num2Float = parseFloat(num2);
    let res;

    switch (op) {
      case 'Addition':
        res = num1Float + num2Float;
        break;
      case 'Subtraction':
        res = num1Float - num2Float;
        break;
      case 'Multiplication':
        res = num1Float * num2Float;
        break;
      case 'Division':
        res = num2Float !== 0 ? num1Float / num2Float : 'Error: Division by 0';
        break;
      default:
        res = null;
    }

    setResult(res);
  }, [num1, num2]);

  // Toggle dark/light mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <UserContext.Provider value={state}>
      <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <button onClick={toggleDarkMode}>
          Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
        </button>
        
        {state.loggedInUser ? (
          <div>
            <h2>Welcome, {state.loggedInUser.firstName} from {state.loggedInUser.section}!</h2>
          </div>
        ) : (
          <div>
            <h1>{formType === 'login' ? 'Login' : 'Sign Up'} Form</h1>
            <form onSubmit={formType === 'login' ? handleLogin : handleSignUp}>
              {formType === 'signup' && (
                <>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Section"
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    required
                  />
                </>
              )}
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">{formType === 'login' ? 'Login' : 'Sign Up'}</button>
            </form>
            <button onClick={() => setFormType(formType === 'login' ? 'signup' : 'login')}>
              {formType === 'login' ? 'Need an account? Sign Up' : 'Already have an account? Login'}
            </button>
          </div>
        )}

        {state.loggedInUser && (
          <>
            <h1>Simple Calculator</h1>
            <div>
              <input
                type="number"
                placeholder="Number 1"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
              />
              <input
                type="number"
                placeholder="Number 2"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
              />
            </div>
            <div>
              <button onClick={() => handleOperation('Addition')}>Addition</button>
              <button onClick={() => handleOperation('Subtraction')}>Subtraction</button>
              <button onClick={() => handleOperation('Multiplication')}>Multiplication</button>
              <button onClick={() => handleOperation('Division')}>Division</button>
            </div>
            {result !== null && <h3>Result: {result}</h3>}
          </>
        )}
      </div>
    </UserContext.Provider>
  );
}

export default App;

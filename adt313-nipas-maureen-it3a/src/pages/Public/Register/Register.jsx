import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [status, setStatus] = useState('idle');
  
  const navigate = useNavigate(); 

  const handleRegister = async () => {
    const data = { email, password, firstName, middleName, lastName, contactNo };
    setStatus('loading');

    try {
      const response = await axios.post('/admin/register', data);
      console.log(response.data);
      setStatus('idle');
      alert('You are now registered! You may now log in.');
      navigate('/');
      
    } catch (error) {
      console.error(error);
      setStatus('idle');
    }
  };

  return (
    <div className='Register'>
      <h3>Register</h3>
      <form>
        <div className='form-group'>
          <label>Email:</label>
          <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='form-group'>
          <label>Password:</label>
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className='form-group'>
          <label>First Name:</label>
          <input type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className='form-group'>
          <label>Middle Name:</label>
          <input type='text' value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
        </div>
        <div className='form-group'>
          <label>Last Name:</label>
          <input type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className='form-group'>
          <label>Contact Number:</label>
          <input type='text' value={contactNo} onChange={(e) => setContactNo(e.target.value)} />
        </div>
        <button type='button' onClick={handleRegister} disabled={status === 'loading'}>
          {status === 'idle' ? 'Register' : 'Loading...'}
        </button>
      </form>
    </div>
  );
}

export default Register;

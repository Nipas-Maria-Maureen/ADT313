import logo from './logo.svg';
import './App.css';
import User from './User/User';
import Name from './Name/Name';
import Section from './Section/Section';
import Description from './Description/Description';


function App(){
  const userInformation = {
    firstName: 'Maureen',
    lastName: 'Nipas',
    section: 'IT-3A',
    description: 'Hello'
  }  
  return (
    <div className="App">
    <Name firstName={userInformation.firstName} lastName={userInformation.lastName} />
    <Section  section={userInformation.section} />
    <Description  description={userInformation.description} />
    </div>
  );
  }

export default App;

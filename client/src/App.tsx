import './App.css';
import Header from './components/main/header/Header.tsx';
// import Card from './components/UI/cards/Card.tsx';
import { Dashboard } from './components/main/dashboard/Dashboard.tsx';

import { Form } from './components/views/forms/Form.tsx';

function App() {
  return (
    <>
      <Dashboard>
        <Header />
        {/* <Card /> */}
        <Form type="signup" />
        <Header />
      </Dashboard>
    </>
  );
}

export default App;

import { BrowserRouter as Router, } from 'react-router-dom';
import NavBar from './components/NavBar';
import Routing from './configs/Routing';

function App() {
  return (
    <Router>
      <Routing />
      <NavBar />
    </Router>
  );
}

export default App;

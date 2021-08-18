import { Admin, Home } from "./pages"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SocketContext, socket } from "./context/socket";
import './App.css';

function App() {
  return (
    <SocketContext.Provider value={socket}>
    <div className="App">
      <Router>
        <Switch>
          <Route path="/admin"><Admin /></Route>
          <Route path="/"><Home /></Route>
        </Switch>
      </Router>
      </div>
    </SocketContext.Provider>
  );
}

export default App;

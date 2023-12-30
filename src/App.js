import logo from './logo.svg';

import Box from './box';
import Form from './form';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Charts from './Component/Charts';
import Settings from './Component/Settings';
import Contact from './Component/Contact';
import dashboard from './Component/Dashboard';
import store from './reducer/store';
import { Provider } from 'react-redux';
import Viewcard from './Component/Viewcard';
function App() {
  return (
    <Router>
      <div>
        <Provider store={store}>
          <Switch>
            <Route exact path="/" component={Form} />
            <Route path="/dashboard" component={Box} />
            <Route path="/contact" component={Contact} />
            <Route path="/settings" component={Settings} />
            <Route path="/charts" component={Charts} />
            <Route path="/back" component={dashboard} />
            <Route path="/viewcard/:viewcardId" component={Viewcard} />
          </Switch>
        </Provider>
      </div>
    </Router>
  );
}

export default App;

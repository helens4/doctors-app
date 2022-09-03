import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client';
import './index.css';
import './layout.css';
import App from './App';
import store from './redux/store';
import 'antd/dist/antd.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);


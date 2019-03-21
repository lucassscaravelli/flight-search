import React from 'react';
import ReactDOM from 'react-dom';
import { withRoutes } from './Routes';
import { SharedLayout } from './Layout';

import './index.less';

const App = () => withRoutes(SharedLayout);

ReactDOM.render(<App />, document.getElementById('app'));

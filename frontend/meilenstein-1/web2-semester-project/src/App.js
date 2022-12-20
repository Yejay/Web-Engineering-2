import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import TopMenu from './react/components/TopMenu';
import LandingPage from './react/components/LandingPage';
import PrivatePage from './react/components/PrivatePage';

const mapStateToProps = state => {
  return state
}

class App extends Component {
  render() {
    const user = this.props.user;
    let workspace;
    if (user) {
      console.log(JSON.stringify({ user }));
      workspace = <PrivatePage />
    } else {
      console.log(JSON.stringify({ user }));
      workspace = <LandingPage />
    }
    return (
      <div className="App">
        <TopMenu />
        {workspace}
      </div>
    );
  };
}

export default connect(mapStateToProps)(App);

// import React from 'react';
// import { useSelector } from 'react-redux';
// import TopMenu from './react/components/TopMenu';
// import LandingPage from './react/components/LandingPage';
// import PrivatePage from './react/components/PrivatePage';

// const App = () => {
// 	const user = useSelector((state) => state.user);
// 	const workspace = user ? <PrivatePage /> : <LandingPage />;

// 	return (
// 		<div className='App'>
// 			<TopMenu />
// 			{workspace}
// 		</div>
// 	);
// };

// export default App;

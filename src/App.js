import React, { Component } from 'react';
import { TinyButton as ScrollUpButton } from "react-scroll-up-button";

import './App.css';
import { Header, Footer, SelectionTabs } from './components';

class App extends Component {


  render() {
    return (
      <div className="container">
        <Header />
        <SelectionTabs />
        <Footer />
        <ScrollUpButton />
      </div>
    );
  }
}

export default App;

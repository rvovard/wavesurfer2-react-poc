import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './App.css';

import MediaElementExample from './WaveSurverExamples/MediaElementExample';
import PreRecordedPeaksExample from './WaveSurverExamples/PreRecordedPeaksExample';
import SimpleExample from './WaveSurverExamples/SimpleExample';
import ZoomExample from './WaveSurverExamples/ZoomExample';

function Home() {
  return (
    <h2>Using WaveSurfer v2 with React POC</h2>
  );
}

function InProgress() {
  return (
    <h2>Test coming soon</h2>
  );
}

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li>
                Using WaveSurfer with React
                <ul>
                  <li><Link to="/simple">Simple example</Link></li>
                  <li><Link to="/prerecordedpeaks">Pre-recorded waveform peaks</Link></li>
                  <li><Link to="/zoom">Zoom</Link></li>
                  <li>Regions</li>
                  <li>96kHz</li>
                </ul>
              </li>
              <li>
                Technical tests
                <ul>
                  <li><Link to="/mediaelement">MediaElement Backend</Link></li>
                  <li>Pre-recorded spectrogram</li>
                </ul>
              </li>
            </ul>
          </nav>
          <main>
            <Route exact path="/" component={Home} />
            <Route path="/inprogress" component={InProgress} />
            <Route path="/simple" component={SimpleExample} />
            <Route path="/prerecordedpeaks" component={PreRecordedPeaksExample} />
            <Route path="/zoom" component={ZoomExample} />
            <Route path="/mediaelement" component={MediaElementExample} />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;

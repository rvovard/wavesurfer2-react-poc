import React, { Component } from 'react';

import WaveSurfer from 'wavesurfer.js';
import SpectrogramPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.spectrogram.js';

class SimpleExample extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
    };
  }

  componentDidMount() {
    this.wavesurfer = WaveSurfer.create({
      barWidth: 1,
      cursorWidth: 1,
      container: '#waveform',
      height: 100,
      progressColor: '#4a74a5',
      responsive: true,
      waveColor: '#ccc',
      cursorColor: '#4a74a5',
      plugins: [
        SpectrogramPlugin.create({
          container: '#spectrogram',
          labels: true,
          fftSamples: 512,
        }),
      ],
    });

    this.wavesurfer.load("./test.m4a");

    // Shows how to subscribe to wavesurfer events
    this.wavesurfer.on('play', () => this.setState({'isPlaying': true}));
    this.wavesurfer.on('pause', () => this.setState({'isPlaying': false}));
    this.wavesurfer.on('finish', () => this.setState({'isPlaying': false}));
  }

  componentWillUnmount() {
    // Unsubscribe all events
    this.wavesurfer.unAll();
  }

  playIt = () => {
    this.wavesurfer.playPause();
  };

  render() {
    const playStatus = this.state.isPlaying ? 'Pause' : 'Play';

    return (
      <div>
        <h2>Simple example</h2>

        <button onClick={this.playIt}>{playStatus}</button>
        <div id="waveform" />
        <div id="spectrogram" />

        <p>Simple use case for WaveSurfer library with spectrogram plugin.</p>
      </div>
    );
  }
}

export default SimpleExample;

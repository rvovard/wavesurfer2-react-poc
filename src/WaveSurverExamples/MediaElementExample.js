import React, { Component } from 'react';

import WaveSurfer from 'wavesurfer.js';
import SpectrogramPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.spectrogram.js';

class MediaElementExample extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
    };
  }

  componentDidMount() {
    const aud = document.querySelector('#audio');

    this.wavesurfer = WaveSurfer.create({
      barWidth: 1,
      cursorWidth: 1,
      container: '#waveform',
      backend: 'MediaElement',
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
          deferInit: true, // Prevents spectrogram not loading because of unloaded buffer
        }),
      ],
    });

    this.wavesurfer.load(aud);
    // Prevents spectrogram not loading because of unloaded buffer
    this.wavesurfer.on('waveform-ready', () => this.wavesurfer.initPlugin('spectrogram'));

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
        <h2>MediaElement backend</h2>

        <button onClick={this.playIt}>{playStatus}</button>
        <div id="waveform" />
        <div id="spectrogram" />
        <audio
          id="audio"
          preload="auto"
          src="../test.m4a"
        />

        <p>
          Using WaveSurfer with the MediaElement backend.<br />
          The WS component is plugged on a <code>audio</code> HTML tag which handles the audio file loading.
        </p>
      </div>
    );
  }
}

export default MediaElementExample;

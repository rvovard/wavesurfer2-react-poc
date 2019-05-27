import React, { Component } from 'react';

import WaveSurfer from 'wavesurfer.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.js';
import SpectrogramPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.spectrogram.js';

class ZoomExample extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      zoomLvl: 5,
    };

    this.zoom = this.zoom.bind(this);
    this.playIt = this.playIt.bind(this);
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
//      scrollParent: true,
      plugins: [
        SpectrogramPlugin.create({
          container: '#spectrogram',
          labels: true,
          fftSamples: 512,
          deferInit: true,
        }),
        TimelinePlugin.create({
          container: '#timeline',
        }),
      ],
    });

    this.wavesurfer.load(aud);
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

  playIt() {
    this.wavesurfer.playPause();
  };

  zoom(event) {
    const newZoomLvl = Number(event.target.value);
    this.wavesurfer.zoom(newZoomLvl);
    this.setState({zoomLvl: newZoomLvl});
  }

  render() {
    const playStatus = this.state.isPlaying ? 'Pause' : 'Play';

    return (
      <div>
        <h2>[Work still in progress] Zoom example</h2>

        <button onClick={this.playIt}>{playStatus}</button>
        <p className="zoom">
          Zoom : -
          <input type="range" min="5" max="20" step="1"
            value={this.state.zoomLvl} onChange={this.zoom}
          ></input>
          +
        </p>
        <div id="waveform" />
        <div id="timeline" />
        <div id="spectrogram" />
        <audio
          id="audio"
          preload="auto"
          src="../test.m4a"
        />

        <p>
          Using zoom on waveform.<br />
          Still in progress: applying waveform zoom on spectrogram (maybe with the <code>scrollParent</code> option).<br />
          <code>Timeline</code> plugin has been added both for testing it and to have a better view of the zoom process.
        </p>
      </div>
    );
  }
}

export default ZoomExample;

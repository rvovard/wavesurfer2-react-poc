import React, { Component } from 'react';

import WaveSurfer from 'wavesurfer.js';
import SpectrogramPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.spectrogram.js';

class PreRecordedPeaksExample extends Component {

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
      forceDecode: true,
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
          deferInit: true,
        }),
      ],
    });

    // Peaks
    const peaks = [
      0.0218, 0.0183, 0.0165, 0.0198, 0.2137, 0.2888, 0.2313, 0.15, 0.2542, 0.2538, 0.2358, 0.1195, 0.1591, 0.2599,
      0.2742, 0.1447, 0.2328, 0.1878, 0.1988, 0.1645, 0.1218, 0.2005, 0.2828, 0.2051, 0.1664, 0.1181, 0.1621, 0.2966,
      0.189, 0.246, 0.2445, 0.1621, 0.1618, 0.189, 0.2354, 0.1561, 0.1638, 0.2799, 0.0923, 0.1659, 0.1675, 0.1268,
      0.0984, 0.0997, 0.1248, 0.1495, 0.1431, 0.1236, 0.1755, 0.1183, 0.1349, 0.1018, 0.1109, 0.1833, 0.1813, 0.1422,
      0.0961, 0.1191, 0.0791, 0.0631, 0.0315, 0.0157, 0.0166, 0.0108
    ];

    this.wavesurfer.load(aud, peaks);
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
        <h2>Pre-recorded waveform peaks</h2>

        <button onClick={this.playIt}>{playStatus}</button>
        <div id="waveform" />
        <div id="spectrogram" />
        <audio
          id="audio"
          preload="auto"
          src="../test.m4a"
        />

        <p>
          In this case, we use the pre-recorded peaks loading function (only for waveform, not for the spectrogram).<br />
          Peaks data is fake, only used for test.<br />
          This features allows to play the audio file without having to wait for the waveform computation. One the computation is done, WaveSurfer redraws the waveform (thanks to <code>forceDecode: true</code> parameter).<br />
          WaveSurfer enforces the use of MediaElement backend for this use case (which is acceptable).<br />
          More about this on <a href="https://wavesurfer-js.org/example/audio-element/" title="Go to the dedicated page on WaveSurfer website">Media Element Fallback Example</a> from WaveSurfer website.
        </p>
      </div>
    );
  }
}

export default PreRecordedPeaksExample;

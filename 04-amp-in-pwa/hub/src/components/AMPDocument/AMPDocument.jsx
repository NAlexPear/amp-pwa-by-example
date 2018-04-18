import React, { Component } from 'react';

class AMPDocument extends Component {
  constructor(props) {
    super(props);

    this.ampReadyPromise = new Promise((resolve) => {
      (window.AMP = window.AMP || []).push(resolve);
    });
    this.container = null;
    this.request = null;
    this.shadowAmp = null;
    this.shadowRoot = null;
  }

  componentDidMount() {
    const { src } = this.props;

    this.container.addEventListener('click', this.onClick);
    this.fetchAndAttachAmpDoc(src);
  }

  componentWillUnmount() {
    this.closeShadowAmpDoc();
    this.container.removeEventListener('click', this.onClick);

    if (this.request) {
      this.request = null;
    }
  }

  componentWillReceiveProps({ src }) {
    this.fetchAndAttachAmpDoc(src);
  }

  render() {
    return (
      <div className='amp-container' ref={ (ref) => { this.container = ref; } } />
    );
  }

  async fetchAndAttachAmpDoc(url) {
    const doc = await fetch(url);
    const amp = await this.ampReadyPromise;
    const oldShadowRoot = this.shadowRoot;

    this.shadowRoot = document.createElement('div');

    if (oldShadowRoot) {
      this.container.replaceChild(this.shadowRoot, oldShadowRoot);
    } else {
      this.container.appendChild(this.shadowRoot);
    }

    // Attach the shadow document to the new shadow root.
    this.shadowAmp = amp.attachShadowDoc(this.shadowRoot, doc, url);
  }

  closeShadowAmpDoc() {
    if (typeof this.shadowAmp.close === 'function') {
      this.shadowAmp.close();
    }
  }
}

export default AMPDocument;

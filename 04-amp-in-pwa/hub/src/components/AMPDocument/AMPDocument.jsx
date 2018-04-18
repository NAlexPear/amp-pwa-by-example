import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

function onClick(event) {
  const { history } = this.props;
  const { target } = event;

  if (target.tagName === 'a') {
    const { href } = target;

    event.preventDefault();

    history.push(href);
  }
}

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
    this.onClick = onClick.bind(this);
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

  fetchAmpDoc(url) {
    // unfortunately fetch() does not support retrieving documents,
    // so we have to resort to good old XMLHttpRequest.
    const xhr = new XMLHttpRequest();

    this.request = new Promise((resolve) => {
      xhr.open('GET', url, true);
      xhr.responseType = 'document';
      xhr.setRequestHeader('Accept', 'text/html');
      xhr.onload = () => {
        resolve(xhr.responseXML);
      };
      xhr.send();
    });

    return this.request;
  }

  async fetchAndAttachAmpDoc(url) {
    const doc = await this.fetchAmpDoc(url);
    const amp = await this.ampReadyPromise;
    const oldShadowRoot = this.shadowRoot;

    this.shadowRoot = document.createElement('div');

    if (oldShadowRoot) {
      this.container.replaceChild(this.shadowRoot, oldShadowRoot);
    } else {
      this.container.appendChild(this.shadowRoot);
    }

    this.shadowAmp = amp.attachShadowDoc(this.shadowRoot, doc, url);
  }

  closeShadowAmpDoc() {
    if (typeof this.shadowAmp.close === 'function') {
      this.shadowAmp.close();
    }
  }
}

export default withRouter(AMPDocument);

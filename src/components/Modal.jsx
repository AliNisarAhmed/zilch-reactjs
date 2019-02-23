
import React from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal');

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
    this.el.setAttribute('tabindex', 0);
  }
  
  componentDidMount() {
    modalRoot.appendChild(this.el);
    this.el.focus();
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return createPortal(this.props.children, this.el);
  }
}
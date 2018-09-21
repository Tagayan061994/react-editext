import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'

export default class EdiText extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      value: this.props.value || '',
      savedValue: ''
    }
  }

  onInputChange = e => {
    this.setState({
      value: e.target.value
    })
  }

  onCancel = () => {
    this.setState(
      {
        editing: false,
        value: this.state.savedValue || this.props.value
      }, () => this.props.onCancel(this.state.value)
    )
  }

  onSave = () => {
    this.setState(
      {
        editing: false,
        savedValue: this.state.value
      }, () => this.props.onSave(this.state.savedValue)
    )
  }

  render() {
    if (this.state.editing) {
      let inputElem
      if (this.props.type === 'textarea') {
        inputElem = (
          <textarea
            className={this.props.inputClassName}
            value={this.state.value}
            onChange={this.onInputChange}
            autoFocus={this.state.editing}
            rows={5}
          />
        )
      } else {
        inputElem = (
          <input
            type={this.props.type}
            className={this.props.inputClassName}
            value={this.state.value}
            onChange={this.onInputChange}
            autoFocus={this.state.editing}
          />
        )
      }
      return (
        <div className={this.props.containerClassName}>
          {inputElem}
          <div className={styles['action-buttons-container']}>
            <button
              className={this.props.saveButtonClassName}
              onClick={this.onSave}
            >
              {this.props.saveButtonText}
            </button>
            <button
              className={this.props.cancelButtonClassName}
              onClick={this.onCancel}
            >
              {this.props.cancelButtonText}
            </button>
          </div>
        </div>
      )
    }
    const elm = this.props.children
      ? { ...this.props.children, props: { children: this.state.value } }
      : this.state.value
    return (
      <div className={this.props.containerClassName}>
        {elm}
        <div className={styles['action-buttons-container']}>
          <button
            className={this.props.editButtonClassName}
            onClick={() => this.setState({ editing: true })}
          >
            {this.props.editButtonText}
          </button>
        </div>
      </div>
    )
  }
}

EdiText.defaultProps = {
  value: '',
  type: 'text',
  onCancel: () => {},
  cancelButtonText: '',
  saveButtonText: '',
  editButtonText: '',
  saveButtonClassName: styles['editext-save-button'],
  cancelButtonClassName: styles['editext-cancel-button'],
  editButtonClassName: styles['editext-edit-button'],
  inputClassName: styles['editext-input'],
  containerClassName: styles['editext-editing-container']
}

EdiText.propTypes = {
  // Default children prop for component
  children: PropTypes.node,
  // Required props
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  // Events
  onCancel: PropTypes.func,
  onSave: PropTypes.func.isRequired,
  // classNames
  inputClassName: PropTypes.string,
  saveButtonClassName: PropTypes.string,
  containerClassName: PropTypes.string,
  editButtonClassName: PropTypes.string,
  cancelButtonClassName: PropTypes.string,
  // Custom Button Texts
  cancelButtonText: PropTypes.string,
  saveButtonText: PropTypes.string,
  editButtonText: PropTypes.string
}
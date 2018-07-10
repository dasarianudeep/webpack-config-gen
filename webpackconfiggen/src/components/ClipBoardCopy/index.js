import React, { Component } from "react";
import cx from "classnames";
import ClipboardJS from "clipboard";
import "./style.css";

class ClipBoardCopy extends Component {

    componentDidMount() {
        const clipboard = new ClipboardJS('.btn__copy');
        clipboard.on('success', (e) => e.clearSelection());
    }
    render() {
        const classes = cx('btn__copy', this.props.className);
        return (
            <button className={classes} id={this.props.id} disabled={this.props.label === 'COPIED!'} data-clipboard-target={this.props.target} onClick={this.props.handleCopyButtonClick}>{this.props.label}</button>
        )
    }
}

export default ClipBoardCopy;

import React from 'react';
import AppContext from '../context';

export default class Window extends React.Component {
    static contextType = AppContext;

    constructor(props) {
        super(props);
        const width = window.innerWidth/2;
        const height = width*9/16;
        const left = Math.random()*(window.innerWidth - width);
        const top = Math.random()*(window.innerHeight - height);
        const zIndex = props.process.depth;
        this.state = {
            style: {
                left, top, width, height, zIndex
            },
            offset: {
                x: 0,
                y: 0
            },
            maximized: true
        }
    }
    
    focus = () => {
        this.context.focusWindow(this.props.process);
    }
    
    clearDragGhost = (e) => {
        this.focus();
        e.dataTransfer.setDragImage(new Image(), 0, 0);
    }
    
    onMoveStart = (e) => {
        this.clearDragGhost(e);
        let x = e.clientX - this.state.style.left;
        let y = e.clientY - this.state.style.top;
        if (this.state.maximized) {
            y = 0;
        }
        this.setState({
            offset: {
                x, y
            },
            maximized: false
        })
    }
    
    onMove = (e) => {
        if (e.clientX === 0 && e.clientY === 0) {
            return;
        }
        const x = e.clientX - this.state.offset.x;
        const y = e.clientY - this.state.offset.y;
        this.setState(s => ({
            style: {
                ...s.style,
                left: x,
                top: y
            }
        }));
    }
    
    onResize = (e) => {
        if (e.clientX === 0 && e.clientY === 0) {
            return;
        }
        const width = e.clientX - this.state.style.left;
        const height = e.clientY - this.state.style.top;
        this.setState(s => ({
            style: {
                ...s.style,
                width: width,
                height: height
            }
        }));
    }
    
    minimize = (e) => {
        this.context.minimizeWindow(this.props.process);
        e.stopPropagation();
    }
    
    maximize = (e) => {
        this.setState(s => ({
            maximized: !s.maximized
        }))
    }

    close = (e) => {
        this.context.closeWindow(this.props.process);
    }
    
    componentWillReceiveProps(props) {
        this.setState(s => ({
            style: {
                ...s.style,
                zIndex: props.process.depth
            }
        }))
    }
    
    render() {
        const { process } = this.props;
        const Content = require(`./windows/${process.component}`).default;
        return <div
                className={`window ${this.state.maximized ? 'maximized' : ''}`}
                style={this.state.style}
                onClick={this.focus}>
            <div className={`window-caption bg-${process.color}`}
                    draggable
                    onDoubleClick={this.maximize}
                    onDragStart={this.onMoveStart}
                    onDrag={this.onMove}>
                <span className={`icon mif-${process.icon}`}></span>
                <span className="title">{process.name}</span>
                <div className="buttons">
                    <span className="btn-min" onClick={this.minimize}></span>
                    <span className="btn-max" onClick={this.maximize}></span>
                    <span className="btn-close" onClick={this.close}></span>
                </div>
            </div>
            <div className="window-content">
                <Content window={process}/>
            </div>
            <span className="resize-element"
                    draggable
                    onDragStart={this.clearDragGhost}
                    onDrag={this.onResize}></span>
        </div>
    }
}
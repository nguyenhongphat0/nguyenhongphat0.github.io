import React from 'react';
import Slider from 'react-slick';
import { Scrollbars } from 'react-custom-scrollbars';

export default class Showcase extends React.Component {

    render() {
        return <div className="showcase bg-dark fg-white">
            <div className="banner">
                <Slider arrows={false} autoplay autoplaySpeed={3000}>
                    { this.props.window.banners.map((banner, i) => 
                        <div key={i}>
                            <img src={banner} alt=""/>
                        </div>)
                    }
                </Slider>
            </div>
            <div className="info">
                <button className={`logo tile bg-${this.props.window.color}`} title={this.props.window.name}>
                    <span className={`tile-icon fg-white mif-icon mif-4x mif-${this.props.window.icon}`}></span>
                </button>
            </div>
            <div className="meta">
                <h1 title="Project name">{this.props.window.name}</h1>
                { this.props.window.link && <a href={this.props.window.link} target="_blank" title="Live preview" className="link mif-icon mif-2x mif-link"></a> }
                <div className="techs" title="Used technologies">
                    { this.props.window.techs.map(tech => <span key={tech} className={tech.toLowerCase()}>{tech}</span>) }
                </div>
            </div>
            <div className="description bg-dark" title="Description">
                <Scrollbars>
                    <h2>Description</h2>
                    <p>
                        {this.props.window.description}
                    </p>
                </Scrollbars>
            </div>
        </div>
    }
}
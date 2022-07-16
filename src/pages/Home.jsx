import React, { Component } from 'react'
import '../styles/home.css'
import computer from '../assets/image/undraw_Code_thinking_re_gka2.png'

export class Home extends Component {
    render() {
        return (
            <div className="container ">
                <div className="row divRow">
                    <div className="col-md-6 col-sm col-lg-6">
                        <h1 className="coverH1">BUILD A </h1>
                        <h2 className="coverH2">ROCKET STORY</h2>
                        <p className="coverP">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus molestias cumque at, impedit eum corrupti libero ipsam placeat, nulla, maiores totam qui ea distinctio. Velit, distinctio. Iste iusto deserunt esse?</p>
                        <input className="coverInput" type="button" value="Get Started"></input>
                    </div>
                    <div className="col-md-6 col-sm col-lg-6">
                        <img className="img" src={computer} alt=""></img>
                    </div>
                </div>
                <div className="row divAboutUs">
                    <div className="col-md-12 col-sm-2 col-lg-12">
                        <h1 className="aboutUsTitle">ABOUT US</h1>
                    </div>
                    <div className="col-md-12 col-sm-2 col-lg-12">
                        <p className="coverP">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
export default Home;


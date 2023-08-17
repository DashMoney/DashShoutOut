import React from "react";
//import Container from 'react-bootstrap/Container';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import CreateMessageButton from "./CreateMessageButton";
import TipButton from "./TipButton";
//import TopUpButton from "./TopUpButton";
import DirectMessageButton from "./DirectMessageButton";

import "./BottomNav.css";

class BottomNav extends React.Component {
  render() {
    return (
      <>
        <Navbar
          
          className="bottomNav"
          bg={this.props.mode}
          variant={this.props.mode}
          fixed="bottom"
        >
          
          <Nav className="one-level-nav">
            <CreateMessageButton
              isLoadingRefresh={this.props.isLoadingRefresh}
              mode={this.props.mode}
              showModal={this.props.showModal}
            />

            <TipButton
              isLoadingRefresh={this.props.isLoadingRefresh}
              mode={this.props.mode}
              showModal={this.props.showModal}
            />

            <DirectMessageButton
              isLoadingRefresh={this.props.isLoadingRefresh}
              mode={this.props.mode}
              showModal={this.props.showModal}
            />

            {/* <TopUpButton
            isLoadingRefresh={this.props.isLoadingRefresh}
            //This needs all the props/state to facilitate the topup function so probably - mnemonic, identity, testnet, skipsync, etc
             identityInfo = {this.props.identityInfo}
              mode={this.props.mode}
              showModal={this.props.showModal}
            /> */}
          </Nav>
        </Navbar>
      </>
    );
  }
}
export default BottomNav;

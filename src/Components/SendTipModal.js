import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from 'react-bootstrap/CloseButton';

class SendTipModal extends React.Component {

  handleCloseClick = () => {
    this.props.hideModal();
  };

  handleTipping = () => {
    this.props.sendATip();
    this.props.closeExpandedNavs();
    this.handleCloseClick();
  }


  render() {
    let modalBkg = "";
    let closeButtonColor;
    
    if(this.props.mode === "primary"){
      modalBkg = "modal-backcolor-primary";
      closeButtonColor = <CloseButton onClick={this.handleCloseClick}/>
    }else{
      modalBkg = "modal-backcolor-dark";
      closeButtonColor = <CloseButton onClick={this.handleCloseClick} variant="white"/>
    }
    return (
      <>
        <Modal show={this.props.isModalShowing}
        contentClassName={modalBkg}>
        <Modal.Header >
          <Modal.Title>Send a Tip</Modal.Title>
          {closeButtonColor}
        </Modal.Header>
        <Modal.Body>
          <p>Once, v0.25 JS SDK is available, you will be able to send a tips to others with your credits.</p>
        </Modal.Body>

        <Modal.Footer>
        {/* <Button variant="primary" onClick={this.handleTipping}>
              Log Out
            </Button> */}
        </Modal.Footer>
      </Modal>
      </> 
    );
  }
}

export default SendTipModal;

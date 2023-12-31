import React from "react";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";


class DirectMessageButton extends React.Component {

  render(){
    let buttonColor;
    if(this.props.mode==='dark'){
      buttonColor='primary';
    }else{
      buttonColor='secondary'
    }

    return(
      <Nav.Item>
        <Nav.Link>
          {this.props.isLoadingRefresh ?
          <Button
          variant={buttonColor}
          disabled
          >
          <div className="ms-2 me-auto">
            <div className="fw-bold">Direct</div>
            <Badge bg="light" text="dark" pill>
            Message
            </Badge>
            </div>
          </Button>
            :
          <Button
            variant={buttonColor}
            onClick={() => {
              this.props.showModal('NewDMModal');
            }}
            >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Direct</div>
              <Badge bg="light" text="dark" pill>
              Message
              </Badge>
            </div>
          </Button>
          }
        </Nav.Link>
        </Nav.Item>
        
    );
  }
}

export default DirectMessageButton;

import React from "react";
import Spinner from "react-bootstrap/Spinner";
import Nav from "react-bootstrap/Nav";

import Badge from "react-bootstrap/Badge";

import Alert from "react-bootstrap/Alert";

import MessagespageEveryone from "./MessagesPageEveryone";
import MessagespageForyou from "./MessagesPageForyou";

import "./MessagesPage.css";

class MessagesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      whichTab: "Everyone",
    };
  }

  
  // isLoadingEveryone
  // isLoadingForYou

  handleTab = (eventKey) => {
    if (eventKey === "For you")
      this.setState({
        whichTab: "For you",
      });
    else {
      this.setState({
        whichTab: "Everyone",
      });
    }
  };

  render() {
    return (
      <>
        {!this.props.isLoading &&
        this.props.identity !== "No Identity" &&
        this.props.uniqueName !== "Er" ? (
          <>
            <Nav
              fill
              variant="pills"
              defaultActiveKey={this.state.whichTab}
              onSelect={(eventKey) => this.handleTab(eventKey)}
            >
              <Nav.Item>
                <Nav.Link eventKey="Everyone">
                  <b>Everyone</b>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="For you">
                  <b>For you</b>
                </Nav.Link>
              </Nav.Item>
            </Nav>


{this.props.identityInfo === "" ||
            this.props.identityInfo.balance >= 450000000 ? (
              <></>
            ) : (
              <div className="id-line"
              onClick={() => this.props.showModal("TopUpIdentityModal")}>
                <>
                  <h5>
                    <Badge className="paddingBadge" bg="danger">
                      Platform Credits : Low!
                    </Badge>
                  </h5>
                </>
                <>
                  <p></p>
                  <h5>
                    <Badge className="paddingBadge" bg="danger" pill>
                      {this.props.identityInfo.balance}
                    </Badge>
                  </h5>
                </>
              </div>
            )}

            {/* OLD WAY - Full Wallet Not Connected
            
            {this.props.identityInfo === "" ||
            this.props.identityInfo.balance >= 450000000 ? (
              <></>
            ) : (
              <div className="id-line">
                <>
                  <h5>
                    <Badge className="paddingBadge" bg="danger">
                      Platform Credits : Low!
                    </Badge>
                  </h5>
                </>
                <>
                  <p></p>
                  <h5>
                    <Badge className="paddingBadge" bg="danger" pill>
                      {this.props.identityInfo.balance}
                    </Badge>
                  </h5>
                </>
              </div>
            )} */}

            {/* {this.props.identityInfo === "" ||
            this.props.identityInfo.balance >= 450000000 ? (
              <></>
            ) : (
              <>
                <h5>
                  <Badge className="paddingBadge" bg="primary">
                    Please visit DGN or DGM to TopUp your credits.
                  </Badge>
                </h5>
              </>
            )} */}

            {this.props.errorToDisplay ? (
              <>
                <p></p>
                <Alert variant="danger" dismissible>
                  <Alert.Heading>Message Failed</Alert.Heading>
                  <p>
                    You either have insufficient credits or have run into a
                    platform error.
                  </p>
                </Alert>
              </>
            ) : (
              <></>
            )}

            {this.props.isLoadingEveryone &&
            this.state.whichTab === "Everyone" ? (
              <>
                <p></p>
                <div id="spinner">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              </>
            ) : (
              <></>
            )}

            {this.props.isLoadingForYou && this.state.whichTab === "For you" ? (
              <>
                <p></p>
                <div id="spinner">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}

        {this.props.isLoading ? (
          <>
            <p></p>
            <div id="spinner">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          </>
        ) : (
          <></>
        )}

        {this.props.isLoadingRefresh ? (
          <>
            <p></p>
            <div id="spinner">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          </>
        ) : (
          <></>
        )}

        {this.props.identity === "No Identity" ? (
          <div id="bodytext">
            <p>
              There is no Identity for this Mnemonic, please go the{" "}
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://dashgetnames.com/"
              >
                DashGetNames.com
              </a>{" "}
              and register an Identity for your Mnemonic.
            </p>
            <p>Or Testnet Platform maybe having difficulties...</p>
          </div>
        ) : (
          <></>
        )}

        {/* THIS IS THE START OF A SEPARATE SECTION APART FROM EVERYTHING ABOVE */}

        {this.props.uniqueName === "Er" ? (
          <div id="bodytext">
            <p>
              There is no Name for this Identity, please go to{" "}
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://dashgetnames.com/"
              >
                DashGetNames.com
              </a>{" "}
              and register an Name for your Identity.
            </p>
            <p>
              Or you may have run into a platform issue, just reload page and
              try again.
            </p>
          </div>
        ) : (
          <></>
        )}

        <div id="bodytext" className="footer">
          {!this.props.isLoadingEveryone &&
          this.state.whichTab === "Everyone" ? (
            <div className="d-grid gap-2">
              <MessagespageEveryone
                EveryoneThreads={this.props.EveryoneThreads}
                EveryoneThreadsNames={this.props.EveryoneThreadsNames}
                
                identity={this.props.identity}
                identityInfo={this.props.identityInfo}
                uniqueName={this.props.uniqueName}

                EveryoneMsgs={this.props.EveryoneMsgs}
                EveryoneNames={this.props.EveryoneNames}

                NewSOMsgs={this.props.NewSOMsgs}
              NewSOThreads={this.props.NewSOThreads}

                mode={this.props.mode}
                showModal={this.props.showModal}
                handleThread={this.props.handleThread}

              pushNewSOtoView={this.props.pushNewSOtoView}
              />
            </div>
          ) : (
            <></>
          )}

          {!this.props.isLoadingForYou && this.state.whichTab === "For you" ? (
            <div className="d-grid gap-2">
              <MessagespageForyou

                isLoadingForYou={this.props.isLoadingForYou}

                ByYouThreads={this.props.ByYouThreads}
                ByYouThreadsNames={this.props.ByYouThreadsNames}
                
                FromTagsThreads={this.props.FromTagsThreads}
                FromTagsThreadsNames={this.props.FromTagsThreadsNames}

                identity={this.props.identity}
                identityInfo={this.props.identityInfo}
                uniqueName={this.props.uniqueName}
          
                ByYouMsgs={this.props.ByYouMsgs}
                ByYouNames={this.props.ByYouNames}
                
                FromTagsMsgs={this.props.FromTagsMsgs}
                FromTagsNames={this.props.FromTagsNames}

                NewDMByYouThreads={this.props.NewDMByYouThreads}
                NewDMFromTagsMsgs={this.props.NewDMFromTagsMsgs}
                NewDMFromTagsThreads={this.props.NewDMFromTagsThreads}

                mode={this.props.mode}
                showModal={this.props.showModal}
                handleThread={this.props.handleThread}

                pushNewDMtoView={this.props.pushNewDMtoView}
              />
            </div>
          ) : (
            <></>
          )}

          {/* //Combined with "No Identity" and "Error removed from App.js"
           {this.props.identity === "Error" ? (
            <Alert variant="warning">
              Testnet Platform maybe having difficulties...
            </Alert>
          ) : (
            <></>
          )} */}
        </div>
      </>
    );
  }
}

export default MessagesPage;

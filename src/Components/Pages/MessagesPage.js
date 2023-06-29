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

  // dsoEveryoneMessages
  // dsoForyouMessages
  // isLoadingEveryone
  // isLoadingForyou

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

            {/* <div className="id-line">
          
            {this.props.identityInfo === "" ||
            this.props.identityInfo.balance >= 450000000 ? (
              <h5><Badge className="paddingBadge" bg="primary">
                Your Platform Credits
              </Badge>
              </h5>
            ) : (
              <h5>
              <Badge className="paddingBadge" bg="danger">
                Platform Credits : Low!
              </Badge>
              </h5>
            )}
          
          {this.props.identityInfo === "" ? (
            <h5>
              <Badge className="paddingBadge" bg="primary" pill>
                Loading..
              </Badge>
            </h5>
          ) : (
            <>
              {this.props.identityInfo.balance >= 450000000 ? (
                <h5>
                  <Badge className="paddingBadge" bg="primary" pill>
                    {this.props.identityInfo.balance}
                  </Badge>
                </h5>
              ) : (
                <h5>
                  <Badge className="paddingBadge" bg="danger" pill>
                    {this.props.identityInfo.balance}
                  </Badge>
                </h5>
              )}
            </>
          )}
        </div>

          {this.props.identityInfo === "" ||
          this.props.identityInfo.balance >= 450000000 ? (
            <></>
          ) : (
            <h5>
            <Badge className="paddingBadge" bg="primary">
              Please visit DGN or DGM to TopUp your credits.
            </Badge>
            </h5>
          )} */}


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
            )}


          {this.props.identityInfo === "" ||
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
          )}

{this.props.errorToDisplay ? (
              <>
                <p></p>
                <Alert variant="danger" dismissible>
                  <Alert.Heading>Message Failed</Alert.Heading>
                  <p>
                    You either have insufficient credits or have run into a platform error. Please TopUp credits on DashGetNames or DashGetPaid. Currently, this dapp is platform only so it does not include full wallet access to enable TopUp, but it is planned for future upgrade.
                  </p>
                </Alert>
              </>
            ) : (
              <></>
            )}



            {this.props.isLoadingEveryone && this.state.whichTab === "Everyone" ? (
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

{this.props.isLoadingForyou && this.state.whichTab === "For you" ? (
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
            Or you may have run into a platform issue, just reload page and try again.
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

                identityInfo={this.props.identityInfo}
                uniqueName={this.props.uniqueName}
                dsoEveryoneMessages={this.props.dsoEveryoneMessages}
                mode={this.props.mode}
              />
            </div>
          ) : (
            <></>
          )}

          {!this.props.isLoadingForyou &&
           this.state.whichTab === "For you" ? (
            <div className="d-grid gap-2">
              <MessagespageForyou
                identityInfo={this.props.identityInfo}
                uniqueName={this.props.uniqueName}
                dsoForyouMessages={this.props.dsoForyouMessages}
                mode={this.props.mode}
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

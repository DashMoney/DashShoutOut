import React from "react";
import Badge from "react-bootstrap/Badge";
import MsgForyou from "./MsgForyouv2";

class MessagespageForyou extends React.Component {
  // dsoForyouMessages

  render() {
    let d = Date.now();

    let tuples = this.props.dsoForyouMessages.map((tuple, index) => {
      return (
        <MsgForyou
          key={index}
          mode={this.props.mode}
          index={index}
          tuple={tuple}
          date={d}
          uniqueName={this.props.uniqueName}
        />
        // <MsgForyou
        // key={index}
        // mode={this.props.mode}
        // index={index}
        // tuple = {tuple}
        // date = {d}
        // uniqueName={this.props.uniqueName}
        // />
      );
    });

    return (
      <>
        <div className="id-line">
          <h5>
            {this.props.identityInfo === "" ||
            this.props.identityInfo.balance >= 450000000 ? (
              <Badge className="paddingBadge" bg="primary">
                Your Platform Credits
              </Badge>
            ) : (
              <Badge className="paddingBadge" bg="danger">
                Platform Credits : Low!
              </Badge>
            )}
          </h5>
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
          )}
        

        {this.props.dsoForyouMessages.length < 1 ? (
          <p>
            Greetings, once you send a message or someone tags you in a message,
            it will show up here.
          </p>
        ) : (
          <></>
        )}

        <div id="cardtext" className="footer">
          {tuples}
        </div>
      </>
    );
  }
}

export default MessagespageForyou;

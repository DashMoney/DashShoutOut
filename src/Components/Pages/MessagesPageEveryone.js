import React from "react";
import Badge from "react-bootstrap/Badge";
import MsgEveryone from "./MsgEveryonev2";


class MessagespageEveryone extends React.Component {
  
  // dsoEveryoneMessages
   
  render() {

    let d = Date.now()

    let tuples = this.props.dsoEveryoneMessages.map(
      (tuple, index) => {  //message to tuple
        //console.log(tuple);
        return (
          <MsgEveryone
          key={index}
          mode={this.props.mode} 
          index={index} 
          tuple = {tuple}
          date = {d}
          uniqueName={this.props.uniqueName}
          />
          // <MsgEveryone
          // key={index}
          // mode={this.props.mode} 
          // index={index} 
          // tuple = {tuple}
          // date = {d}
          // uniqueName={this.props.uniqueName}
          // />
        )
      }
    );

    return (
      <> 
       <div className="id-line">
          <h5>
            {this.props.identityInfo === "" ||
            this.props.identityInfo.balance >= 450000000 ? (
              <></>
            ) : (
              <Badge className="paddingBadge" bg="danger">
                Platform Credits : Low!
              </Badge>
            )}
          </h5>
          {this.props.identityInfo === "" ? (
            <></>
          ) : (
            <>
              {this.props.identityInfo.balance >= 450000000 ? (
                <></>
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

        <h5>
          {this.props.identityInfo === "" ||
          this.props.identityInfo.balance >= 450000000 ? (
            <></>
          ) : (
            <Badge className="paddingBadge" bg="primary">
              Please visit DGN or DGM to TopUp your credits.
            </Badge>
          )}
        </h5>
      
        <div id="cardtext" className="footer">
          
              {tuples}
            
        </div>
      </>
    );
  }
}

export default MessagespageEveryone;

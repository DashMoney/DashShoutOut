import React from "react";

import Button from "react-bootstrap/Button";

import MsgEveryone from "./MsgEveryonev2";


class MessagespageEveryone extends React.Component {
  

  render() {
      let tupleArray = [];

        tupleArray = this.props.EveryoneMsgs.map((msg) => {
          let tuple = "";

          for (let nameDoc of this.props.EveryoneNames) {
            if (nameDoc.$ownerId === msg.$ownerId) {
              tuple = [nameDoc.label, msg];
              break;
            }
          }
          if (tuple !== "") {
            return tuple;
          }

          return ["No Name Avail..", msg];
        });

        // console.log(tupleArray);

    let d = Date.now()

    let tuples = tupleArray.map(
      (tuple, index) => {  //message to tuple
        //console.log(tuple);
        return (
          <MsgEveryone
          key={index}
          mode={this.props.mode} 
          index={index} 
          tuple = {tuple}
          date = {d}
          identity={this.props.identity}
          uniqueName={this.props.uniqueName}
          showModal={this.props.showModal}
          handleThread={this.props.handleThread}
          
          EveryoneThreads={this.props.EveryoneThreads}
          EveryoneThreadsNames={this.props.EveryoneThreadsNames}
          />
          
        )
      }
    );

    return (
      <> 
      {this.props.NewSOMsgs.length !== 0 ||
       this.props.NewSOThreads.length !== 0
       ?

        !this.props.isLoadingEveryone ?
      <div className="d-grid gap-2" id="button-edge">
                <Button
                  variant="primary"
                  onClick={() => {
                            this.props.pushNewSOtoView();
                          }}
                >
                  <b>New Messages</b>
                </Button>
              </div>
                    :
                    <></> 

              :
              <></>
      }
      
        <div id="cardtext" className="footer">
          
              {tuples}
            
        </div>
      </>
    );
  }
}

export default MessagespageEveryone;

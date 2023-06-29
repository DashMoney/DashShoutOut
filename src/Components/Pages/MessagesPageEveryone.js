import React from "react";
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
      
        <div id="cardtext" className="footer">
          
              {tuples}
            
        </div>
      </>
    );
  }
}

export default MessagespageEveryone;

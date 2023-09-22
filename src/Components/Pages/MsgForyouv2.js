import React from "react";
//import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";

import Threads from "./Threads";


class MsgForyou extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copiedName: false,
    };
  }

  handleNameClick = () => {
    navigator.clipboard.writeText(this.props.tuple[0]);
    this.setState({
      copiedName: true,
    });
  };


  getRelativeTimeAgo(messageTime, timeNow){


    //How do I make the adjustments....
    //So the messageTime is the time Stamp
    // So messageTime = 2546075019551 - Time of message
    //So I want Time of message

    //let timeOfMessage = 2546075019551 - messageTime; //No longer used

    let timeDifference = timeNow - messageTime;
  
    if(timeDifference >= 84600000){
      let longFormDate = new Date();
       longFormDate.setTime(messageTime);
      return longFormDate.toLocaleDateString();
    }
    
    /*
    Calculate milliseconds in a year
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const year = day * 365;
    */
  
    if(timeDifference < 15000){
      return "Just now"
    }else if(timeDifference <44000){
      return "Few moments ago"
    }else if(timeDifference <90000){
      return "1 min ago"
    }else if(timeDifference <150000){
      return "2 min ago"
    }else if(timeDifference <210000){
      return "3 min ago"
    }else if(timeDifference <270000){
      return "4 min ago"
    }else if(timeDifference <330000){
      return "5 min ago"
    }else if(timeDifference <390000){
      return "6 min ago"
    }else if(timeDifference <450000){
      return "7 min ago"
    }else if(timeDifference <510000){
      return "8 min ago"  
    }else if(timeDifference <570000){
      return "9 min ago"  
    }else if(timeDifference <660000){
      return "10 min ago"
    }else if(timeDifference <840000){
      return "12 min ago"
    }else if(timeDifference <1020000){
      return "15 min ago"
    }else if(timeDifference <1140000){
      return "18 min ago"
    }else if(timeDifference <1380000){
      return "20 min ago"
    }else if(timeDifference <1650000){
      return "25 min ago"
    }else if(timeDifference <1950000){
      return "30 min ago"
    }else if(timeDifference <2250000){
      return "35 min ago"
    }else if(timeDifference <2550000){
      return "40 min ago"
    }else if(timeDifference <3000000){
      return "45 min ago"
    }else if(timeDifference <5400000){
      return "1 hr ago"
    }else if(timeDifference <9000000){
      return "2 hrs ago"
    }else if(timeDifference <12600000){
      return "3 hrs ago"
    }else if(timeDifference <18000000){
      return "5 hrs ago"
    }else if(timeDifference <43200000){
      return "Many hrs ago"
    }else if(timeDifference <84600000){
      return "About a day ago"
    }
  }

  checkIfShout = (msgDoc) => {
     if(msgDoc.sh === 'out'){
      return <span className="textsmaller text-muted">SO</span>
    } else{
      return <span className="textsmaller text-muted">DM</span>
    }
  }

  render() {
    let cardBkg;
    let cardText;

    if (this.props.mode === "primary") {
      cardBkg = "white";
      cardText = "dark";

    } else {
      cardBkg = "dark";
      cardText = "white";

    }

    //NEW THING BELOW -> ADDING THREADS TO MSGS
    /**
     * ForYouThreads={ForYouThreads}
       ForYouThreadsNames={ForYouThreadsNames}
     * 
     */

    let threadDocs = this.props.ForYouThreads.filter((doc)=>{
      return doc.msgId === this.props.tuple[1].$id;
     // return Identifier.from(doc.msgId, 'base64').toJSON() === this.props.tuple[1].$id;
    });

    //need to order the docs -> 
    threadDocs = threadDocs.sort(function (a, b) {
      return a.$createdAt - b.$createdAt;
    });

    let threadsToDisplay = []; 

    if(threadDocs.length > 0){

      threadsToDisplay = threadDocs.map((thr, index )=>{
        return(

          <Threads
          key={index}
          mode={this.props.mode} 
          index={index} 
          thr = {thr}
          msg = {this.props.tuple[1]}
          date = {this.props.date}
          identity={this.props.identity}
          uniqueName={this.props.uniqueName}
          // showModal={this.props.showModal}
          handleThread={this.props.handleThread}
          
          ThreadsNames={this.props.ForYouThreadsNames}
          />
        )
      });
    }
    
//END OF NEW THING

    return (
      <Card id="card" key={this.props.index} bg={cardBkg} text={cardText}>
        <Card.Body>
          <Card.Title className="cardTitle">
            {this.props.uniqueName === this.props.tuple[0] ? (
              <span style={{ color: "#008de4" }}>{this.props.tuple[0]}</span>
            ) : (
              <>
              <span style={{ color: "#008de4" }} onClick={() => this.handleNameClick()}>
                {this.props.tuple[0]}
              </span>
              <span>
                {this.state.copiedName?<span>✅</span>:<></>}
                </span>
                </>
            )}

             {this.checkIfShout(this.props.tuple[1])}

            {/* 
          
          <Button variant="outline-primary" 
          onClick={()=> this.handleNameClick()          
          }
          >Copy</Button>
          {this.state.copiedName?<span>✅</span>:<></>} */}

            <span className="textsmaller text-muted">
              {this.getRelativeTimeAgo(this.props.tuple[1].$createdAt, this.props.date)}
            </span>
          </Card.Title>

          <Card.Text
          onClick={()=>this.props.handleThread(this.props.tuple[1].$id)}
          >
            {this.props.tuple[1].msg}
          </Card.Text>
          {threadsToDisplay}
        </Card.Body>
      </Card>
    );
  }
}

export default MsgForyou;

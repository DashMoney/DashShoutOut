import React from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import MsgForyou from "./MsgForyouv2";

class MessagespageForyou extends React.Component {


  render() {
// *** *** *** *** *** ***
      let tupleFromYouArray = [];

        tupleFromYouArray = this.props.ByYouMsgs.map((msg) => {
          let tuple = "";

          for (let nameDoc of this.props.ByYouNames) {
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
// *** *** *** *** *** ***
        
       let tupleFromOthersArray = [];

        tupleFromOthersArray = this.props.FromTagsMsgs.map((msg) => {
          let tuple = "";

          for (let nameDoc of this.props.FromTagsNames) {
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
// *** *** *** *** *** ***

// ### ### ### ### ### ###

  let ForYouThreads = [...this.props.ByYouThreads, ...this.props.FromTagsThreads];

  let ForYouThreadsNames = [...this.props.ByYouThreadsNames, ...this.props.FromTagsThreadsNames];

// ### ### ### ### ### ###

      let tupleArray = [
      ...tupleFromYouArray,
      ...tupleFromOthersArray,
    ];


  // Ensure Unique msgs***
    let arrayOfMsgIds = tupleArray.map((tuple) => {
      return tuple[1].$id;
    });

    // console.log('Combine FORYOU arrayMsgId!!', arrayOfMsgIds);

    let setOfMsgIds = [...new Set(arrayOfMsgIds)];

    arrayOfMsgIds = [...setOfMsgIds];

    //       ***

    tupleArray = arrayOfMsgIds.map((msgId) => {
      let tuple = [];

      for (let tupleDoc of tupleArray) {
        if (tupleDoc[1].$id === msgId) {
          tuple = tupleDoc;
          break;
        }
      }
      return tuple;
    });


    // console.log('CombineandUnique FORYOU!!', tupleArray);

    let sortedForYou = tupleArray.sort(function (a, b) {
      return a[1].timeStamp - b[1].timeStamp;
    });

    // console.log('Final FORYOU!!', sortedForYou);


    let d = Date.now();

    let tuples = sortedForYou.map((tuple, index) => {
      return (
        <MsgForyou
          key={index}
          mode={this.props.mode}
          index={index}
          tuple={tuple}
          date={d}
          identity={this.props.identity}
          uniqueName={this.props.uniqueName}
          showModal={this.props.showModal}
          handleThread={this.props.handleThread}

          ForYouThreads={ForYouThreads}
          ForYouThreadsNames={ForYouThreadsNames}

        />
       
      );
    });

    return (
      <>
       
            {this.props.identityInfo === "" ||
            this.props.identityInfo.balance >= 450000000 ? (

              <div className="id-line">
              <h5>
              <Badge className="paddingBadge" bg="primary">
                Your Platform Credits
              </Badge>
              </h5>

              {this.props.identityInfo === "" ? (
            <h5>
              <Badge className="paddingBadge" bg="primary" pill>
                Loading..
              </Badge>
            </h5>
          ) : (
                <h5>
                  <Badge className="paddingBadge" bg="primary" pill>
                    {this.props.identityInfo.balance}
                  </Badge>
                </h5>
            
          
            )}
            
            </div>)
            
            : (
              <></>
            )}
          
          

        {sortedForYou.length < 1 ? (
          <p>
            Greetings, once you send a message or someone tags you in a message,
            it will show up here.
          </p>
        ) : (
          <></>
        )}

         {this.props.NewDMByYouThreads.length !== 0 ||
       this.props.NewDMFromTagsMsgs.length !== 0 || 
       this.props.NewDMFromTagsThreads.length !== 0
       ?

        !this.props.isLoadingForYou ?
      <div className="d-grid gap-2" id="button-edge">
                <Button
                  variant="primary"
                  onClick={() => {
                            this.props.pushNewDMtoView();
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

export default MessagespageForyou;

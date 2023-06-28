import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import CloseButton from "react-bootstrap/CloseButton";


class NewMessageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taggedArray: [],
      messageInput: "",
      tooLongError: false,
      tooManyTagsError: false,
      searchedName: "", //Probably remove
      validityAvail: false,
      validityCheck: false,
      validityName:false,
    };
  }


  /*
  <NewMessageModal
            uniqueName={this.state.uniqueName}
            submitDSODocument={this.submitDSODocument}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            closeExpandedNavs={this.closeExpandedNavs}
          />
  */

  handleCloseClick = () => {
    this.props.hideModal();
  };

  taggedValidate = (taggedInput) => {
    //let regex = /[@]{1}[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]/gm;
    //Removed the g so that only returns the first one
    let regex = /[@]{1}[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]/m;

    //Accomplishes for Display -> handles if no tags, removes @
    //DOESN'T HANDLE IF NAMES ARE DIFFERNT UPPER OR LOWERCASE

    let tags =  taggedInput.match(regex);

    //console.log(tags);
    if(tags === null){
      tags = [];
    }

    //IF MORE THAN 10 TAGS THROW -> INVALID
    if (tags.length > 10) {
      this.setState({
        tooManyTagsError: true,
      });

    } else if(this.state.tooManyTagsError) {
        this.setState({
          tooManyTagsError: false,
        });
      }
    
    //if tags is greater than 1 I think will fix
    let names =[];

    if(tags.length >= 1){
    names = tags.map(tag => tag.slice(1));
    //console.log(names);
    }

//This makes sure that only a list of unique names is made.
    let uniqueNames = new Set([...names]);
//Puts in back to an array
    let nameArray = [...uniqueNames];

    //Still lets through upper/lowercase differences but its okay for now

    return nameArray;
  };


  formValidate = (messageText) => {

    let regex1 = /^.[\S\s]{0,450}$/; 

    let valid1 = regex1.test(messageText);

    let regex2 = /^(?:[^\r\n]*(?:\r\n?|\n)){0,4}[^\r\n]*$/

    let valid2 = regex2.test(messageText);

    let valid=false;

    if(valid1 && valid2){
      valid = true;
    }



    if (valid && !this.state.tooManyTagsError) { //Put tag error here
      this.setState({
        messageInput: messageText,
        tooLongError: false,
      });
      return true;
    } else {
      if (messageText.length > 450) {
        this.setState({
          tooLongError: true,
        });
      }
      return false;
    }
  };

  

  onChange = (event) => {
    event.preventDefault();
    event.stopPropagation();

    //console.log(event.target.value);
    //this is the message body!!!

    let taggedNames = this.taggedValidate(event.target.value);

      if (this.formValidate(event.target.value) === true) {

        //THIS NEEDS TO INCLUDE THE TOOMANYTAGS ISSUE
        // -> Put logic in formValidate() right above ^^^^

        this.setState({
          validityCheck: true,
          taggedArray: taggedNames,
        });
      } else {
        this.setState({
          validityCheck: false,
        });
      }

    }

  handleSubmitClick = (event) => {
    event.preventDefault();
    console.log(event.target.ControlTextarea1.value);

    if (this.formValidate(event.target.ControlTextarea1.value)) {

      //Accomplishes for Document Creation -> sets lowercase, add author and ensures unique on lowercase

      let names = this.state.taggedArray;

      // names.push(this.props.uniqueName); //Add the author
      // console.log(names);
    
      names = names.map(tag => tag.toLowerCase())
      //console.log(names);
    
      let uniqueNames = new Set([...names]); // ensures unique
 
      let nameArray = [...uniqueNames];//Puts in back to an array
    
      //console.log(nameArray);
    


        let newMessage;

        if(nameArray.length === 0){
          newMessage = {
            author: this.props.uniqueName,
            timeStamp: 2546075019551 - Date.now(),
            tagged: 'No Tag',
            message: `${event.target.ControlTextarea1.value}`
          };

        }else{

          newMessage = {
            author: this.props.uniqueName,
            timeStamp: 2546075019551 - Date.now(),
            tagged: nameArray[0],
            message: `${event.target.ControlTextarea1.value}`
          };
        }
      
      this.props.submitDSODocument(newMessage);
      this.props.hideModal();

    } else {

      console.log('Invalid Message');
        }
  };

  render() {
    let modalBkg = "";
    let closeButtonColor;

    if (this.props.mode === "primary") {
      modalBkg = "modal-backcolor-primary";
      closeButtonColor = <CloseButton onClick={this.handleCloseClick} />;
    } else {
      modalBkg = "modal-backcolor-dark";
      closeButtonColor = (
        <CloseButton onClick={this.handleCloseClick} variant="white" />
      );
    }

    //Fix the rendering of the Tagged names here
    let namesToDisplay = ''
    if(this.state.taggedArray.length >= 1){
      namesToDisplay = "Tags: "
      this.state.taggedArray.forEach(name => namesToDisplay += " "+name)
    }



    return (
      <>
        <Modal show={this.props.isModalShowing} contentClassName={modalBkg}>
          <Modal.Header>
            <Modal.Title>
               <h3>
               <Badge bg="primary">Create New Shout Out</Badge>
               {/* <b>New Message</b> */}
               </h3>
            </Modal.Title>
            {closeButtonColor}
          </Modal.Header>
          <Modal.Body>
            <Form
              noValidate
              onSubmit={this.handleSubmitClick}
               
            >
              <Form.Group className="mb-3" controlId="ControlTextarea1"
              >
                {/* <Form.Label>Example textarea</Form.Label> */}

                <Form.Control
                  onChange={this.onChange}
                  as='textarea'
                  rows={4}
                  placeholder="Write message here.."
                  required
                  isInvalid={this.state.tooLongError && this.state.tooManyTagsError}
                />

                {this.state.tooLongError ? (
                <Form.Control.Feedback className="floatLeft" type="invalid">
                Sorry, this is too long! Please use less than 450 characters.
              </Form.Control.Feedback>
                
              ) : (
                <></>
              )}

              {this.state.tooManyTagsError ? (
                <Form.Control.Feedback className="floatLeft" type="invalid">
                Sorry, too many tags! Please use less than 60 tags.
              </Form.Control.Feedback>
              ) : (
                <></>
              )}

              
                {this.state.taggedArray.length < 1?
                <Form.Text muted>
                Add @Name to tag another user
              </Form.Text>
              :
              <Form.Text>
                {namesToDisplay}
              </Form.Text>
              }

</Form.Group>
              
            

               {this.state.searchedName === "" ? (
              this.state.validityCheck ? (
                <Button variant="primary" type="submit">
                  Create Message
                </Button>
              ) : (
                <Button variant="primary" disabled type="submit">
                  Create Message
                </Button>
              )):(
                this.state.validityCheck && this.state.validityName? (
                  <Button variant="primary" type="submit">
                    Create Message
                  </Button>
                ) : (
                  <Button variant="primary"  disabled type="submit">
                    Create Message
                  </Button>
              ))}
               

            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default NewMessageModal;

import React from "react";
import LocalForage from "localforage";

import Image from "react-bootstrap/Image";

import DashBkgd from "./Images/dash_digital-cash_logo_2018_rgb_for_screens.png";

import TopNav from "./Components/TopNav/TopNav";
import BottomNav from "./Components/BottomNav/BottomNav";
import LoginBottomNav from "./Components/BottomNav/LoginBottomNav";

import LandingPage from "./Components/Pages/LandingPage";
import MessagesPage from "./Components/Pages/MessagesPage";

import Footer from "./Components/Footer";

import LoginSignupModal from "./Components/TopNav/LoginSignupModal";
import LogoutModal from "./Components/TopNav/LogoutModal";

import NewDMModal from "./Components/BottomNav/BottomNavModalFolder/NewDMModal";
import NewSOModal from "./Components/BottomNav/BottomNavModalFolder/NewSOModal";
import TopUpIdentityModal from "./Components/BottomNav/BottomNavModalFolder/TopUpModal";

import "./App.css";

const Dash = require("dash");

const {
  Essentials: { Buffer },
  PlatformProtocol: { Identifier },
} = Dash;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      isLoading: false,
      isLoadingRefresh: false,

      isLoadingEveryone: true,
      isLoadingForyou: false,
      mode: "dark",
      presentModal: "",
      isModalShowing: false,
      whichNetwork: "testnet",

      mnemonic: "",
      identity: "",
      identityInfo: "",
      identityRaw: '',
      uniqueName: "",
      messagePriorToSubmit: "",

      dsoEveryoneMessages: [],
      dsoForyouBYYOUTuples: [], 
      dsoForyouFROMOTHERSTuples: [], 

      dsoForyouMessages: [],
      addedForYouTuplesPriorToConf: [],
      addedEveryoneTuplesPriorToConf: [], 

      walletId: '',
      platformLogin: false,
      skipSynchronizationBeforeHeight: 853000,
      mostRecentBlockHeight: 853000,

      expandedTopNav: false,
    };
  }

  closeExpandedNavs = () => {
    this.setState({
      expandedTopNav: false,
    });
  };

  toggleExpandedNav = (selectedNav) => {
    if (this.state.expandedTopNav) {
      this.setState({
        expandedTopNav: false,
      });
    } else {
      this.setState({
        expandedTopNav: true,
      });
    }
  };

  hideModal = () => {
    this.setState({
      isModalShowing: false,
    });
  };

  showModal = (modalName) => {
    this.setState({
      presentModal: modalName,
      isModalShowing: true,
    });
  };

  handleMode = () => {
    if (this.state.mode === "primary")
      this.setState({
        mode: "dark",
      });
    else {
      this.setState({
        mode: "primary",
      });
    }
  };

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      isLoading: false,
      isLoadingRefresh: false,
      isLoadingEveryone: true,
      isLoadingForyou: false,
      presentModal: "",
      isModalShowing: false,

      mnemonic: "",
      identity: "",
      identityInfo: "",
      identityRaw: '',
      uniqueName: "",
      messagePriorToSubmit: "",

      dsoEveryoneMessages: [],
      dsoForyouBYYOUTuples: [], 
      dsoForyouFROMOTHERSTuples: [], 
      dsoForyouMessages: [],
      addedForYouTuplesPriorToConf: [],
      addedEveryoneTuplesPriorToConf: [], 

      walletId: '',
      platformLogin: false,
      skipSynchronizationBeforeHeight: 853000, 
      mostRecentBlockHeight: 853000,

      expandedTopNav: false,
    },()=> this.componentDidMount());
  };

  updateCreditsAfterTopUp = (identInfo) => {
    this.setState({
      identityInfo: identInfo,
      isLoadingRefresh: false,
    });
  };

  triggerTopUpLoading = () => {
    this.setState({
      isLoadingRefresh: true,
    });
  };

  componentDidMount() {
    LocalForage.config({
      name: "dashmoney-platform-login",
    });

    LocalForage.getItem("mostRecentWalletId")
      .then((val) => {
        if (val !== null) {
          this.handleStartQuerySeq(val.identity);
          this.setState({
            walletId: val.walletId,
            identity: val.identity,
            uniqueName: val.name,
          });
        } else {
        //  console.log("There is no mostRecentWalletId");
        }
      })
      .catch(function (err) {
        console.log(err);
      });

    const clientOpts = {
      network: this.state.whichNetwork,
    };
    const client = new Dash.Client(clientOpts);

    const getMostRecentBlockHeight = async () => {
      const status = await client.getDAPIClient().core.getStatus();

      return status;
    };

    getMostRecentBlockHeight()
      .then((d) => {
        let blockHeight = d.chain.blocksCount;
       // console.log("Most Recent Block Height:\n", blockHeight);
        this.setState({
          mostRecentBlockHeight: blockHeight - 9,
        });
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
      })
      .finally(() => client.disconnect());

    LocalForage.keys()
      .then((keys) => {
        this.setState({
          LocalForageKeys: keys,
        });
      //  console.log(keys);
      })
      .catch(function (err) {
        console.log(err);
      });


      this.getDSOEveryoneDocs(); 

  }

  handleLoginwithMnem = (theMnemonic) => {

    if (this.state.LocalForageKeys.length === 0) {
      this.setState({
        isLoggedIn: true,
        //isLoading: true,  
        //isLoadingEveryone: true,
        isLoadingForyou: true,
        mnemonic: theMnemonic,
      },()=>this.getIdentitywithMnem(theMnemonic));
    } else {
      this.setState({
        isLoggedIn: true,
        mnemonic: theMnemonic,
      },()=>this.checkPlatformOnlyLogin(theMnemonic));
    }
  };

  checkPlatformOnlyLogin = (theMnemonic) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: theMnemonic,
        offlineMode: true,
      },
    };

    const client = new Dash.Client(clientOpts);

    let walletIdToTry;

    const createWallet = async () => {
      const account = await client.getWalletAccount();

      walletIdToTry = account.walletId;
     // console.log("walletIdToTry:", walletIdToTry);

      return walletIdToTry === this.state.walletId;
    };

    createWallet()
      .then((mostRecentMatch) => {

        console.log(`Most Recent Matches -> ${mostRecentMatch}`); 
        
        if(!mostRecentMatch){

        let isKeyAvail = this.state.LocalForageKeys.includes(walletIdToTry);
       // console.log(`LocalForage Test -> ${isKeyAvail}`);

        if (isKeyAvail) {
          console.log("This here is a login skip!!");

          LocalForage.getItem(walletIdToTry)
            .then((val) => {
            //  console.log("Value Retrieved", val);

              if (
                val !== null ||
                typeof val.identity !== "string" ||
                val.identity === "" ||
                val.name === "" ||
                typeof val.name !== "string"
              ) {
                
                this.setState({
                  platformLogin: true,
                  identity: val.identity,
                  uniqueName: val.name,
                  walletId: walletIdToTry,
                  isLoading: false,
                  //isLoadingEveryone: true,
                  isLoadingForyou:true,
                  dsoForyouMessages: [],
                  //maintain Loading bc continuing to other functions
                },()=>this.handleStartQuerySeq(val.identity));
                  //******************** */
        //CREATE AN OBJECT AND PUT IT IN THERE!!!
        let lfObject = {
          walletId: walletIdToTry,
          identity: val.identity,
          name: val.name,
        };
        //This is where I save to localForage if walletId is not there.
        LocalForage.setItem("mostRecentWalletId", lfObject)
          .then((d) => {
            //return LocalForage.getItem(walletId);
           // console.log("Return from LF setitem:", d);
          })
          .catch((err) => {
            console.error(
              "Something went wrong setting to localForage:\n",
              err
            );
          });
        //******************** */
              } else {
              //  console.log("platform login failed");
                //this.getIdentitywithMnem(theMnemonic);
                //() => this.getNamefromIdentity(val)); // send to get it
              }
            })
            .catch((err) => {
              console.error(
                "Something went wrong getting from localForage:\n",
                err
              );
            });
        } else {
          this.setState({
            //This is for if no platform login at all. resets
            identityInfo: "",
            identityRaw: '',
            uniqueName: "",
            
            //isLoadingForyou:false, 
            dsoForyouMessages: [],
          },()=>this.getIdentitywithMnem(theMnemonic));
          
        }
      }//Closes mostRecentMatch
      else{
          this.setState({
            platformLogin: true,
            isLoading: false,
            isLoadingEveryone: false,
            isLoadingForyou:false,
          });
      } 
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  ///****************************************************************** */

  handleStartQuerySeq = (theIdentity) => {
    if(this.state.dsoEveryoneMessages.length === 0){
      this.getDSOEveryoneDocs();
    }
    this.getDSOForyouByyouDocs(theIdentity);
    this.getDSOForyouFromOthersTags(theIdentity);
    this.getIdentityInfo(theIdentity);
  };
  // START - Part 1 of LOGIN
  getIdentitywithMnem = (theMnemonic) => {

    const client = new Dash.Client({
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: theMnemonic,
        unsafeOptions: {
          skipSynchronizationBeforeHeight: this.state.mostRecentBlockHeight,
        },
      },
    });

    let walletIdToTry;

    const retrieveIdentityIds = async () => {
      const account = await client.getWalletAccount();

      //console.log(account);

      walletIdToTry = account.walletId;
     // console.log(walletIdToTry);

      return account.identities.getIdentityIds();
    };

    retrieveIdentityIds()
      .then((d) => {
       // console.log("Mnemonic identities:\n", d);
        //This if - handles if there is an identity or not
        if (d.length === 0) {
          this.setState({
            isLoading: false,
            identity: "No Identity",
          });
        } else {
          this.setState(
            {
              walletId: walletIdToTry,
              identity: d[0],
              isLoading: false,
              //maintain Loading bc continuing to other functions
            },
            () => this.callEverythingBcHaveIdentityNow(d[0])
          );
        }
      })
      .catch((e) => {
        console.error("Something went wrong getting IdentityIds:\n", e);
        this.setState({
          isLoading: false,
          identity: "No Identity",
        });
      })
      .finally(() => client.disconnect());
  };

  callEverythingBcHaveIdentityNow = (theIdentity) => {
    if(!this.state.platformLogin){
    this.getDSOForyouByyouDocs(theIdentity);
    this.getDSOForyouFromOthersTags(theIdentity);
    this.getNamefromIdentity(theIdentity);
    this.getIdentityInfo(theIdentity);
    }
  };

  getNamefromIdentity = (theIdentity) => {
    const client = new Dash.Client({
      network: this.state.whichNetwork,
    });

    const retrieveNameByRecord = async () => {
      // Retrieve by a name's identity ID
      return client.platform.names.resolveByRecord(
        "dashUniqueIdentityId",
        theIdentity // Your identity ID
      );
    };

    retrieveNameByRecord()
      .then((d) => {
        let nameRetrieved = d[0].toJSON();
       // console.log("Name retrieved:\n", nameRetrieved);

        //******************** */
        //CREATE AN OBJECT AND PUT IT IN THERE!!!
        let lfObject = {
          identity: theIdentity,
          name: nameRetrieved.label,
        };

        LocalForage.setItem(this.state.walletId, lfObject)
          .then((d) => {
            //return LocalForage.getItem(walletId);
         //   console.log("Return from LF setitem:", d);
          })
          .catch((err) => {
            console.error(
              "Something went wrong setting to localForage:\n",
              err
            );
          });
        //******************** */

        //CREATE AN OBJECT AND PUT IT IN THERE!!!
        lfObject = {
          walletId: this.state.walletId,
          identity: theIdentity,
          name: nameRetrieved.label,
        };

        LocalForage.setItem("mostRecentWalletId", lfObject)
          .then((d) => {
            //return LocalForage.getItem(walletId);
          //  console.log("Return from LF setitem:", d);
          })
          .catch((err) => {
            console.error(
              "Something went wrong setting to localForage:\n",
              err
            );
          });
        //******************** */
        this.setState({
          uniqueName: nameRetrieved.label,
          isLoading: false,
        });
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
       // console.log("There is no dashUniqueIdentityId to retrieve");
        this.setState({
          isLoading: false,
          uniqueName: "Er",
        });
      })
      .finally(() => client.disconnect());
  };

  // END - Part 1 of LOGIN
  //#######################################################################

  getIdentityInfo = (theIdentity) => {
   // console.log("Called get id info");

    const client = new Dash.Client({ network: this.state.whichNetwork });

    const retrieveIdentity = async () => {
      return client.platform.identities.get(theIdentity); // Your identity ID
    };

    retrieveIdentity()
      .then((d) => {
       // console.log("Identity retrieved:\n", d.toJSON());

        this.setState({
          identityInfo: d.toJSON(),
          identityRaw: d,
          //isLoading: false,
        });
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);

        // this.setState({
        //   isLoading: false,
        // });
      })
      .finally(() => client.disconnect());
  };

  //START - Part 2 of LOGIN
  getDSOEveryoneDocs = () => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DSOContract: {
          contractId: 'DWz9TXjLhHT4Ztz1ctv1u9bzmrymVXzMpCPzhm5Dm1PP', // Your contract ID
        },
        DPNS: {
          contractId: "GWRSAVFMjXx8HpQFaNJMqBV7MBgMK4br5UESsB4S31Ec",
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const getDocuments = async () => {
      return client.platform.documents.get("DSOContract.dsomsg", {
        limit: 60,
        where: [
          ["sh", "==", "out"],
          ["timeStamp", ">=", 2546075019551 - Date.now()],
        ],
        orderBy: [["timeStamp", "asc"]],
      });
    };

    getDocuments()
      .then((d) => {
        let docArray = [];
       // console.log("Getting Everyone DSO Docs");
        for (const n of d) {
          //console.log("Document:\n", n.toJSON());
          docArray = [...docArray, n.toJSON()];
        }

        //START OF NAME RETRIEVAL

        let ownerarrayOfOwnerIds = docArray.map((doc) => {
          return doc.$ownerId;
        });

        let setOfOwnerIds = [...new Set(ownerarrayOfOwnerIds)];

        let arrayOfOwnerIds = [...setOfOwnerIds];

        arrayOfOwnerIds = arrayOfOwnerIds.map((item) =>
          Buffer.from(Identifier.from(item))
        );

      //  console.log("Calling getNamesforDSOmsgs");

        const getNameDocuments = async () => {
          return client.platform.documents.get("DPNS.domain", {
            where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
            orderBy: [["records.dashUniqueIdentityId", "asc"]],
          });
        };

        getNameDocuments()
          .then((d) => {
            //WHAT IF THERE ARE NO NAMES?
            if (d.length === 0) {
             // console.log("No DPNS domain documents retrieved.");
            }

            let nameDocArray = [];

            for (const n of d) {
              //console.log("NameDoc:\n", n.toJSON());

              nameDocArray = [n.toJSON(), ...nameDocArray];
            }
          //  console.log(`DPNS Name Docs: ${nameDocArray}`);

            let tupleArray = []; //<- Final array

            // My 2 arrays are: nameDocArray and msgArr
            //There may not be very many name docs because same author for lots of msgs..

            tupleArray = docArray.map((msg) => {
              let tuple = "";

              for (let nameDoc of nameDocArray) {
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

            //ADD THE LASTTUPLES ADD SO NOT LOST ON REFRESH
            if(this.state.addedEveryoneTuplesPriorToConf.length !== 0) {

              this.setState({
                dsoEveryoneMessages: [
                  ...this.state.addedEveryoneTuplesPriorToConf, 
                  ...tupleArray
                ],
                isLoadingEveryone: false,
                isLoadingRefresh: false,
              });

              //console.log('Added Tuple to Everyone');
            }else{
            this.setState({
              dsoEveryoneMessages: tupleArray, //Should be the tuple array.
              isLoadingEveryone: false,
              isLoadingRefresh: false,
            });
          }

          })
          .catch((e) => {
            console.error("Something went wrong:\n", e);
          });
        //END OF NAME RETRIEVAL
      })
      .catch((e) =>{ 
        console.error("Something went wrong:\n", e);
        this.setState({
          isLoadingEveryone: false,
          isLoadingRefresh: false,
        });
      });
  }; //These 2 ^^ && BELOW ARE Separate..

  getDSOForyouByyouDocs = (theIdentity) => {
   // console.log("Calling dsoForYouFromyouDocs");

    const clientOpts = {
      network: "testnet",
      apps: {
        DSOContract: {
          contractId: 'DWz9TXjLhHT4Ztz1ctv1u9bzmrymVXzMpCPzhm5Dm1PP', // Your contract ID
        },
        DPNS: {
          contractId: "GWRSAVFMjXx8HpQFaNJMqBV7MBgMK4br5UESsB4S31Ec",
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    //DSOForyou Query -> From you (SO and DM)

    const getDocuments = async () => {
      return client.platform.documents.get("DSOContract.dsomsg", {
        limit: 60,
        where: [
          ["$ownerId", "==", theIdentity],
          ["timeStamp", ">=", 2546075019551 - Date.now()],
        ],
        orderBy: [["timeStamp", "asc"]],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
         // console.log("There are no ForyouByyouMsgs");
          this.setState({
            isLoadingForyou: false,
          });
        } else {
          let docArray = [];
          for (const n of d) {
           // console.log("Document:\n", n.toJSON());
            docArray = [...docArray, n.toJSON()];
          }
          //START OF NAME RETRIEVAL

          let ownerarrayOfOwnerIds = docArray.map((doc) => {
            return doc.$ownerId;
          });

          let setOfOwnerIds = [...new Set(ownerarrayOfOwnerIds)];

          let arrayOfOwnerIds = [...setOfOwnerIds];

          arrayOfOwnerIds = arrayOfOwnerIds.map((item) =>
            Buffer.from(Identifier.from(item))
          );

         // console.log("Calling getNamesforDSOmsgs");

          const getNameDocuments = async () => {
            return client.platform.documents.get("DPNS.domain", {
              where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
              orderBy: [["records.dashUniqueIdentityId", "asc"]],
            });
          };

          getNameDocuments()
            .then((d) => {
              //WHAT IF THERE ARE NO NAMES?
              if (d.length === 0) {
               // console.log("No DPNS domain documents retrieved.");
              }

              let nameDocArray = [];

              for (const n of d) {
                //console.log("NameDoc:\n", n.toJSON());

                nameDocArray = [n.toJSON(), ...nameDocArray];
              }
            //  console.log(`DPNS Name Docs: ${nameDocArray}`);

              let tupleArray = []; //<- Final array

              // My 2 arrays are: nameDocArray and msgArr
              //There may not be very many name docs because same author for lots of msgs..

              tupleArray = docArray.map((msg) => {
                let tuple = "";

                for (let nameDoc of nameDocArray) {
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

              //console.log(tupleArray);

              this.setState({
                dsoForyouBYYOUTuples: tupleArray,
              },()=>this.combineForyouMsgs()); 

            })
            .catch((e) => {
              console.error("Something went wrong:\n", e);
            });
          //END OF NAME RETRIEVAL
        } //Close of else statement
      })
      .catch((e) => console.error("Something went wrong:\n", e));
    //.finally(() => client.disconnect());
  };
  //END - Part 2 of LOGIN
  //#######################################################################

  //START - Part 3 of LOGIN
  getDSOForyouFromOthersTags = (theIdentity) => {
   // console.log("Calling dsoForYouOthersTags");

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DSOContract: {
          contractId: 'DWz9TXjLhHT4Ztz1ctv1u9bzmrymVXzMpCPzhm5Dm1PP', // Your contract ID
        },
        DPNS: {
          contractId: "GWRSAVFMjXx8HpQFaNJMqBV7MBgMK4br5UESsB4S31Ec",
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    //DSOForyou Query -> From other's tags (SO and DM) -> this is forTAGS

    const getTagsFromtoUserIdYourOwnerId = async () => {
      return client.platform.documents.get("DSOContract.dsotag", {
        limit: 60,
        where: [
          ["toId", "==", theIdentity],
          ["timeStamp", ">=", 2546075019551 - Date.now()],
        ],
        orderBy: [["timeStamp", "asc"]],
      });
    };

    getTagsFromtoUserIdYourOwnerId()
      .then((d) => {
        if (d.length !== 0) {
          let docArray = [];
          for (const n of d) {
           // console.log("tags:\n", n.toJSON());
            docArray = [...docArray, n.toJSON()];
          }

          //console.log( docArray instanceof Array);

          let msgIdArray = docArray.map((doc) => {
            return doc.msgId;
          });

         // console.log(`MessageID Array: ${msgIdArray}`);

          //NEXT GET THE MSGS FROM THE TAGS msgIds************
          this.getDSOmsgsFromTags(msgIdArray);
          //NEXT GET THE MSGS FROM THE TAGS msgIds************
        } else {
          console.log("No Tags for this user.");
          this.setState({
            isLoadingForyou: false,
          });
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e));
  };

  getDSOmsgsFromTags = (idsOfMsgsFromTags) => {
   // console.log("Getting MSGs from Tags");

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DSOContract: {
          contractId: 'DWz9TXjLhHT4Ztz1ctv1u9bzmrymVXzMpCPzhm5Dm1PP', // Your contract ID
        },
        DPNS: {
          contractId: 'GWRSAVFMjXx8HpQFaNJMqBV7MBgMK4br5UESsB4S31Ec',
        },
      },
    };
    let client = new Dash.Client(clientOpts);

    let arrayOfMSGIds = idsOfMsgsFromTags.map(
      (item) => {
        return Identifier.from(item);
      }
      //return item}
    );

   // console.log(`Array of MsgIds: ${arrayOfMSGIds}`);

    const getDocuments = async () => {
      return client.platform.documents.get("DSOContract.dsomsg", {
        where: [
          [
            "$id", "in", arrayOfMSGIds,
          ],
        ],
        orderBy: [['$id', 'asc']],
      });
    };

    getDocuments()
      .then((d) => {
        let docArray = [];
        if (d.length === 0) {
          console.log("There are not ForyouFromOthersMsgs");
          
        } else {
         
          for (const n of d) {
            //console.log("Document:\n", n.toJSON());
            docArray = [...docArray, n.toJSON()];
          }
        }
      

    //START OF NAME RETRIEVAL
   // console.log('Doc Array: ', docArray);

    let ownerarrayOfOwnerIds = docArray.map((doc) => {

    return Identifier.from(doc.$ownerId).toJSON(); //WINNER SUCCESS!!

    });

    let setOfOwnerIds = [...new Set(ownerarrayOfOwnerIds)];

    let arrayOfOwnerIds = [...setOfOwnerIds];

   // console.log('OwnerIds: ', arrayOfOwnerIds);

    arrayOfOwnerIds = arrayOfOwnerIds.map((item) =>
    Identifier.from(item)
    );

   // console.log("Calling getNamesforDSOmsgs");

    const getNameDocuments = async () => {
    return client.platform.documents.get("DPNS.domain", {
      where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
      orderBy: [["records.dashUniqueIdentityId", "asc"]],
    });
    };

    getNameDocuments()
    .then((d) => {
      //WHAT IF THERE ARE NO NAMES?
      if (d.length === 0) {
        console.log("No DPNS domain documents retrieved.");
      }

      let nameDocArray = [];

      for (const n of d) {
        //console.log("NameDoc:\n", n.toJSON());

        nameDocArray = [n.toJSON(), ...nameDocArray];
      }
    //  console.log(`DPNS Name Docs: ${nameDocArray}`);

      let tupleArray = []; //<- Final array

      // My 2 arrays are: nameDocArray and msgArr
      //There may not be very many name docs because same author for lots of msgs..

      tupleArray = docArray.map((doc) => {
        let tuple = "";

        for (let nameDoc of nameDocArray) {
          if (nameDoc.$ownerId === Identifier.from(doc.$ownerId).toJSON()) {
            tuple = [nameDoc.label, doc];
            break;
          }
        }
        if (tuple !== "") {
          return tuple;
        }

        return ["No Name Avail..", doc];
      });

     // console.log(tupleArray);

      this.setState({
        dsoForyouFROMOTHERSTuples: tupleArray,
      },()=>this.combineForyouMsgs()); 

    })
    .catch((e) => {
      console.error("Something went wrong:\n", e);
    })
//END OF NAME RETRIEVAL
  })
  .catch((e) => console.error("Something went wrong:\n", e))
  .finally(() => client.disconnect());
    
      
  };

  //END - Part 3 of LOGIN
  //#######################################################################
  combineForyouMsgs = () => {

    let tupleArray = [
      ...this.state.dsoForyouBYYOUTuples,
      ...this.state.dsoForyouFROMOTHERSTuples
    ];
// Ensure Unique msgs***
    let arrayOfMsgIds = tupleArray.map(tuple => 
      {return tuple[1].$id;});

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

    if (this.state.addedForYouTuplesPriorToConf.length !== 0) {
      tupleArray = [...this.state.addedForYouTuplesPriorToConf, ...tupleArray];
    }

    let sortedForYou = tupleArray.sort(function (a, b) {
      return a[1].timeStamp - b[1].timeStamp;
    });

   // console.log('Final FORYOU!!', sortedForYou);

    this.setState({
      dsoForyouMessages: sortedForYou,
      isLoadingForyou: false,
    });
  };

  refreshGetDocsAndGetIdInfo = () => {
   // console.log("Refresh - Getting Documents and IdentityInfo");
    this.getDSOEveryoneDocs();
    this.handleStartQuerySeq(this.state.identity);

    if (!this.state.isLoadingEveryone && !this.state.isLoadingForyou) {
      this.setState({
        isLoadingRefresh: true,
      });
    } else {
      this.setState({
        isLoadingEveryone: true,
        isLoadingForyou: true,
      });
    }
  };

  //#######################################################################
  //   DOCUMENT CREATION

  submitDSODocument = (addedMessage, ownerIdArray) => {

    this.setState({
      isLoadingRefresh: true,
    });

  //  console.log(addedMessage);
    const clientOpts = {
      network: "testnet",
      wallet: {
        mnemonic: this.state.mnemonic,

        //adapter: LocalForage, 
        unsafeOptions: {
          skipSynchronizationBeforeHeight: this.state.mostRecentBlockHeight,
          // this.state.skipSynchronizationBeforeHeight,
         
        },
      },
      apps: {
        DSOContract: {
          contractId: 'DWz9TXjLhHT4Ztz1ctv1u9bzmrymVXzMpCPzhm5Dm1PP', // Your contract ID
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const submitDocuments = async () => {
      const { platform } = client;

     
      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      } // Your identity ID
      

      let docProperties = {};

/*dsomsg ->
      timeStamp, msg, sh, msgId(for reply)  (only first 2 are required)
*/

if(addedMessage.sh === 'out'){ 
        docProperties = {
          timeStamp: addedMessage.timeStamp,
          msg: addedMessage.msg,
          sh: 'out',
        };
}else {
  docProperties = {
    timeStamp: addedMessage.timeStamp,
    msg: addedMessage.msg,
  };
}

      // Create the note document
      const dsoDocument = await platform.documents.create(
        "DSOContract.dsomsg", /// I changed .note TO .dsomessage***
        identity,
        docProperties
      );

     // console.log(dsoDocument.toJSON());


      let dsoMessageAndTags;

     // console.log('OwnerIdArray of Tags: ',ownerIdArray);

      if (ownerIdArray.length !== 0) {
        let dsotags = await Promise.all(
          ownerIdArray.map(async (ownerId) => {
            //https://stackoverflow.com/questions/40140149/use-async-await-with-array-map

    //dsotag ->  timeStamp, toId, msgId (all required)

            let tagDoc = await platform.documents.create(
              "DSOContract.dsotag",
              identity,
              {
                toId: ownerId,
                msgId: dsoDocument.toJSON().$id,
                timeStamp: addedMessage.timeStamp,
              }
            );
            return tagDoc;
          })
        );

        dsoMessageAndTags = [dsoDocument, ...dsotags];
      } else {
        dsoMessageAndTags = [dsoDocument];
      }

      //THIS ^^^ IS WHAT IS PASSED TO THE DOCUMENT CREATION


      //############################################################
      //This below disconnects the document sending..***
      
      // this.addSentMessage(addedMessage);

      // return dsoMessageAndTags;

      //This is to disconnect the Document Creation***

      //############################################################

      
      this.addSentMessage(addedMessage);

      const documentBatch = {
        create: dsoMessageAndTags, // [dsoDocument], // Document(s) to create
      };

      return platform.documents.broadcast(documentBatch, identity);
    };


    submitDocuments()
      .then((d) => {
       // let submittedDoc = d;//.toJSON();
       // console.log(submittedDoc);
       console.log('Document Submission Completed');

        if(addedMessage.sh === 'out'){
          this.setState({
            addedForYouTuplesPriorToConf:
              this.state.addedForYouTuplesPriorToConf.slice(0,-1),
            addedEveryoneTuplesPriorToConf:
              this.state.addedEveryoneTuplesPriorToConf.slice(0,-1),
            isLoadingRefresh: false,
          });
        }else{ 
            this.setState({
              addedForYouTuplesPriorToConf:
                this.state.addedForYouTuplesPriorToConf.slice(0,-1),
              isLoadingRefresh: false,
            });
          }
        

        // console.log(submittedDoc);
      })
      .catch((e) => {
        this.setState({
          isLoadingRefresh: false,
        });
        console.error("Something went wrong:\n", e);
      })
      .finally(() => client.disconnect());
  };

  addSentMessage = (msgToAdd) => {

    let tupleToAdd = [this.state.uniqueName, msgToAdd];
    //console.log(msgToAdd);

if(msgToAdd.sh === 'out'){ 
  this.setState({
    addedForYouTuplesPriorToConf: [
      tupleToAdd,
       ...this.state.addedForYouTuplesPriorToConf,
    ],
    addedEveryoneTuplesPriorToConf: [
      tupleToAdd, 
      ...this.state.addedEveryoneTuplesPriorToConf,
    ],
    dsoEveryoneMessages: [
      tupleToAdd,
      ...this.state.dsoEveryoneMessages,
    ],
    dsoForyouMessages: [
      tupleToAdd,
      ...this.state.dsoForyouMessages,
    ],
    isLoadingRefresh: false,
  });
}else {
  this.setState({
    addedForYouTuplesPriorToConf: [
      tupleToAdd,
      ...this.state.addedForYouTuplesPriorToConf,
    ],
    dsoForyouMessages: [
      tupleToAdd,
      ...this.state.dsoForyouMessages,
    ],
    isLoadingRefresh: false,
  });
};

//console.log(this.state.addedForYouTuplesPriorToConf);
//console.log(this.state.dsoForyouMessages);

    //ALSO RECALL THE IDENTITY SO THAT IT WILL UPDATE THE CREDITS 
  };

  render() {

    this.state.mode === "primary"
      ? (document.body.style.backgroundColor = "rgb(280,280,280)")
      : (document.body.style.backgroundColor = "rgb(20,20,20)");

    this.state.mode === "primary"
      ? (document.body.style.color = "black")
      : (document.body.style.color = "white");

    return (
      <>
        <TopNav
          handleMode={this.handleMode}
          mode={this.state.mode}
          showModal={this.showModal}
          whichNetwork={this.state.whichNetwork}
          isLoggedIn={this.state.isLoggedIn}
          toggleExpandedNav={this.toggleExpandedNav}
          expandedTopNav={this.state.expandedTopNav}
        />
        <Image fluid="true" id="dash-bkgd" src={DashBkgd} alt="Dash Logo" />

        {!this.state.isLoggedIn ? (
          <>
            <LandingPage />
            <LoginBottomNav mode={this.state.mode} showModal={this.showModal} />
            <Footer />
          </>
        ) : (
          <>
            <MessagesPage
              isLoading={this.state.isLoading}
              isLoadingRefresh={this.state.isLoadingRefresh}
              isLoadingEveryone={this.state.isLoadingEveryone}
              isLoadingForyou={this.state.isLoadingForyou}
              identity={this.state.identity}
              identityInfo={this.state.identityInfo}
              uniqueName={this.state.uniqueName}
              dsoEveryoneMessages={this.state.dsoEveryoneMessages}
              dsoForyouMessages={this.state.dsoForyouMessages}
              mode={this.state.mode}
              showModal={this.showModal}
            />

            {!this.state.isLoading &&
            this.state.identity !== "No Identity" &&
            this.state.uniqueName !== "Er" ? (
              <BottomNav
                isLoadingRefresh={this.state.isLoadingRefresh}
                closeExpandedNavs={this.closeExpandedNavs}
                refreshGetDocsAndGetIdInfo={this.refreshGetDocsAndGetIdInfo}
                //Need to pass everything for TOPUP Function
                mode={this.state.mode}
                showModal={this.showModal}
              />
            ) : (
              <></>
            )}
          </>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "LoginSignupModal" ? (
          <LoginSignupModal
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            handleLoginwithMnem={this.handleLoginwithMnem}
            closeExpandedNavs={this.closeExpandedNavs}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "LogoutModal" ? (
          <LogoutModal
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            handleLogout={this.handleLogout}
            closeExpandedNavs={this.closeExpandedNavs}
          />
        ) : (
          <></>
        )}

{this.state.isModalShowing &&
        this.state.presentModal === "NewSOModal" ? (
          <NewSOModal
            whichNetwork={this.state.whichNetwork}
            uniqueName={this.state.uniqueName}
            submitDSODocument={this.submitDSODocument}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            closeExpandedNavs={this.closeExpandedNavs}
          />
        ) : (
          <></>
        )}

{this.state.isModalShowing &&
        this.state.presentModal === "NewDMModal" ? (
          <NewDMModal
            whichNetwork={this.state.whichNetwork}
            uniqueName={this.state.uniqueName}
            submitDSODocument={this.submitDSODocument}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            closeExpandedNavs={this.closeExpandedNavs}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "TopUpIdentityModal" ? (
          <TopUpIdentityModal
            triggerTopUpLoading={this.triggerTopUpLoading}
            updateCreditsAfterTopUp={this.updateCreditsAfterTopUp}
            mnemonic={this.state.mnemonic}
            whichNetwork={this.state.whichNetwork}
            skipSynchronizationBeforeHeight={
              this.state.skipSynchronizationBeforeHeight
            }
            identity={this.state.identity}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            closeExpandedNavs={this.closeExpandedNavs}
          />
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default App;

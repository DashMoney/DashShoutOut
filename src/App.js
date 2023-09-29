import React from "react";
import LocalForage from "localforage";

import Image from "react-bootstrap/Image";

//import Alert from "react-bootstrap/Alert";

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
import NewThreadModal from "./Components/NewThreadModal";
import SendTipModal from "./Components/SendTipModal";


import TopUpIdentityModal from "./Components/TopUpIdentityModal";

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
      isLoadingWallet: true,
      isLoadingRefresh: false, //-> WHAT IS THIS CONNECTED TO ? ->
      errorToDisplay: false,

      isLoadingEveryone: true,

      isLoadingForYou: true,

      mode: "dark",
      presentModal: "",
      isModalShowing: false,
      whichNetwork: "testnet",

      mnemonic: "",
      identity: "",
      identityInfo: "",
      identityRaw: "",
      uniqueName: "",
      messagePriorToSubmit: "",

      EveryoneMsgs: [],
      EveryoneNames: [],

      Everyone1:false, //2 threads -> msg names and thread names
      Everyone2:false,

      ForYou1:false, //4 threads -> 2 by 2 path but could have zero on either of the paths?? ->
      ForYou2:false,
      ForYou3:false,
      ForYou4:false,

      ByYouMsgs: [],
      ByYouNames: [],

      FromTagsMsgs: [],
      FromTagsNames: [],

      //Below is the new Thread state
      EveryoneThreads: [],
      EveryoneThreadsNames: [],

      ByYouThreads: [],
      ByYouThreadsNames: [],

      FromTagsThreads: [],
      FromTagsThreadsNames: [],

      ThreadMessageId: "",
      //Above is the new Thread state

//*** *** *** *** ***

      //BELOW Most Recent Initial For You 
      Initial1: false,
      Initial2: false,
      Initial3: false,
      Initial4: false,

      InitialByYouMsgs: [],
      InitialByYouNames: [],

      InitialFromTagsMsgs: [],
      InitialFromTagsNames: [],

      InitialByYouThreads: [],
      InitialByYouThreadsNames: [],

      InitialFromTagsThreads: [],
      InitialFromTagsThreadsNames: [],

      //ABOVE Most Recent Initial For You 

//*** *** *** *** ***

      //BELOW AutoUpdate Arrays
      NewSO1:false,
      NewSO2:false,

      NewSONames: [], 
      NewSOMsgs: [],

      NewSOThreadsNames: [], 
      NewSOThreads: [],

      NewDM1:false,
      NewDM2:false,
      NewDM3:false,

      //NewDMByYouNames: [], //Not required bc user would make themselves
      //NewDMByYouMsgs: [],

      NewDMByYouThreadsNames: [], 
      NewDMByYouThreads: [],

      NewDMFromTagsNames: [], 
      NewDMFromTagsMsgs: [],

      NewDMFromTagsThreadsNames: [], 
      NewDMFromTagsThreads: [],

      //Above AutoUpdate Arrays^^^^

      Submit1: false,
      Submit2: false,

      //DocumentSubmissionSeparatation^^^^

      walletId: "",

      accountBalance: "",
      accountAddress: "",

      mostRecentLogin: false,

      platformLogin: false,
      skipSynchronizationBeforeHeight: 910000,
      mostRecentBlockHeight: 910000,

      DataContractDSO: '78QiKDzfCAhLxMiwiD393fDZM3gcXAprVL1F3td1aFxV', //v025notimeStamp
      DataContractDPNS: "GWRSAVFMjXx8HpQFaNJMqBV7MBgMK4br5UESsB4S31Ec",

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

  handleThread = (msgDocId) => {
    if (!this.state.isLoadingRefresh) {
      this.setState(
        {
          ThreadMessageId: msgDocId,
        },
        () => this.showModal("NewThreadModal")
      );
    }
  };

  handleLogout = () => {
    this.setState(
      {
        isLoggedIn: false,
        isLoading: false,
        isLoadingRefresh: false,
        errorToDisplay: false,
  
        isLoadingEveryone: true,
        isLoadingForYou: true,
  
        mode: "dark",
        presentModal: "",
        isModalShowing: false,
        whichNetwork: "testnet",
  
        mnemonic: "",
        identity: "",
        identityInfo: "",
        identityRaw: "",
        uniqueName: "",
        messagePriorToSubmit: "",
  
        EveryoneMsgs: [],
        EveryoneNames: [],
  
        Everyone1:false, 
        Everyone2:false,
  
        ForYou1:false, 
        ForYou2:false,
        ForYou3:false,
        ForYou4:false,
  
        ByYouMsgs: [],
        ByYouNames: [],
  
        FromTagsMsgs: [],
        FromTagsNames: [],
  
        EveryoneThreads: [],
        EveryoneThreadsNames: [],
  
        ByYouThreads: [],
        ByYouThreadsNames: [],
  
        FromTagsThreads: [],
        FromTagsThreadsNames: [],
  
        ThreadMessageId: "",
        
        Initial1: false,
        Initial2: false,
        Initial3: false,
        Initial4: false,
  
        InitialByYouMsgs: [],
        InitialByYouNames: [],
  
        InitialFromTagsMsgs: [],
        InitialFromTagsNames: [],
  
        InitialByYouThreads: [],
        InitialByYouThreadsNames: [],
  
        InitialFromTagsThreads: [],
        InitialFromTagsThreadsNames: [],
  
        NewSO1:false,
        NewSO2:false,
  
        NewSONames: [], 
        NewSOMsgs: [],
  
        NewSOThreadsNames: [], 
        NewSOThreads: [],
  
        NewDM1:false,
        NewDM2:false,
        NewDM3:false,
  
        NewDMByYouThreadsNames: [], 
        NewDMByYouThreads: [],
  
        NewDMFromTagsNames: [], 
        NewDMFromTagsMsgs: [],
  
        NewDMFromTagsThreadsNames: [], 
        NewDMFromTagsThreads: [],
  
        walletId: "",

        accountBalance: "",
        accountAddress: "",

        mostRecentLogin: false,
  
        platformLogin: false,
        skipSynchronizationBeforeHeight: 910000,
        mostRecentBlockHeight: 910000,
  
        expandedTopNav: false,
      },
      () => this.componentDidMount()
    );
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
          //this.handleStartQuerySeq(val.identity); //NO -> Only call when sure!!!!
          this.handleInitialForYouLogin(val.identity);

          this.setState({
            walletId: val.walletId,
            identity: val.identity,
            uniqueName: val.name,
          });
        } else {
          console.log("There is no mostRecentWalletId");
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
        console.log("Most Recent Block Height:\n", blockHeight);
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
        //console.log(keys);
      })
      .catch(function (err) {
        console.log(err);
      });

    this.getDSOEveryoneDocs();
  }

  handleInitialForYouLogin = (theIdentity) => {
    this.getInitialByyouDocs(theIdentity);
    this.getInitialForyouFromOthersTags(theIdentity);
  }

  handleLoginwithMnem = (theMnemonic) => {
    if (this.state.LocalForageKeys.length === 0) {
      this.setState(
        {
          isLoggedIn: true,
          //isLoading: true,
          //isLoadingEveryone: true,
          //isLoadingForYou: true,
          mnemonic: theMnemonic,
        },
        () => this.getIdentitywithMnem(theMnemonic)
      );
    } else {
      this.setState(
        {
          isLoggedIn: true,
          mnemonic: theMnemonic,
        },
        () => this.checkPlatformOnlyLogin(theMnemonic)
      );
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
      //console.log("walletIdToTry:", walletIdToTry);

      return walletIdToTry === this.state.walletId;
    };

    createWallet()
      .then((mostRecentMatch) => {
        console.log(`Most Recent Matches -> ${mostRecentMatch}`);

        if (!mostRecentMatch) {
          let isKeyAvail = this.state.LocalForageKeys.includes(walletIdToTry);
          //console.log(`LocalForage Test -> ${isKeyAvail}`);

          if (isKeyAvail) {
            console.log("This here is a login skip!!");

            LocalForage.getItem(walletIdToTry)
              .then((val) => {
                //console.log("Value Retrieved", val);

                if (
                  val !== null ||
                  typeof val.identity !== "string" ||
                  val.identity === "" ||
                  val.name === "" ||
                  typeof val.name !== "string"
                ) {
                  this.setState(
                    {
                      platformLogin: true,
                      identity: val.identity,
                      uniqueName: val.name,
                      walletId: walletIdToTry,
                      isLoading: false,
                      //isLoadingEveryone: true,
                      //isLoadingForYou: true,

                      // ByYouMsgs: [],
                      // ByYouNames: [],

                      // FromTagsMsgs: [],
                      // FromTagsNames: [],

                      //maintain Loading bc continuing to other functions
                    },
                    () => this.handleStartQuerySeq(val.identity)
                  );
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
                      //console.log("Return from LF setitem:", d);
                    })
                    .catch((err) => {
                      console.error(
                        "Something went wrong setting to localForage:\n",
                        err
                      );
                    });
                  //******************** */
                } else { //This is if the LocalForage return fails to validate
                  //console.log("platform login failed");
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
            this.setState(
              {
                //This is for if no platform login at all. resets
                identityInfo: "",
                identityRaw: "",
                uniqueName: "",

                //isLoadingForYou: true,
                //NO MORE INITIAL PULL SO DON'T CLEAR
                // ByYouMsgs: [],
                // ByYouNames: [],
                      
                // FromTagsMsgs: [],
                // FromTagsNames: [],

              },
              () => this.getIdentitywithMnem(theMnemonic)
            );
          }
        } //Closes mostRecentMatch
        else {
          this.setState({

            mostRecentLogin:true, 

            platformLogin: true,
            isLoading: false,
            //isLoadingEveryone: false,
            //isLoadingForYou: false,
          },
          () => this.handleMostRecentLogin(this.state.identity));
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };
  //This will change when I bring in the full wallet for the top up ability ->

  ///****************************************************************** */

  handleMostRecentLogin = (theIdentity) => {
    
    if (this.state.Initial1 &&
          this.state.Initial2 &&
            this.state.Initial3 &&
              this.state.Initial4) {
        this.setState({
          ByYouMsgs: this.state.InitialByYouMsgs,
          ByYouNames: this.state.InitialByYouNames,
    
          FromTagsMsgs: this.state.InitialFromTagsMsgs,
          FromTagsNames: this.state.InitialFromTagsNames,
    
          ByYouThreads: this.state.InitialByYouThreads,
          ByYouThreadsNames: this.state.InitialByYouThreadsNames,
    
          FromTagsThreads: this.state.InitialFromTagsThreads,
          FromTagsThreadsNames: this.state.InitialFromTagsThreadsNames,

          isLoadingForYou: false,
      });      
    }
    // next 
    this.getIdentityInfo(theIdentity);
  } 

  handleStartQuerySeq = (theIdentity) => {
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
      //console.log(walletIdToTry);

      return account.identities.getIdentityIds();
    };

    retrieveIdentityIds()
      .then((d) => {
        //console.log("Mnemonic identities:\n", d);
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
    if (!this.state.platformLogin) {
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
        //console.log("Name retrieved:\n", nameRetrieved);

        //******************** */
        //CREATE AN OBJECT AND PUT IT IN THERE!!!
        let lfObject = {
          identity: theIdentity,
          name: nameRetrieved.label,
        };

        LocalForage.setItem(this.state.walletId, lfObject)
          .then((d) => {
            //return LocalForage.getItem(walletId);
            //console.log("Return from LF setitem:", d);
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
            //console.log("Return from LF setitem:", d);
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
        //console.log("There is no dashUniqueIdentityId to retrieve");
        this.setState({
          isLoading: false,
          uniqueName: "Er",
        });
      })
      .finally(() => client.disconnect());
  };

  //&&&&&&&&&&&&&&&&&&&&&&&&&

  getIdentityInfo = (theIdentity) => {
    console.log("Called get id info");

    const client = new Dash.Client({ network: this.state.whichNetwork });

    const retrieveIdentity = async () => {
      return client.platform.identities.get(theIdentity); // Your identity ID
    };

    retrieveIdentity()
      .then((d) => {
        //console.log("Identity retrieved:\n", d.toJSON());

        this.setState({
          identityInfo: d.toJSON(),
          identityRaw: d,
          //isLoading: false,
        });

        //*** *** *** *** ***

        
        this.getWalletwithMnem(this.state.mnemonic);

        setInterval(()=>this.autoUpdateEveryoneHelper(), 30000);
        setInterval(()=>this.autoUpdateForYouHelper(), 30000); 

        //*** *** *** *** ***
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);

        // this.setState({
        //   isLoading: false,
        // });
      })
      .finally(() => client.disconnect());
  };

  updateIdentityInfo = () => {
    console.log("Called update id info");

    this.setState({
      identityInfo: '',
    })

    const client = new Dash.Client({ network: this.state.whichNetwork });

    const retrieveIdentity = async () => {
      return client.platform.identities.get(this.state.identity); // Your identity ID
    };

    retrieveIdentity()
      .then((d) => {
        //console.log("Identity retrieved:\n", d.toJSON());

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

  getWalletwithMnem = (theMnemonic) => {

    const client = new Dash.Client({
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: theMnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight: this.state.skipSynchronizationBeforeHeight,
        },
      },
    });

    const retrieveIdentityIds = async () => {
      const account = await client.getWalletAccount();
      //console.log(account);
      //console.log(account.getTotalBalance());
      // console.log(account.getUnusedAddress().address);
      //console.log('TX History: ', account.getTransactionHistory());

      this.setState({
        //accountWallet: client, //Can I use this for the send TX?-> NO
        accountBalance: account.getTotalBalance(),
        accountAddress: account.getUnusedAddress().address, //This can be used if you havent created the DGMDocument <-
        //accountHistory: account.getTransactionHistory(),
      });


      return true;
    };

    retrieveIdentityIds()
      .then((d) => {
        console.log("Wallet Loaded:\n", d);
        this.setState({
          isLoadingWallet: false,
        });
        //This if - handles if there is an identity or not
        // if (d.length === 0) {
        //   this.setState({
        //     isLoading: false,
        //     identity: "No Identity",
        //   });
        // } else {
        //   this.setState(
        //     {
        //       identity: d[0],
        //       isLoading: false,
        //       //maintain Loading bc continuing to other functions
        //     }
        //   );
        // }
      })
      .catch((e) => {
        console.error("Something went wrong getting Wallet:\n", e);
        this.setState({
          isLoadingWallet: false,
          isLoading: false,
          identity: "Identity Error",
        });
      })
      .finally(() => client.disconnect());
  };

  //#######################################################################
  //START - Everyone: Msgs and Threads

  checkEveryoneRace = () => {
    if (this.state.Everyone1 && this.state.Everyone2) {
      this.setState({
        isLoadingEveryone: false,
        isLoadingRefresh: false,
      });
    }
  };

  getDSOEveryoneDocs = () => {
    
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DSOContract: {
          contractId: this.state.DataContractDSO, // Your contract ID
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const getDocuments = async () => {
      return client.platform.documents.get("DSOContract.dsomsg", {
        limit: 60,
        where: [
          ["sh", "==", "out"],
          ['$createdAt', '<=' , Date.now()]
    ],
    orderBy: [
    ['$createdAt', 'desc'],
  ],
      });
    };

    getDocuments()
      .then((d) => {
        //Should never be 0 so not handling that case.

        let docArray = [];
        console.log("Getting Everyone DSO Docs");
        for (const n of d) {
          //console.log("EveryoneMsgs:\n", n.toJSON());
          docArray = [...docArray, n.toJSON()];
        }

        if (docArray.length !== 0) {
          this.getDSOEveryoneNames(docArray);
          this.getEveryoneThreads(docArray);
          // this.setState({
          //   EveryoneMsgs: docArray,
          // });
          //^^^SET IN STATE IN NAMES TO REDUCE SETSTATE CALLS!!
        }
      })
      .catch((e) => {
        console.error("Something went wrong in getDSOEveryoneDocs:\n", e);
        this.setState({
          isLoadingEveryone: false,
          isLoadingRefresh: false,
        });
      }).finally(() => client.disconnect());
  };

  getDSOEveryoneNames = (docArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DPNS: {
          contractId: this.state.DataContractDPNS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    let ownerarrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(ownerarrayOfOwnerIds)];

    let arrayOfOwnerIds = [...setOfOwnerIds];

    //console.log("Calling getNamesforDSOmsgs");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNS.domain", {
        where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
        orderBy: [["records.dashUniqueIdentityId", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        //WHAT IF THERE ARE NO NAMES? -> Then function won't be called
        if (d.length === 0) {
          console.log("No everyone msgs Names retrieved.");
        }

        let nameDocArray = [];

        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }
        //console.log(`DPNS Name Docs: ${nameDocArray}`);

        this.setState(
          {
            EveryoneNames: nameDocArray,
            EveryoneMsgs: docArray,
            Everyone1: true,
          },
          () => this.checkEveryoneRace()
        );
      })
      .catch((e) => {
        console.error("Something went wrong getting Everyone Msgs Names:\n", e);
        this.setState({
          isLoadingEveryone: false,
          isLoadingRefresh: false,
        });
      }).finally(() => client.disconnect());
  };

  getEveryoneThreads = (docArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DSOContract: {
          contractId: this.state.DataContractDSO,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    // This Below is to get unique set of order doc ids
    let arrayOfMsgIds = docArray.map((doc) => {
      return doc.$id;
    });

    //console.log("Array of Msg ids", arrayOfMsgIds);

    let setOfMsgIds = [...new Set(arrayOfMsgIds)];

    arrayOfMsgIds = [...setOfMsgIds];

    //console.log("Array of Msg ids", arrayOfMsgIds);

    const getDocuments = async () => {
      //console.log("Called Get Everyone Threads");

      return client.platform.documents.get("DSOContract.dsothr", {
        where: [["msgId", "in", arrayOfMsgIds]], 
        orderBy: [["msgId", "asc"]],
      });
    };

    getDocuments()
      .then((d) => {
        let docArray = [];

        for(const n of d) {
          let returnedDoc = n.toJSON()
           //console.log("Thr:\n", returnedDoc);
           returnedDoc.msgId = Identifier.from(returnedDoc.msgId, 'base64').toJSON();
           //console.log("newThr:\n", returnedDoc);
          docArray = [...docArray, returnedDoc];
        }

        if (docArray.length === 0) {
          this.setState(
            {
              EveryoneThreads: docArray, //this has nothing
              Everyone2: true,
            },
            () => this.checkEveryoneRace()
          );
        } else {
          this.getEveryoneThreadsNames(docArray); //Name Retrieval
          // this.setState({
          //   EveryoneThreads: docArray,
          // });
          //^^^SET IN STATE IN NAMES TO REDUCE SETSTATE CALLS!!
        }
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          EveryoneThreadsError: true, //handle error ->
          //isLoadingEveryone: false,
        });
      })
      .finally(() => client.disconnect());
  };

  getEveryoneThreadsNames = (docArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DPNS: {
          contractId: this.state.DataContractDPNS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    let arrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(arrayOfOwnerIds)];

    arrayOfOwnerIds = [...setOfOwnerIds];

    //console.log("Called Get Everyone Threads Names");
    //console.log(arrayOfOwnerIds);

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNS.domain", {
        where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
        orderBy: [["records.dashUniqueIdentityId", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        if (d.length === 0) {
          console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];

        for(const n of d) {
          //console.log("NameDoc:\n", n.toJSON());
          nameDocArray = [n.toJSON(), ...nameDocArray];
        }

        this.setState(
          {
            EveryoneThreadsNames: nameDocArray,
            EveryoneThreads: docArray,
            Everyone2: true,
          },
          () => this.checkEveryoneRace()
        );
      })
      .catch((e) => {
        console.error(
          "Something went wrong getting Everyone Threads Names:\n",
          e
        );
        this.setState({
          EveryoneThreadsNamesError: true, //<- add to state? ->
          isLoadingEveryone: false,
          isLoadingRefresh: false,
        });
      }).finally(() => client.disconnect());
  };
  //END - Everyone: Msgs and Threads

  //######### ########### ########### ############ ########

  checkForYouRace = () => {
    if (this.state.ForYou1 &&
          this.state.ForYou2 &&
            this.state.ForYou3 &&
              this.state.ForYou4) {
      this.setState({
        isLoadingForYou: false,
        isLoadingRefresh: false,
      });
    }
  };

  //START - ForYou: Msgs and Threads
  getDSOForyouByyouDocs = (theIdentity) => {
    //console.log("Calling dsoForYouFromyouDocs");

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DSOContract: {
          contractId: this.state.DataContractDSO, // Your contract ID
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
          ['$createdAt', '<=' , Date.now()]
    ],
    orderBy: [
    ['$createdAt', 'desc'],
  ],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("There are no ForyouByyouMsgs");

          this.setState(
            {
              ForYou1: true,
              ForYou2: true,
            },
            () => this.checkForYouRace()
          );
        } else {
          let docArray = [];
          
          for (const n of d) {
            //console.log("ByYouMsgs:\n", n.toJSON());
            docArray = [...docArray, n.toJSON()];
          }
          this.getForyouByyouNames(docArray);
          this.getByYouThreads(docArray);
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  getForyouByyouNames = (docArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DPNS: {
          contractId: this.state.DataContractDPNS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);
    //START OF NAME RETRIEVAL

    let ownerarrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(ownerarrayOfOwnerIds)];

    let arrayOfOwnerIds = [...setOfOwnerIds];

    //console.log("Calling getNamesforyouDSOmsgs");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNS.domain", {
        where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
        orderBy: [["records.dashUniqueIdentityId", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        //WHAT IF THERE ARE NO NAMES? -> THEN THIS WON'T BE CALLED
        if (d.length === 0) {
          //console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];

        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }
        //console.log(`DPNS Name Docs: ${nameDocArray}`);

        this.setState(
          {
            ByYouNames: nameDocArray,
            ByYouMsgs: docArray,
            ForYou1: true,
          },
          () => this.checkForYouRace()
        );
      })
      .catch((e) => {
        console.error("Something went wrong getting Everyone Names:\n", e);
      }).finally(() => client.disconnect());
    //END OF NAME RETRIEVAL
  }; //SENDS TO COMBINE MESSAGES

      getByYouThreads = (docArray) => {
        const clientOpts = {
          network: this.state.whichNetwork,
          apps: {
            DSOContract: {
              contractId: this.state.DataContractDSO,
            },
          },
        };
        const client = new Dash.Client(clientOpts);

        // This Below is to get unique set of ByYou msg doc ids
        let arrayOfMsgIds = docArray.map((doc) => {
          return doc.$id;
        });

        //console.log("Array of ByYouThreads ids", arrayOfMsgIds);

        let setOfMsgIds = [...new Set(arrayOfMsgIds)];

        arrayOfMsgIds = [...setOfMsgIds];

        //console.log("Array of order ids", arrayOfMsgIds);

        const getDocuments = async () => {
          //console.log("Called Get ByYou Threads");

          return client.platform.documents.get("DSOContract.dsothr", {
            where: [["msgId", "in", arrayOfMsgIds]], // check msgId ->
            orderBy: [["msgId", "asc"]],
          });
        };

        getDocuments()
          .then((d) => {
            let docArray = [];

            for(const n of d) {
              let returnedDoc = n.toJSON()
               //console.log("Thr:\n", returnedDoc);
               returnedDoc.msgId = Identifier.from(returnedDoc.msgId, 'base64').toJSON();
               //console.log("newThr:\n", returnedDoc);
              docArray = [...docArray, returnedDoc];
            }

            if (docArray.length === 0) {
              this.setState(
                {
                  ForYou2: true,
                },
                () => this.checkForYouRace()
              );
            } else {
              this.getByYouThreadsNames(docArray); //Name Retrieval
            }
          })
          .catch((e) => {
            console.error("Something went wrong ByYouThreads:\n", e);
            this.setState({
              ByYouThreadsError: true, //handle error ->
              isLoadingForYou: false,
            });
          })
          .finally(() => client.disconnect());
      };

      getByYouThreadsNames = (docArray) => {
        const clientOpts = {
          network: this.state.whichNetwork,
          apps: {
            DPNS: {
              contractId: this.state.DataContractDPNS,
            },
          },
        };
        const client = new Dash.Client(clientOpts);

        let arrayOfOwnerIds = docArray.map((doc) => {
          return doc.$ownerId;
        });

        let setOfOwnerIds = [...new Set(arrayOfOwnerIds)];

        arrayOfOwnerIds = [...setOfOwnerIds];


        //console.log("Called Get ByYou Threads Names");

        const getNameDocuments = async () => {
          return client.platform.documents.get("DPNS.domain", {
            where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
            orderBy: [["records.dashUniqueIdentityId", "asc"]],
          });
        };

        getNameDocuments()
          .then((d) => {
            if (d.length === 0) {
              console.log("No DPNS domain documents retrieved.");
            }

            let nameDocArray = [];
            for (const n of d) {
              //console.log("NameDoc:\n", n.toJSON());

              nameDocArray = [n.toJSON(), ...nameDocArray];
            }

            this.setState(
              {
                ByYouThreadsNames: nameDocArray,
                ByYouThreads: docArray,
                ForYou2: true,
              },
              () => this.checkForYouRace()
            );
          })
          .catch((e) => {
            console.error(
              "Something went wrong getting ByYouThreadsNames:\n",
              e
            );
            this.setState({
              ByYouThreadsNamesError: true, //<- add to state? ->
              
            });
          })
          .finally(() => client.disconnect());
      };
  //END - ForYou: Msgs and Threads

  //START - ForYou TAGS: Msgs and Threads
  getDSOForyouFromOthersTags = (theIdentity) => {
    //console.log("Calling dsoForYouOthersTags");

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DSOContract: {
          contractId: this.state.DataContractDSO, // Your contract ID
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
          ['$createdAt', '<=' , Date.now()]
    ],
    orderBy: [
    ['$createdAt', 'desc'],
  ],
      });
    };

    getTagsFromtoUserIdYourOwnerId()
      .then((d) => {
        if (d.length !== 0) {
          let docArray = [];
          
          for(const n of d) {
            let returnedDoc = n.toJSON()
             //console.log("Thr:\n", returnedDoc);
             returnedDoc.msgId = Identifier.from(returnedDoc.msgId, 'base64').toJSON();
             //console.log("newThr:\n", returnedDoc);
            docArray = [...docArray, returnedDoc];
          }

          let msgIdArray = docArray.map((doc) => {
            return doc.msgId;
          });

          //console.log(`MessageID Array: ${msgIdArray}`);

          //NEXT GET THE MSGS FROM THE TAGS msgIds************
          this.getDSOmsgsFromTags(msgIdArray);
          //NEXT GET THE MSGS FROM THE TAGS msgIds************

        } else {
          console.log("No Tags for this user.");
          
          this.setState(
            {
              ForYou3: true,
              ForYou4: true,
            },
            () => this.checkForYouRace()
          );
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  getDSOmsgsFromTags = (idsOfMsgsFromTags) => {
    //console.log("Getting MSGs from Tags");

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DSOContract: {
          contractId: this.state.DataContractDSO, // Your contract ID
        },
      },
    };
    let client = new Dash.Client(clientOpts);

    //console.log(`Array of MsgIds: ${arrayOfMSGIds}`);

    const getDocuments = async () => {
      return client.platform.documents.get("DSOContract.dsomsg", {
        where: [["$id", "in", idsOfMsgsFromTags]],
        orderBy: [["$id", "asc"]],
      });
    };

    getDocuments()
      .then((d) => {
        let docArray = [];

        if (d.length === 0) {
          console.log("There are not FromTagsMsgs");
        } else {
          for (const n of d) {
            //console.log("Document:\n", n.toJSON());
            docArray = [...docArray, n.toJSON()];
          }

          this.getDSOmsgsFromTagsNames(docArray);
          this.getFromTagsThreads(docArray);

          // this.setState({
          //   FromTagsMsgs: docArray,
          // });
            //SET IN STATE IN NAMES TO REDUCE SETSTATE CALLS!!
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  getDSOmsgsFromTagsNames = (docArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DPNS: {
          contractId: this.state.DataContractDPNS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);
    //START OF NAME RETRIEVAL

    let ownerarrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(ownerarrayOfOwnerIds)];

    let arrayOfOwnerIds = [...setOfOwnerIds];

    arrayOfOwnerIds = arrayOfOwnerIds.map((item) =>
      Buffer.from(Identifier.from(item))
    );

    //console.log("Calling getNamesforDSOmsgs");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNS.domain", {
        where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
        orderBy: [["records.dashUniqueIdentityId", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        //WHAT IF THERE ARE NO NAMES? -> THEN THIS WON'T BE CALLED
        if (d.length === 0) {
          //console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];

        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }
        //console.log(`DPNS Name Docs: ${nameDocArray}`);

        this.setState(
          {
            FromTagsNames: nameDocArray,
            FromTagsMsgs: docArray,
            ForYou3: true,
          },
          () => this.checkForYouRace()
        );
      })
      .catch((e) => {
        console.error("Something went wrong getting ForYou Tags Names:\n", e);
      }).finally(() => client.disconnect());
    //END OF NAME RETRIEVAL
  }; 

      getFromTagsThreads = (docArray) => {
        const clientOpts = {
          network: this.state.whichNetwork,
          apps: {
            DSOContract: {
              contractId: this.state.DataContractDSO,
            },
          },
        };
        const client = new Dash.Client(clientOpts);

        // This Below is to get unique set of ByYou msg doc ids
        let arrayOfMsgIds = docArray.map((doc) => {
          return doc.$id;
        });

        //console.log("Array of ByYouThreads ids", arrayOfMsgIds);

        let setOfMsgIds = [...new Set(arrayOfMsgIds)];

        arrayOfMsgIds = [...setOfMsgIds];

        //console.log("Array of order ids", arrayOfMsgIds);

        const getDocuments = async () => {
          //console.log("Called Get FromTags Threads");

          return client.platform.documents.get("DSOContract.dsothr", {
            where: [["msgId", "in", arrayOfMsgIds]], // check msgId ->
            orderBy: [["msgId", "asc"]],
          });
        };

        getDocuments()
          .then((d) => {
            let docArray = [];

            for (const n of d) {
              let returnedDoc = n.toJSON()
              //console.log("Thr:\n", returnedDoc);
              returnedDoc.msgId = Identifier.from(returnedDoc.msgId, 'base64').toJSON();
              //console.log("newThr:\n", returnedDoc);
             docArray = [...docArray, returnedDoc];
            }
            

            if (docArray.length === 0) {
              this.setState(
                {
                  ForYou4: true,
                },
                () => this.checkForYouRace()
              );
            } else {
              this.getFromTagsThreadsNames(docArray); //Name Retrieval

            }
          })
          .catch((e) => {
            console.error("Something went wrong ByYouThreads:\n", e);
            this.setState({
              FromTagsThreadsError: true, //handle error ->
              //isLoadingForYou: false,
            });
          })
          .finally(() => client.disconnect());
      };

      getFromTagsThreadsNames = (docArray) => {
        const clientOpts = {
          network: this.state.whichNetwork,
          apps: {
            DataContractDPNS: {
              contractId: this.state.DataContractDPNS,
            },
          },
        };
        const client = new Dash.Client(clientOpts);

        let arrayOfOwnerIds = docArray.map((doc) => {
          return doc.$ownerId;
        });

        let setOfOwnerIds = [...new Set(arrayOfOwnerIds)];

        arrayOfOwnerIds = [...setOfOwnerIds];

        arrayOfOwnerIds = arrayOfOwnerIds.map((item) =>
          Buffer.from(Identifier.from(item))
        );

        //console.log("Called Get FromTags Threads Names");

        const getNameDocuments = async () => {
          return client.platform.documents.get("DataContractDPNS.domain", {
            where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
            orderBy: [["records.dashUniqueIdentityId", "asc"]],
          });
        };

        getNameDocuments()
          .then((d) => {
            if (d.length === 0) {
              //console.log("No DPNS domain documents retrieved.");
            }

            let nameDocArray = [];
            for (const n of d) {
              //console.log("NameDoc:\n", n.toJSON());

              nameDocArray = [n.toJSON(), ...nameDocArray];
            }

            this.setState(
              {
                FromTagsThreadsNames: nameDocArray,
                FromTagsThreads: docArray,
                ForYou4: true,
              },
              () => this.checkForYouRace()
            );
          })
          .catch((e) => {
            console.error(
              "Something went wrong getting FromTagsThreadsNames:\n",
              e
            );
            this.setState({
              FromTagsThreadsNamesError: true, //<- add to state? ->
              
            });
          })
          .finally(() => client.disconnect());
      };
  //END - ForYou TAGS: Msgs and Threads

  //######################################################

sendATip = () =>{
  //Need Identity Credit Transfer
  console.log('This should implement Identity Credit Transfers')

}

  //######### ########### ########### ############ ########

  checkInitialForYouRace = () => {
    
    if (this.state.Initial1 &&
          this.state.Initial2 &&
            this.state.Initial3 &&
              this.state.Initial4) {
      if(this.state.mostRecentLogin){
        
        this.setState({
          ByYouMsgs: this.state.InitialByYouMsgs,
          ByYouNames: this.state.InitialByYouNames,

          ByYouThreads: this.state.InitialByYouThreads,
          ByYouThreadsNames: this.state.InitialByYouThreadsNames,
    
          FromTagsMsgs: this.state.InitialFromTagsMsgs,
          FromTagsNames: this.state.InitialFromTagsNames,
    
          FromTagsThreads: this.state.InitialFromTagsThreads,
          FromTagsThreadsNames: this.state.InitialFromTagsThreadsNames,

          isLoadingForYou: false,
      });
      }
      
    }
  };

  //START MOST RECENT INITIAL - ForYou: Msgs and Threads
  getInitialByyouDocs = (theIdentity) => {
    //Add the thread call
    //console.log("Calling dsoForYouFromyouDocs");

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DSOContract: {
          contractId: this.state.DataContractDSO, // Your contract ID
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
          ['$createdAt', '<=' , Date.now()]
    ],
    orderBy: [
    ['$createdAt', 'desc'],
  ],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          console.log("There are no ForyouByyouMsgs");

          this.setState(
            {
              Initial1: true,
              Initial2: true,
            },
            () => this.checkInitialForYouRace()
          );
        } else {
          let docArray = [];
          //console.log("Getting ForyouByyouMsgs");
          for (const n of d) {
           // console.log("Document:\n", n.toJSON());
            docArray = [...docArray, n.toJSON()];
          }
          this.getInitialForyouByyouNames(docArray);
          this.getInitialByYouThreads(docArray);
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  getInitialForyouByyouNames = (docArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DPNS: {
          contractId: this.state.DataContractDPNS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);
    //START OF NAME RETRIEVAL

    let ownerarrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(ownerarrayOfOwnerIds)];

    let arrayOfOwnerIds = [...setOfOwnerIds];

    //console.log("Calling getNamesforDSOmsgs");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNS.domain", {
        where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
        orderBy: [["records.dashUniqueIdentityId", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        //WHAT IF THERE ARE NO NAMES? -> THEN THIS WON'T BE CALLED
        if (d.length === 0) {
          //console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];

        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }
        //console.log(`DPNS Name Docs: ${nameDocArray}`);

        this.setState(
          {
            InitialByYouNames: nameDocArray,
            InitialByYouMsgs: docArray,
            Initial1: true,
          },
          () => this.checkInitialForYouRace()
        );
      })
      .catch((e) => {
        console.error("Something went wrong getting InitialByYou Names:\n", e);
      }).finally(() => client.disconnect());
    //END OF NAME RETRIEVAL
  }; 

      getInitialByYouThreads = (docArray) => {
        //CHANGE from everyone to foryou ->
        const clientOpts = {
          network: this.state.whichNetwork,
          apps: {
            DSOContract: {
              contractId: this.state.DataContractDSO,
            },
          },
        };
        const client = new Dash.Client(clientOpts);

        // This Below is to get unique set of ByYou msg doc ids
        let arrayOfMsgIds = docArray.map((doc) => {
          return doc.$id;
        });

        //console.log("Array of ByYouThreads ids", arrayOfMsgIds);

        let setOfMsgIds = [...new Set(arrayOfMsgIds)];

        arrayOfMsgIds = [...setOfMsgIds];

        //console.log("Array of Msg ids", arrayOfMsgIds);

        const getDocuments = async () => {
          //console.log("Called Get InitialByYou Threads");

          return client.platform.documents.get("DSOContract.dsothr", {
            where: [["msgId", "in", arrayOfMsgIds]], // check msgId ->
            orderBy: [["msgId", "asc"]],
          });
        };

        getDocuments()
          .then((d) => {
            let docArray = [];
            

            for(const n of d) {
              let returnedDoc = n.toJSON()
               //console.log("Thr:\n", returnedDoc);
               returnedDoc.msgId = Identifier.from(returnedDoc.msgId, 'base64').toJSON();
               //console.log("newThr:\n", returnedDoc);
              docArray = [...docArray, returnedDoc];
            }

            if (docArray.length === 0) {
              this.setState(
                {
                  Initial2: true,
                },
                () => this.checkInitialForYouRace()
              );
            } else {
              this.getInitialByYouThreadsNames(docArray); //Name Retrieval
            }
          })
          .catch((e) => {
            console.error("Something went wrong InitialByYouThreads:\n", e);
            this.setState({
              InitialByYouThreadsError: true, //handle error ->
            });
          })
          .finally(() => client.disconnect());
      };

      getInitialByYouThreadsNames = (docArray) => {
        const clientOpts = {
          network: this.state.whichNetwork,
          apps: {
            DPNS: {
              contractId: this.state.DataContractDPNS,
            },
          },
        };
        const client = new Dash.Client(clientOpts);

        let arrayOfOwnerIds = docArray.map((doc) => {
          return doc.$ownerId;
        });

        let setOfOwnerIds = [...new Set(arrayOfOwnerIds)];

        arrayOfOwnerIds = [...setOfOwnerIds];

        //console.log("Called Get InitialByYou Threads Names");

        const getNameDocuments = async () => {
          return client.platform.documents.get("DPNS.domain", {
            where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
            orderBy: [["records.dashUniqueIdentityId", "asc"]],
          });
        };

        getNameDocuments()
          .then((d) => {
            if (d.length === 0) {
              console.log("No DPNS domain documents retrieved.");
            }

            let nameDocArray = [];
            for (const n of d) {
              //console.log("NameDoc:\n", n.toJSON());

              nameDocArray = [n.toJSON(), ...nameDocArray];
            }

            this.setState(
              {
                InitialByYouThreadsNames: nameDocArray,
                InitialByYouThreads: docArray,
                Initial2: true,
              },
              () => this.checkInitialForYouRace()
            );
          })
          .catch((e) => {
            console.error(
              "Something went wrong getting InitialByYouThreadsNames:\n",
              e
            );
            this.setState({
              InitialByYouThreadsNamesError: true, //<- add to state? ->
              
            });
          })
          .finally(() => client.disconnect());
      };
  //END - ForYou: Msgs and Threads

  //START - ForYou TAGS: Msgs and Threads
  getInitialForyouFromOthersTags = (theIdentity) => {
    //console.log("Calling dsoForYouOthersTags");

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DSOContract: {
          contractId: this.state.DataContractDSO, // Your contract ID
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
          ['$createdAt', '<=' , Date.now()]
    ],
    orderBy: [
    ['$createdAt', 'desc'],
  ],
      });
    };

    getTagsFromtoUserIdYourOwnerId()
      .then((d) => {
        if (d.length !== 0) {
          let docArray = [];

          for(const n of d) {
            let returnedDoc = n.toJSON()
             //console.log("Tag:\n", returnedDoc);
             returnedDoc.msgId = Identifier.from(returnedDoc.msgId, 'base64').toJSON();
             returnedDoc.toId = Identifier.from(returnedDoc.toId, 'base64').toJSON();
             //console.log("newTag:\n", returnedDoc);
            docArray = [...docArray, returnedDoc];
          }

          let msgIdArray = docArray.map((doc) => {
            return doc.msgId;
          });

          //console.log(`MessageID Array: ${msgIdArray}`);

          //NEXT GET THE MSGS FROM THE TAGS msgIds************
          this.getInitialMsgsFromTags(msgIdArray);
          //NEXT GET THE MSGS FROM THE TAGS msgIds************

        } else {
          //console.log("No Tags for this user.");
          
          this.setState(
            {
              Initial3:true,
              Initial4:true,
            },
            () => this.checkInitialForYouRace()
          );
        }
      })
      .catch((e) => console.error("Something went wrongInitialMsgsfrom Tags:\n", e))
      .finally(() => client.disconnect());
  };

  getInitialMsgsFromTags = (idsOfMsgsFromTags) => {
    // console.log("Getting MSGs from Tags");

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DSOContract: {
          contractId: this.state.DataContractDSO, // Your contract ID
        },
      },
    };
    let client = new Dash.Client(clientOpts);


    const getDocuments = async () => {
      return client.platform.documents.get("DSOContract.dsomsg", {
        where: [["$id", "in", idsOfMsgsFromTags]],
        orderBy: [["$id", "asc"]],
      });
    };

    getDocuments()
      .then((d) => {
        let docArray = [];

        if (d.length === 0) {
          console.log("There are not InitialMsgsFromTags");
        } else {
          for (const n of d) {
            //console.log("Document:\n", n.toJSON());
            docArray = [...docArray, n.toJSON()];
          }

          this.getInitialMsgsFromTagsNames(docArray);
          this.getInitialFromTagsThreads(docArray);

          // this.setState({
          //   FromTagsMsgs: docArray,
          // });
            //SET IN STATE IN NAMES TO REDUCE SETSTATE CALLS!!
        }
      })
      .catch((e) => console.error("Something went wrong in InitialForyouFromOthersMsgs:\n", e))
      .finally(() => client.disconnect());
  };

  getInitialMsgsFromTagsNames = (docArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DPNS: {
          contractId: this.state.DataContractDPNS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);
    //START OF NAME RETRIEVAL

    let ownerarrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(ownerarrayOfOwnerIds)];

    let arrayOfOwnerIds = [...setOfOwnerIds];

    arrayOfOwnerIds = arrayOfOwnerIds.map((item) =>
      Buffer.from(Identifier.from(item))
    );

    //console.log("Calling getInitial");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNS.domain", {
        where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
        orderBy: [["records.dashUniqueIdentityId", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        //WHAT IF THERE ARE NO NAMES? -> THEN THIS WON'T BE CALLED
        if (d.length === 0) {
          //console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];

        for(const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }
        //console.log(`DPNS Name Docs: ${nameDocArray}`);

        this.setState(
          {
            InitialFromTagsNames: nameDocArray,
            InitialFromTagsMsgs: docArray,
            Initial3: true,
          },
          () => this.checkInitialForYouRace()
        );
      })
      .catch((e) => {
        console.error("Something went wrong getting InitialForYouTagsNames:\n", e);
      }).finally(() => client.disconnect());
    //END OF NAME RETRIEVAL
  }; 

      getInitialFromTagsThreads = (docArray) => {
        //CHANGE from everyone to foryou ->
        const clientOpts = {
          network: this.state.whichNetwork,
          apps: {
            DSOContract: {
              contractId: this.state.DataContractDSO,
            },
          },
        };
        const client = new Dash.Client(clientOpts);

        // This Below is to get unique set of ByYou msg doc ids
        let arrayOfMsgIds = docArray.map((doc) => {
          return doc.$id;
        });

        //console.log("Array of ByYouThreads ids", arrayOfMsgIds);

        let setOfMsgIds = [...new Set(arrayOfMsgIds)];

        arrayOfMsgIds = [...setOfMsgIds];

        //console.log("Array of order ids", arrayOfMsgIds);

        const getDocuments = async () => {
          //console.log("Called Get InitialFromTags Threads");

          return client.platform.documents.get("DSOContract.dsothr", {
            where: [["msgId", "in", arrayOfMsgIds]], // check msgId ->
            orderBy: [["msgId", "asc"]],
          });
        };

        getDocuments()
          .then((d) => {
            let docArray = [];
            //THERE ISN'T NECESSARY MESSAGE TO GRAB SO COULD BE ZERO SO STILL NEED TO END LOADING ->

            for(const n of d) {
              let returnedDoc = n.toJSON()
               //console.log("Thr:\n", returnedDoc);
               returnedDoc.msgId = Identifier.from(returnedDoc.msgId, 'base64').toJSON();
               //console.log("newThr:\n", returnedDoc);
              docArray = [...docArray, returnedDoc];
            }
            

            if (docArray.length === 0) {
              this.setState(
                {
                  Initial4: true,
                },
                () => this.checkInitialForYouRace()
              );
            } else {
              this.getInitialFromTagsThreadsNames(docArray); //Name Retrieval

            }
          })
          .catch((e) => {
            console.error("Something went wrong InitialByYouThreads:\n", e);
            this.setState({
              InitialFromTagsThreadsError: true, //handle error ->
              //isLoadingForYou: false,
            });
          })
          .finally(() => client.disconnect());
      };

      getInitialFromTagsThreadsNames = (docArray) => {
        const clientOpts = {
          network: this.state.whichNetwork,
          apps: {
            DataContractDPNS: {
              contractId: this.state.DataContractDPNS,
            },
          },
        };
        const client = new Dash.Client(clientOpts);

        let arrayOfOwnerIds = docArray.map((doc) => {
          return doc.$ownerId;
        });

        let setOfOwnerIds = [...new Set(arrayOfOwnerIds)];

        arrayOfOwnerIds = [...setOfOwnerIds];

//TEST -> 
        // arrayOfOwnerIds = arrayOfOwnerIds.map((item) =>
        //   Buffer.from(Identifier.from(item))
        // );

        //console.log("Called Get FromTags Threads Names");

        const getNameDocuments = async () => {
          return client.platform.documents.get("DataContractDPNS.domain", {
            where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
            orderBy: [["records.dashUniqueIdentityId", "asc"]],
          });
        };

        getNameDocuments()
          .then((d) => {
            if (d.length === 0) {
              //console.log("No DPNS domain documents retrieved.");
            }

            let nameDocArray = [];
            for(const n of d) {
              //console.log("NameDoc:\n", n.toJSON());

              nameDocArray = [n.toJSON(), ...nameDocArray];
            }

            this.setState(
              {
                InitialFromTagsThreadsNames: nameDocArray,
                InitialFromTagsThreads: docArray,
                Initial4: true,
              },
              () => this.checkInitialForYouRace()
            );
          })
          .catch((e) => {
            console.error(
              "Something went wrong getting InitialFromTagsThreadsNames:\n",
              e
            );
            this.setState({
              InitialFromTagsThreadsNamesError: true, //<- add to state? ->
              
            });
          })
          .finally(() => client.disconnect());
      };
  //END - MOST RECENT INITIAL ForYou TAGS: Msgs and Threads

  //######################################################

  //#######################################################################
  //   DOCUMENT CREATION
  /*  checkSubmitRace = () => {
    
      if (this.state.Submit1 &&
            this.state.Submit2) {
        
          this.setState({
      isLoadingRefresh: false,
      Submit1: false,
      Submit2: false,
        },()=> this.updateIdentityInfo());
        
      }
    };


  submitDocsSeparately = (addedMessage, ownerIdArray) => {

    this.setState({
      isLoadingRefresh: true,
    });

    if(ownerIdArray.length === 0){

      this.submitDSOMSG(addedMessage);
      this.setState({
        Submit2: true,
      });

    }else{
      this.submitDSOMSG(addedMessage); //Must call from function need the msgId!!
      this.submitDSOTAGS(ownerIdArray);
    }
  }

  submitDSOMSG = (addedMessage) => {

    const clientOpts = {
      network: this.state.whichNetwork,
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
          contractId: this.state.DataContractDSO, // Your contract ID
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

      if (addedMessage.sh === "out") {
        docProperties = {
          msg: addedMessage.msg,
          sh: "out",
        };
      } 
      
      else {
        docProperties = {
          msg: addedMessage.msg,
        };
      }

      // Create the note document
      const dsoDocument = await platform.documents.create(
        "DSOContract.dsomsg", /// I changed .note TO .dsomessage***
        identity,
        docProperties
      );

      const documentBatch = {
        create: [dsoDocument], // Document(s) to create
      };

      await platform.documents.broadcast(documentBatch, identity);
      return documentBatch;
    };

    submitDocuments()
      .then((d) => {
        //Returns array!!! -> 
        // let returnedDoc = d.toJSON();
        // console.log("MSG Documents JSON:\n", returnedDoc);

        let docArray = [];
          for (const n of d) {
            console.log("Submitted Doc:\n", n.toJSON());
            docArray = [...docArray, n.toJSON()];
          }

        let message;

          message = {
            $ownerId: docArray[0].$ownerId,
            $id: docArray[0].$id, //$id: returnedDoc.transitions[0].$id,
            sh: addedMessage.sh,
            msg: addedMessage.msg,
            $createdAt: docArray[0].$createdAt
          };

        if (addedMessage.sh === "out") {
          this.setState({
            EveryoneMsgs: [message, ...this.state.EveryoneMsgs],
            ByYouMsgs: [message, ...this.state.ByYouMsgs],
            isLoadingRefresh: false,
            Submit1: true
          }, ()=> this.checkSubmitRace());
        } else {
          this.setState({
            ByYouMsgs: [message, ...this.state.ByYouMsgs],
            isLoadingRefresh: false,
            Submit1: true
          }, ()=> this.checkSubmitRace());
        }

      })
      .catch((e) => {
        this.setState({
          isLoadingRefresh: false,
          errorToDisplay: true,
        });

        console.error("Something went wrong:\n", e);
      })
      .finally(() => client.disconnect());

    //THIS BELOW IS THE NAME DOC ADD, SO PROCESSES DURING DOC SUBMISSION ***
    let nameDoc = {
      $ownerId: this.state.identity,
      label: this.state.uniqueName,
    };

    this.setState({
      EveryoneNames: [nameDoc, ...this.state.EveryoneNames],

      ByYouNames: [nameDoc, ...this.state.ByYouNames],

      FromTagsNames: [nameDoc, ...this.state.FromTagsNames],
    });
    //END OF NAME DOC ADD***

  }

  submitDSOTAGS = (ownerIdArray) => {
    const clientOpts = {
      network: this.state.whichNetwork,
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
          contractId: this.state.DataContractDSO, // Your contract ID
        },
      },
    };

    const client = new Dash.Client(clientOpts);

    let tagDocuments;

    const submitDocuments = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      } // Your identity ID


      //console.log('OwnerIdArray of Tags: ',ownerIdArray);

        let dsotags = await Promise.all(
          ownerIdArray.map(async (ownerId) => {
            //https://stackoverflow.com/questions/40140149/use-async-await-with-array-map

            //dsotag ->  toId, msgId (all required)

            let tagDoc = await platform.documents.create(
              "DSOContract.dsotag",
              identity,
              {
                toId: ownerId,
                msgId: dsoDocument.toJSON().$id,
              }
            );
            return tagDoc;
          })
        );

        tagDocuments = [dsoDocument, ...dsotags];
      

      //THIS ^^^ IS WHAT IS PASSED TO THE DOCUMENT CREATION

      //############################################################
      //This below disconnects the document sending..***


      //return dsoMessageAndTags;

      //This is to disconnect the Document Creation***

      //############################################################


      const documentBatch = {
        create: dsoMessageAndTags, // [dsoDocument], // Document(s) to create
      };

      //return platform.documents.broadcast(documentBatch, identity); //<- Old v0.24
      await platform.documents.broadcast(documentBatch, identity);
      return dsoMessageAndTags;
    };
  }
*/

  submitDSODocument = (addedMessage, ownerIdArray) => {
    //  -> sh: out, dir, tip ?

    this.setState({
      isLoadingRefresh: true,
    });

    //console.log(addedMessage);
    const clientOpts = {
      network: this.state.whichNetwork,
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
          contractId: this.state.DataContractDSO, // Your contract ID
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    //let dsoMessageAndTags;
    let dsoTags;

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
       msg, sh, msgId(for reply)  (only first 2 are required)
*/

      if (addedMessage.sh === "out") {
        docProperties = {
          msg: addedMessage.msg,
          sh: "out",
        };
      } //RIGHT HERE IS WHERE i PUT THE 'dir'
      //and then if 'thr' adds the state to the msgId ->
      else {
        docProperties = {
          msg: addedMessage.msg,
        };
      }

      // Create the note document
      const dsoDocument = await platform.documents.create(
        "DSOContract.dsomsg", /// I changed .note TO .dsomessage***
        identity,
        docProperties
      );

    console.log(dsoDocument.toJSON());

      console.log('OwnerIdArray of Tags: ',ownerIdArray);

      if (ownerIdArray.length !== 0) {

        let dsotags = await Promise.all(
          ownerIdArray.map(async (ownerId) => {
            //https://stackoverflow.com/questions/40140149/use-async-await-with-array-map

            //dsotag ->  toId, msgId (all required)

            let tagDoc = await platform.documents.create(
              "DSOContract.dsotag",
              identity,
              {
                toId: ownerId,
                msgId: dsoDocument.toJSON().$id,
              }
            );
            return tagDoc;
          })
        );

        dsoTags = dsotags;
      } //else {
       // dsoMessageAndTags = [dsoDocument];
     // }

      //THIS ^^^ IS WHAT IS PASSED TO THE DOCUMENT CREATION

      //############################################################
      //This below disconnects the document sending..***


      //return dsoMessageAndTags;

      //This is to disconnect the Document Creation***

      //############################################################


      // const documentBatch = {
      //   create: dsoMessageAndTags, // [dsoDocument], // Document(s) to create
      // };

      const msgBatch = {
        create: [dsoDocument], // Document(s) to create
      };

      const tagBatch = {
        create: dsoTags, // Document(s) to create
      };
      
      await platform.documents.broadcast(msgBatch, identity)

      if(ownerIdArray.length !== 0){
      await platform.documents.broadcast(tagBatch, identity)
      }
      
      return [dsoDocument];
    };

    submitDocuments()
      .then((d) => {
        //Returns array!!! -> 
        // let returnedDoc = d.toJSON();
        // console.log("MSG Documents JSON:\n", returnedDoc);

        let docArray = [];
          for (const n of d) {
            console.log("Submitted Doc:\n", n.toJSON());
            docArray = [...docArray, n.toJSON()];
          }

        let message = {};

        if (docArray.length === 1) {
          message = {
            $ownerId: docArray[0].$ownerId,
            $id: docArray[0].$id, //$id: returnedDoc.transitions[0].$id,
            sh: addedMessage.sh,
            msg: addedMessage.msg,
            $createdAt: docArray[0].$createdAt
          };
        } else {
          docArray.forEach((doc) => {
            //OR I could do a find and it would be a bit faster ->
            if (doc.$type === "dsomsg") {
              message = {
                $ownerId: doc.$ownerId,
                $id: doc.$id,
                sh: addedMessage.sh,
                msg: addedMessage.msg,
                $createdAt: doc.$createdAt
              };
            }
          });
        }

        if (addedMessage.sh === "out") {
          this.setState({
            EveryoneMsgs: [message, ...this.state.EveryoneMsgs],
            ByYouMsgs: [message, ...this.state.ByYouMsgs],
            isLoadingRefresh: false,
          }, ()=> this.updateIdentityInfo());
        } else {
          this.setState({
            ByYouMsgs: [message, ...this.state.ByYouMsgs],
            isLoadingRefresh: false,
          }, ()=> this.updateIdentityInfo());
        }

        //console.log(submittedDoc);
      })
      .catch((e) => {
        this.setState({
          isLoadingRefresh: false,
          errorToDisplay: true,
        });

        console.error("Something went wrong:\n", e);
      })
      .finally(() => client.disconnect());

    //THIS BELOW IS THE NAME DOC ADD, SO PROCESSES DURING DOC SUBMISSION ***
    let nameDoc = {
      $ownerId: this.state.identity,
      label: this.state.uniqueName,
    };

    this.setState({
      EveryoneNames: [nameDoc, ...this.state.EveryoneNames],

      ByYouNames: [nameDoc, ...this.state.ByYouNames],

      FromTagsNames: [nameDoc, ...this.state.FromTagsNames],
    });
    //END OF NAME DOC ADD***
  };

  submitDSOThread = (addedMessage, ownerIdArray) => {

    this.setState({
      isLoadingRefresh: true,
    });

    //console.log(addedMessage);
    const clientOpts = {
      network: this.state.whichNetwork,
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
          contractId: this.state.DataContractDSO, // Your contract ID
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    let dsoTags;

    const submitDocuments = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      } // Your identity ID

      let docProperties = {};

      //THIS ALL NEED TO BE ADJUST FRO THREADS AND NOT MSGS ->
      //required: [ 'msg', 'msgId', "$createdAt", "$updatedAt"],
      docProperties = {
        msg: addedMessage.msg,
        msgId: this.state.ThreadMessageId,
      };

      // Create the note document
      const dsoDocument = await platform.documents.create(
        "DSOContract.dsothr",
        identity,
        docProperties
      );

      //console.log(dsoDocument.toJSON());

      //console.log('OwnerIdArray of Tags: ',ownerIdArray);

      if (ownerIdArray.length !== 0) {

        let dsotags = await Promise.all(
          ownerIdArray.map(async (ownerId) => {
            //https://stackoverflow.com/questions/40140149/use-async-await-with-array-map

            //dsotag ->  toId, msgId (all required)

            let tagDoc = await platform.documents.create(
              "DSOContract.dsotag",
              identity,
              {
                toId: ownerId,
                msgId: dsoDocument.toJSON().$id,
              }
            );
            return tagDoc;
          })
        );

        dsoTags = dsotags;
      } //else {
       // dsoMessageAndTags = [dsoDocument];
     // }

      //THIS ^^^ IS WHAT IS PASSED TO THE DOCUMENT CREATION

      //############################################################
      //This below disconnects the document sending..***


      //return dsoMessageAndTags;

      //This is to disconnect the Document Creation***

      //############################################################


      const thrBatch = {
        create: [dsoDocument], // Document(s) to create
      };

      const tagBatch = {
        create: dsoTags, // Document(s) to create
      };
      
      await platform.documents.broadcast(thrBatch, identity)

      if(ownerIdArray.length !== 0){
      await platform.documents.broadcast(tagBatch, identity)
      }
      
      return [dsoDocument];
    };

    submitDocuments()
      .then((d) => {
        
        // let returnedDoc = d;
        // console.log("Thread Documents:\n", returnedDoc);

        let docArray = [];
          for (const n of d) {
            console.log("Thr:\n", n.toJSON());
            docArray = [...docArray, n.toJSON()];
          }
        
        let newThread = {};

        if (docArray.length === 1) {
          newThread = {
            $ownerId: docArray[0].$ownerId,
            $id: docArray[0].$id, //$id: returnedDoc.transitions[0].$id,
            msgId: this.state.ThreadMessageId,
            msg: addedMessage.msg,
            $createdAt: docArray[0].$createdAt
          };
        } else {
          docArray.forEach((doc) => {
            if (doc.$type === "dsothr") {
              newThread = {
                $ownerId: doc.$ownerId,
                $id: doc.$id,
                msgId: this.state.ThreadMessageId,
                msg: addedMessage.msg,
                $createdAt: doc.$createdAt
              };
            }
          });
        }

        this.setState({
          EveryoneThreads: [newThread, ...this.state.EveryoneThreads],

          ByYouThreads: [newThread, ...this.state.ByYouThreads],

          FromTagsThreads: [
            newThread,
            ...this.state.FromTagsThreads,
          ],

          isLoadingRefresh: false,
        }, ()=> this.updateIdentityInfo());
      })
      .catch((e) => {
        this.setState({
          isLoadingRefresh: false,
          errorToDisplay: true,
        });

        console.error("Something went wrong creating new thread:\n", e);
      })
      .finally(() => client.disconnect());

    //THIS BELOW IS THE NAME DOC ADD, SO PROCESSES DURING DOC SUBMISSION ***
    let nameDoc = {
      $ownerId: this.state.identity,
      label: this.state.uniqueName,
    };

    this.setState({
      EveryoneThreadsNames: [nameDoc, ...this.state.EveryoneThreadsNames],

      ByYouThreadsNames: [nameDoc, ...this.state.ByYouThreadsNames],

      FromTagsThreadsNames: [
        nameDoc,
        ...this.state.FromTagsThreadsNames,
      ],
    });
    //END OF NAME DOC ADD***
  };

  // TOP UP
  doTopUpIdentity = (numOfCredits) => {
    this.setState({
      isLoadingWallet: true,
    });
    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic, 
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
    };
    const client = new Dash.Client(clientOpts);
  
    const topupIdentity = async () => {
      const identityId = this.state.identity; // Your identity ID
      const topUpAmount = numOfCredits; // Number of duffs ie 1000
  
      await client.platform.identities.topUp(identityId, topUpAmount);
      return client.platform.identities.get(identityId);
    };
  
    topupIdentity()
      .then((d) => {
        console.log("Identity credit balance: ", d.balance);
        this.setState({
          identityInfo: d.toJSON(),
          identityRaw: d,
          isLoadingWallet: false,
          accountBalance: this.state.accountBalance - 1000000,
        });
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          isLoadingWallet: false,
          topUpError: true, //Add to State and handle ->
        });
      })
      .finally(() => client.disconnect());
  };

  //ALSO RECALL THE IDENTITY SO THAT IT WILL UPDATE THE CREDITS

  //#######################################################################
  // AUTO-UPDATE QUERIES

  compareNewToOld(possibleDocs, oldDocs) {
    let newDocs = [];

    possibleDocs.forEach((possibleDoc) => {
      let oldContains = oldDocs.every((oldDoc) => oldDoc.$id !== possibleDoc.$id);

      if (oldContains) {
        newDocs.push(possibleDoc); 
      }
    });

    return newDocs;
  }
//########   #########  ##########  ##########  ############  ###########
  // *** AutoUpdate SO and SO threads ***

  //WHERE IS THE SETINTERVAL CALLED AT -> after identityinfo


  autoUpdateEveryoneHelper = () => {
    console.log('AutoUpdate Everyone');

    if(!this.state.isLoadingEveryone &&
       !this.state.isLoadingRefresh &&
        !this.state.NewSO1 &&
         !this.state.NewSO2){
      this.checkForNewSO();
      this.checkForNewSOThreads(); 
    }
  }

  checkNewSORace = () => {
    if (this.state.NewSO1 && this.state.NewSO2) {
      this.setState({
        NewSO1:false,
        NewSO2:false,
      })
      
    }
  };

  pushNewSOtoView = () => {
    this.setState({
      EveryoneMsgs: [...this.state.NewSOMsgs, ...this.state.EveryoneMsgs],
      NewSOMsgs: [],

      EveryoneNames: [...this.state.NewSONames, ...this.state.EveryoneNames],
      NewSONames: [],

      EveryoneThreads: [...this.state.NewSOThreads, ...this.state.EveryoneThreads],
      NewSOThreads: [],

      EveryoneThreadsNames: [...this.state.NewSOThreadsNames, ...this.state.EveryoneThreadsNames],
      NewSOThreadsNames: [],
    });
  }

  checkForNewSO = () => {
   
      const clientOpts = {
        network: this.state.whichNetwork,
        apps: {
          DSOContract: {
            contractId: this.state.DataContractDSO, // Your contract ID
          },
        },
      };
      const client = new Dash.Client(clientOpts);
  
      const getDocuments = async () => {
        return client.platform.documents.get("DSOContract.dsomsg", {
          limit: 60,
          where: [
            ["sh", "==", "out"],
            ['$createdAt', '<=' , Date.now()]
    ],
    orderBy: [
    ['$createdAt', 'desc'],
  ],
        });
      };
  
      getDocuments()
        .then((d) => {
          //Should never be 0 so not handling that case.
  
          let docArray = [];
          //console.log("Getting Everyone DSO Docs");
          for(const n of d) {
            //console.log("Document:\n", n.toJSON());
            docArray = [...docArray, n.toJSON()];
          }

// $$$ $$$ $$$ $$$ $$$

let alreadyHaveArray = [...this.state.EveryoneMsgs, ...this.state.NewSOMsgs]

          docArray = this.compareNewToOld(docArray, alreadyHaveArray);

// $$$ $$$ $$$ $$$ $$$
  
          if (docArray.length !== 0) {
            this.handleLoadNewSO(docArray);
      
          }else{
            this.setState(
              {
                NewSO1: true,
              },
              () => this.checkNewSORace()
            );
          }
        })
        .catch((e) => {
          console.error("Something went wrong in checkForNewSO:\n", e);
          
        }).finally(() => client.disconnect());
  };

  handleLoadNewSO = (docArray) => {

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DPNS: {
          contractId: this.state.DataContractDPNS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    let ownerarrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(ownerarrayOfOwnerIds)];

    let arrayOfOwnerIds = [...setOfOwnerIds];

    arrayOfOwnerIds = arrayOfOwnerIds.map((item) =>
      Buffer.from(Identifier.from(item))
    );

    //console.log("Calling getNamesforDSOmsgs");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNS.domain", {
        where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
        orderBy: [["records.dashUniqueIdentityId", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        //WHAT IF THERE ARE NO NAMES? -> Then function won't be called
        if (d.length === 0) {
          console.log("No handleLoadNewSO Names retrieved.");
        }

        let nameDocArray = [];

        for(const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }
        //console.log(`DPNS Name Docs: ${nameDocArray}`);

        this.setState(
          {
            NewSONames: [...nameDocArray, ...this.state.NewSONames], 
            NewSOMsgs: [ ...docArray, ...this.state.NewSOMsgs],
            NewSO1: true,
          },
          () => this.checkNewSORace()
        );
      })
      .catch((e) => {
        console.error("Something went wrong in handleLoadNewSO:\n", e);
      })
      .finally(() => client.disconnect());
  
  };

  checkForNewSOThreads = () => {

let docArray = [...this.state.NewSOMsgs, ...this.state.EveryoneMsgs];

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DSOContract: {
          contractId: this.state.DataContractDSO,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    // This Below is to get unique set of order doc ids
    let arrayOfMsgIds = docArray.map((doc) => {
      return doc.$id;
    });

    //console.log("Array of order ids", arrayOfMsgIds);

    let setOfMsgIds = [...new Set(arrayOfMsgIds)];

    arrayOfMsgIds = [...setOfMsgIds];


    //console.log("Array of order ids", arrayOfMsgIds);

    const getDocuments = async () => {
      //console.log("Called Get Everyone Threads");

      return client.platform.documents.get("DSOContract.dsothr", {
        //<- Check this
        where: [["msgId", "in", arrayOfMsgIds]], // check msgId ->
        orderBy: [["msgId", "asc"]],
      });
    };

    getDocuments()
      .then((d) => {
        let docArray = [];
        //THERE ISN'T NECESSARY MESSAGE TO GRAB SO COULD BE ZERO SO STILL NEED TO END LOADING ->

        for(const n of d) {
          let returnedDoc = n.toJSON()
           //console.log("Thr:\n", returnedDoc);
           returnedDoc.msgId = Identifier.from(returnedDoc.msgId, 'base64').toJSON();
           //console.log("newThr:\n", returnedDoc);
          docArray = [...docArray, returnedDoc];
        }

        let alreadyHaveArray = [...this.state.EveryoneThreads, ...this.state.NewSOThreads]

        docArray = this.compareNewToOld(docArray, alreadyHaveArray);


        if (docArray.length === 0) {
          this.setState(
            {
              NewSO2: true,
            },
            () => this.checkNewSORace()
          );
        } else {

          this.handleLoadNewSoThreads(docArray); //Name Retrieval
          
        }
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          EveryoneThreadsError: true, //handle error ->
          //isLoadingEveryone: false,
        });
      })
      .finally(() => client.disconnect());
  };

  handleLoadNewSoThreads = (docArray) => {

    //Get the names and trigger button

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DataContractDPNS: {
          contractId: this.state.DataContractDPNS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    let arrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(arrayOfOwnerIds)];

    arrayOfOwnerIds = [...setOfOwnerIds];

    arrayOfOwnerIds = arrayOfOwnerIds.map((item) =>
      Buffer.from(Identifier.from(item))
    );

    //console.log("Called Get Everyone Threads Names");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DataContractDPNS.domain", {
        where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
        orderBy: [["records.dashUniqueIdentityId", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        if (d.length === 0) {
          console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];
        for(const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }

        this.setState(
          {
            NewSOThreadsNames: [...nameDocArray, ...this.state.NewSOThreadsNames],
            NewSOThreads: [...docArray, ...this.state.NewSOThreads],
            NewSO2: true,
          },
          () => this.checkNewSORace()
        );
      })
      .catch((e) => {
        console.error(
          "Something went wrong getting  New SO Threads Names:\n",
          e
        );
        this.setState({
          EveryoneThreadsNamesError: true, //<- add to state? ->
        });
      }).finally(() => client.disconnect());
  };

//########   #########  ##########  ##########  ############  ###########
  // *** AutoUpdate DM and DM threads ***
  autoUpdateForYouHelper = () => {

    console.log('AutoUpdate For You');

    if(!this.state.isLoadingForYou &&
       !this.state.isLoadingRefresh &&
       !this.state.NewDM1 &&
       !this.state.NewDM2 && 
       !this.state.NewDM3){

      this.checkByYouDMThreads();
      this.getTagsNewDM();
      this.checkFromTagsDMThreads();

    }
  }

  checkNewDMRace = () => {
    if (this.state.NewDM1 &&
           this.state.NewDM2 &&
              this.state.NewDM3) {
      this.setState({
        NewDM1:false,
        NewDM2:false,
        NewDM3:false
      })
      
    }
  }; 

  pushNewDMtoView = () => {
    this.setState({
      ByYouThreads: [...this.state.NewDMByYouThreads, ...this.state.ByYouThreads],
      NewDMByYouThreads: [],

      ByYouThreadsNames: [...this.state.NewDMByYouThreadsNames, ...this.state.ByYouThreadsNames],
      NewDMByYouThreadsNames: [],

      FromTagsMsgs: [...this.state.NewDMFromTagsMsgs, ...this.state.FromTagsMsgs],
      NewDMFromTagsMsgs: [],

      FromTagsNames: [...this.state.NewDMFromTagsNames, ...this.state.FromTagsNames],
      NewDMFromTagsNames: [],

      FromTagsThreads: [...this.state.NewDMFromTagsThreads, ...this.state.FromTagsThreads],
      NewDMFromTagsThreads: [],

      FromTagsThreadsNames: [...this.state.NewDMFromTagsThreadsNames, ...this.state.FromTagsThreadsNames],
      NewDMFromTagsThreadsNames: [],

    });
  }

  checkByYouDMThreads = () => {

    let docArray = this.state.ByYouMsgs;

    if(docArray.length !== 0){
    
        const clientOpts = {
          network: this.state.whichNetwork,
          apps: {
            DSOContract: {
              contractId: this.state.DataContractDSO,
            },
          },
        };
        const client = new Dash.Client(clientOpts);
    
        // This Below is to get unique set of order doc ids
        let arrayOfMsgIds = docArray.map((doc) => {
          return doc.$id;
        });
    
        //console.log("Array of order ids", arrayOfMsgIds);
    
        let setOfMsgIds = [...new Set(arrayOfMsgIds)];
    
        arrayOfMsgIds = [...setOfMsgIds];
    
    
        //console.log("Array of order ids", arrayOfMsgIds);
    
        const getDocuments = async () => {
          //console.log("Called Get ByYouDM Threads");
    
          return client.platform.documents.get("DSOContract.dsothr", {
            
            where: [["msgId", "in", arrayOfMsgIds]], // check msgId ->
            orderBy: [["msgId", "asc"]],
          });
        };
    
        getDocuments()
          .then((d) => {
            let docArray = [];
    
            for(const n of d) {
              let returnedDoc = n.toJSON()
               //console.log("Thr:\n", returnedDoc);
               returnedDoc.msgId = Identifier.from(returnedDoc.msgId, 'base64').toJSON();
               //console.log("newThr:\n", returnedDoc);
              docArray = [...docArray, returnedDoc];
            }
    
            let alreadyHaveArray = [...this.state.ByYouThreads, ...this.state.NewDMByYouThreads]
    
            docArray = this.compareNewToOld(docArray, alreadyHaveArray);
    
    
            if (docArray.length === 0) {
              this.setState(
                {
                  NewDM1: true,
                },
                () => this.checkNewDMRace()
              );
            } else {
    
              this.handleByYouDMThreads(docArray); //Name Retrieval
              
            }
          })
          .catch((e) => {
            console.error("Something went wrong:\n", e);
            this.setState({
              ByYouDMThreadsError: true, //handle error ->
              //isLoadingEveryone: false,
            });
          })
          .finally(() => client.disconnect());
    }
      };
    
  handleByYouDMThreads = (docArray) => {
    
        const clientOpts = {
          network: this.state.whichNetwork,
          apps: {
            DataContractDPNS: {
              contractId: this.state.DataContractDPNS,
            },
          },
        };
        const client = new Dash.Client(clientOpts);
    
        let arrayOfOwnerIds = docArray.map((doc) => {
          return doc.$ownerId;
        });
    
        let setOfOwnerIds = [...new Set(arrayOfOwnerIds)];
    
        arrayOfOwnerIds = [...setOfOwnerIds];
    
        arrayOfOwnerIds = arrayOfOwnerIds.map((item) =>
          Buffer.from(Identifier.from(item))
        );
    
        //console.log("Called Get ByYouDMThreads Names");
    
        const getNameDocuments = async () => {
          return client.platform.documents.get("DataContractDPNS.domain", {
            where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
            orderBy: [["records.dashUniqueIdentityId", "asc"]],
          });
        };
    
        getNameDocuments()
          .then((d) => {
            if (d.length === 0) {
              console.log("No DPNS domain documents retrieved.");
            }
    
            let nameDocArray = [];
            for (const n of d) {
              //console.log("NameDoc:\n", n.toJSON());
    
              nameDocArray = [n.toJSON(), ...nameDocArray];
            }
    
            this.setState(
              {
                NewDMByYouThreadsNames: [...nameDocArray, ...this.state.NewDMByYouThreadsNames],
                NewDMByYouThreads: [...docArray, ...this.state.NewDMByYouThreads],
                NewDM1: true,
              },
              () => this.checkNewDMRace()
            );
          })
          .catch((e) => {
            console.error(
              "Something went wrong getting ByYouDMThreads Names:\n",
              e
            );
            this.setState({
              ByYouDMThreadsNamesError: true, //<- add to state? ->
            });
          }).finally(() => client.disconnect());
      };

getTagsNewDM = () =>{
    //console.log("Calling getTagsNewDM");

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        DSOContract: {
          contractId: this.state.DataContractDSO, // Your contract ID
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    //DSOForyou Query -> From other's tags (SO and DM) -> this is forTAGS

    const getTagsFromtoUserIdYourOwnerId = async () => {
      return client.platform.documents.get("DSOContract.dsotag", {
        limit: 60,
        where: [
          ["toId", "==", this.state.identity],
          ['$createdAt', '<=' , Date.now()]
    ],
    orderBy: [
    ['$createdAt', 'desc'],
  ],
      });
    };

    getTagsFromtoUserIdYourOwnerId()
      .then((d) => {
        if (d.length !== 0) {
          let docArray = [];
          
          for(const n of d) {
            let returnedDoc = n.toJSON()
             //console.log("Thr:\n", returnedDoc);
             returnedDoc.msgId = Identifier.from(returnedDoc.msgId, 'base64').toJSON();
             returnedDoc.toId = Identifier.from(returnedDoc.toId, 'base64').toJSON();
             //console.log("newThr:\n", returnedDoc);
            docArray = [...docArray, returnedDoc];
          }

          let msgIdArray = docArray.map((doc) => {
            
            return doc.msgId;
          });

          //console.log(`MessageID Array: ${msgIdArray}`);

          //NEXT GET THE MSGS FROM THE TAGS msgIds************

          this.getNewDMMsgsFromTags(msgIdArray);

          //NEXT GET THE MSGS FROM THE TAGS msgIds************


        } else {
          console.log("No Tags for this user.");
          
          this.setState(
            {
              NewDM2:true,
            },
            () => this.checkNewDMRace()
          );
        }
      })
      .catch((e) => console.error("Something went wrong getTagsNewDM:\n", e))
      .finally(() => client.disconnect());

}

getNewDMMsgsFromTags = (idsOfMsgsFromTags) => {
  //console.log("Getting MSGs from Tags");

  const clientOpts = {
    network: this.state.whichNetwork,
    apps: {
      DSOContract: {
        contractId: this.state.DataContractDSO, // Your contract ID
      },
    },
  };
  let client = new Dash.Client(clientOpts);


  //console.log(`Array of MsgIds: ${idsOfMsgsFromTags}`);

  const getDocuments = async () => {
    return client.platform.documents.get("DSOContract.dsomsg", {
      where: [["$id", "in", idsOfMsgsFromTags]],
      orderBy: [["$id", "asc"]],
    });
  };

  getDocuments()
    .then((d) => {
      let docArray = [];

      if (d.length === 0) {
        console.log("There are not getNewDMMsgsFromTags");
      } else {
        for (const n of d) {
          //console.log("Document:\n", n.toJSON());
          docArray = [...docArray, n.toJSON()];
        }

        //NEED TO SORT NEW FROM OLD -> 

let alreadyHaveArray = [...this.state.FromTagsMsgs, ...this.state.NewDMFromTagsMsgs]

docArray = this.compareNewToOld(docArray, alreadyHaveArray);

if(docArray.length !== 0){
        this.handleFromTagsNewDM(docArray);
      } else {
        
        this.setState(
          {
            NewDM2:true,
          },
          () => this.checkNewDMRace()
        );
      }
      }
    })
    .catch((e) => console.error("Something went wrong in getNewDMMsgsFromTags:\n", e))
    .finally(() => client.disconnect());
};

handleFromTagsNewDM = (docArray) => {
  
  const clientOpts = {
    network: this.state.whichNetwork,
    apps: {
      DPNS: {
        contractId: this.state.DataContractDPNS,
      },
    },
  };
  const client = new Dash.Client(clientOpts);

  let ownerarrayOfOwnerIds = docArray.map((doc) => {
    return doc.$ownerId;
  });

  let setOfOwnerIds = [...new Set(ownerarrayOfOwnerIds)];

  let arrayOfOwnerIds = [...setOfOwnerIds];

  arrayOfOwnerIds = arrayOfOwnerIds.map((item) =>
    Buffer.from(Identifier.from(item))
  );

  //console.log("Calling getNamesforDSOmsgs");

  const getNameDocuments = async () => {
    return client.platform.documents.get("DPNS.domain", {
      where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
      orderBy: [["records.dashUniqueIdentityId", "asc"]],
    });
  };

  getNameDocuments()
    .then((d) => {
      //WHAT IF THERE ARE NO NAMES? -> Then function won't be called
      if (d.length === 0) {
        console.log("No handleLoadNewDM Names retrieved.");
      }

      let nameDocArray = [];

      for (const n of d) {
        //console.log("NameDoc:\n", n.toJSON());

        nameDocArray = [n.toJSON(), ...nameDocArray];
      }
      //console.log(`DPNS Name Docs: ${nameDocArray}`);

      this.setState(
        {
          NewDMFromTagsNames: [...nameDocArray, ...this.state.NewDMFromTagsNames], 
          NewDMFromTagsMsgs: [ ...docArray, ...this.state.NewDMFromTagsMsgs],
          NewDM2: true,
        },
        () => this.checkNewDMRace()
      );
    })
    .catch((e) => {
      console.error("Something went wrong in handleLoadNewSO:\n", e);
    })
    .finally(() => client.disconnect());

};

  checkFromTagsDMThreads = () => {

  let docArray = [...this.state.FromTagsMsgs, ...this.state.NewDMFromTagsMsgs];
  
  if(docArray.length !== 0){

      const clientOpts = {
        network: this.state.whichNetwork,
        apps: {
          DSOContract: {
            contractId: this.state.DataContractDSO,
          },
        },
      };
      const client = new Dash.Client(clientOpts);
  
      // This Below is to get unique set of order doc ids
      let arrayOfMsgIds = docArray.map((doc) => {
        return doc.$id;
      });
  
      //console.log("Array of order ids", arrayOfMsgIds);
  
      let setOfMsgIds = [...new Set(arrayOfMsgIds)];
  
      arrayOfMsgIds = [...setOfMsgIds];
  
  
      //console.log("Array of order ids", arrayOfMsgIds);
  
      const getDocuments = async () => {
        //console.log("Called Get ByYouDM Threads");
  
        return client.platform.documents.get("DSOContract.dsothr", {
          //<- Check this
          where: [["msgId", "in", arrayOfMsgIds]], // check msgId ->
          orderBy: [["msgId", "asc"]],
        });
      };
  
      getDocuments()
        .then((d) => {
          let docArray = [];
          
  
          for(const n of d) {
            let returnedDoc = n.toJSON()
             //console.log("Thr:\n", returnedDoc);
             returnedDoc.msgId = Identifier.from(returnedDoc.msgId, 'base64').toJSON();
             //console.log("newThr:\n", returnedDoc);
            docArray = [...docArray, returnedDoc];
          }
  
          let alreadyHaveArray = [...this.state.NewDMFromTagsThreads, ...this.state.FromTagsThreads];
  
          docArray = this.compareNewToOld(docArray, alreadyHaveArray);
  
          //Do i also need to compare to the holding array state also??
  
  
          if (docArray.length === 0) {
            this.setState(
              {
                NewDM3: true,
              },
              () => this.checkNewDMRace()
            );
          } else {
  
            this.handleFromTagsDMThreads(docArray); //Name Retrieval
            
          }
        })
        .catch((e) => {
          console.error("Something went wrong in checkFromTagsDMThreads:\n", e);
          this.setState({
            FromTagsNewDMThreadsError: true, //handle error ->
          });
        })
        .finally(() => client.disconnect());
      }//end of beginning if statement
      else{
        this.setState(
          {
            NewDM3: true,
          },
          () => this.checkNewDMRace()
        );
      }
    };
  
  handleFromTagsDMThreads = (docArray) => {
  
      //Get the names and trigger button
  
      const clientOpts = {
        network: this.state.whichNetwork,
        apps: {
          DataContractDPNS: {
            contractId: this.state.DataContractDPNS,
          },
        },
      };
      const client = new Dash.Client(clientOpts);
  
      let arrayOfOwnerIds = docArray.map((doc) => {
        return doc.$ownerId;
      });
  
      let setOfOwnerIds = [...new Set(arrayOfOwnerIds)];
  
      arrayOfOwnerIds = [...setOfOwnerIds];
  
      arrayOfOwnerIds = arrayOfOwnerIds.map((item) =>
        Buffer.from(Identifier.from(item))
      );
  
      //console.log("Called Get ByYouDMThreads Names");
  
      const getNameDocuments = async () => {
        return client.platform.documents.get("DataContractDPNS.domain", {
          where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
          orderBy: [["records.dashUniqueIdentityId", "asc"]],
        });
      };
  
      getNameDocuments()
        .then((d) => {
          if (d.length === 0) {
            console.log("No DPNS domain documents retrieved.");
          }
  
          let nameDocArray = [];
          for (const n of d) {
            //console.log("NameDoc:\n", n.toJSON());
  
            nameDocArray = [n.toJSON(), ...nameDocArray];
          }
  
          this.setState(
            {
              NewDMFromTagsThreadsNames: [...nameDocArray, ...this.state.NewDMFromTagsThreadsNames],
              NewDMFromTagsThreads: [...docArray, ...this.state.NewDMFromTagsThreads],
              NewDM3: true,
            },
            () => this.checkNewDMRace()
          );
        })
        .catch((e) => {
          console.error(
            "Something went wrong getting ByYouDMThreads Names:\n",
            e
          );
          this.setState({
            FromTagsNewDMThreadsNamesError: true, //<- add to state? ->
          });
        }).finally(() => client.disconnect());
    };

  // AUTO-UPDATE QUERIES ^^^
  //#######################################################################

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
            <LandingPage 
            mode={this.state.mode}
            />
            <LoginBottomNav 
            mode={this.state.mode}
             showModal={this.showModal} 
             />
            <Footer />
          </>
        ) : (
          <>
            <MessagesPage
              isLoading={this.state.isLoading}
              isLoadingRefresh={this.state.isLoadingRefresh}
              isLoadingEveryone={this.state.isLoadingEveryone}
              isLoadingForYou={this.state.isLoadingForYou}
              errorToDisplay={this.state.errorToDisplay}
              identity={this.state.identity}
              identityInfo={this.state.identityInfo}
              uniqueName={this.state.uniqueName}

              EveryoneMsgs={this.state.EveryoneMsgs}
              EveryoneNames={this.state.EveryoneNames}

              ByYouMsgs={this.state.ByYouMsgs}
              ByYouNames={this.state.ByYouNames}

              FromTagsMsgs={this.state.FromTagsMsgs}
              FromTagsNames={this.state.FromTagsNames}

              EveryoneThreads={this.state.EveryoneThreads}
              EveryoneThreadsNames={this.state.EveryoneThreadsNames}

              ByYouThreads={this.state.ByYouThreads}
              ByYouThreadsNames={this.state.ByYouThreadsNames}

              FromTagsThreads={this.state.FromTagsThreads}
              FromTagsThreadsNames={this.state.FromTagsThreadsNames}

              NewSOMsgs={this.state.NewSOMsgs}
              NewSOThreads={this.state.NewSOThreads}

              NewDMByYouThreads={this.state.NewDMByYouThreads}
              NewDMFromTagsMsgs={this.state.NewDMFromTagsMsgs}
              NewDMFromTagsThreads={this.state.NewDMFromTagsThreads}

              mode={this.state.mode}
              showModal={this.showModal}
              handleThread={this.handleThread}
              pushNewSOtoView={this.pushNewSOtoView}
              pushNewDMtoView={this.pushNewDMtoView}
            />

            {!this.state.isLoading &&
            this.state.identity !== "No Identity" &&
            this.state.uniqueName !== "Er" ? (
              <BottomNav
                isLoadingRefresh={this.state.isLoadingRefresh}
                closeExpandedNavs={this.closeExpandedNavs}
                
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
        this.state.presentModal === "SendTipModal" ? (
          <SendTipModal
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            sendATip={this.sendATip}
            closeExpandedNavs={this.closeExpandedNavs}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "NewSOModal" ? (
          <NewSOModal
            whichNetwork={this.state.whichNetwork}
            DataContractDPNS={this.state.DataContractDPNS}
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
            DataContractDPNS={this.state.DataContractDPNS}
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
        this.state.presentModal === "NewThreadModal" ? (
          <NewThreadModal
            whichNetwork={this.state.whichNetwork}
            DataContractDPNS={this.state.DataContractDPNS}
            uniqueName={this.state.uniqueName}
            submitDSOThread={this.submitDSOThread}
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
          accountBalance={this.state.accountBalance}
          isLoadingWallet={this.state.isLoadingWallet}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            doTopUpIdentity={this.doTopUpIdentity}
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

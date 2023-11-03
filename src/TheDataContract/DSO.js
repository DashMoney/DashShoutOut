
const Dash = require('dash');

const clientOpts = {
  network: 'testnet',
  wallet: {
    mnemonic: 'put 12 word mnemonic here..', //<- CHANGE*********
    unsafeOptions: {
      skipSynchronizationBeforeHeight: 910000, //<- CHANGE*********
      
    },
  },
};

const client = new Dash.Client(clientOpts);

const registerContract = async () => {
  const { platform } = client;
  const identity = await platform.identities.get(
    'put the identity id for the mnemonic above here..' //<- CHANGE*********
  );
  

  /* 1)
  { //DSOEveryone Query
    where: [
      ['sh', '==', 'out'], 
      ['$createdAt', '<=' , Date.now()] 
    ],
    orderBy: [
    ['$createdAt', 'desc'],
  ],
  }*/

  /* 2)
  { //DSOForyou Query -> From you (SO and DM)
    where: [
      ['$ownerId', '==', ****YourOwnerIdString***],
      ['$createdAt', '<=' , Date.now()]
    ],
    orderBy: [
    ['$createdAt', 'desc'],
  ],
  }*/

  /* 4)
  { //DSOForyouQuery -> From other's tags (SO and DM) 
    where: [
      ['$id', 'in', ****[idMsgsString]***],
      ['$createdAt', '<=' , Date.now()]
    ],
    orderBy: [
    ['$createdAt', 'desc'],
  ],
  ],
  }*/

  //###################################################################

  //Tags Query -> for getting Tags from others.

  /* 3) 
    where: [      
      ['toId', '==' ,****YourOwnerIdString***],
      ['$createdAt', '<=' , Date.now()]
    ],
    orderBy: [
    ['$createdAt', 'desc'],
  ],
  });
};
  */

// BELOW IS FOR RETRIEVAL AND TO DELETE TAGS.
/*
  const getTagsFromIdOfMsg = async () => {
  return client.platform.documents.get('DSOContract.dsomsg', {
    where: [      
      ['msgId', '==' ,  ****[msgId of Tags]***] 
    ],
  });
};
  */
 //###################################################################



  const contractDocuments = {
    dsomsg: {
      type: 'object',
      indices: [
        {
          //This is the the Everybody query ->
          name: 'shoutAndcreatedAt',
          properties: [{ sh: 'asc' }, { $createdAt: 'asc' }],
          unique: false,
        },
        {
          //This is the the Foryou query -> From you (Shout and DM)
          name: 'ownerIdAndcreatedAt',
          properties: [{ $ownerId: 'asc' }, { $createdAt: 'asc' }],
          unique: false,
        },
        
      ],

      properties: {
        msg: {
          type: 'string',
          minLength: 1,
          maxLength: 450,
        },
        sh: {
          type: 'string',
          minLength: 1,
          maxLength: 32,
        },
         
      },
      //SO THE 'sh' WILL BE OPTIONAL TO ALLOW FOR DIFFERENT QUERY ABILITY.
      required: ['msg', "$createdAt", "$updatedAt"],
      additionalProperties: false,
    },

    dsothr: {
      type: 'object',
      indices: [
        {
          name: 'msgId',
          properties: [{ msgId: 'asc' }],
          unique: false,
        },
       
      ],

      properties: {
        
        msg: {
          type: 'string',
          minLength: 1,
          maxLength: 450,
        },
        sh: {
          type: 'string',
          minLength: 1,
          maxLength: 32,
        },
        msgId:{ //This is for enabling the reply/thread capability!!
          type: 'array',
          byteArray: true,
          minItems: 32,
          maxItems: 32,
          contentMediaType: 'application/x.dash.dpp.identifier',
        } 
      },
      required: ['msg', 'msgId', "$createdAt", "$updatedAt"],
      additionalProperties: false,
    },

    dsotag: {
      type: 'object',
      indices: [
        { //This is so the user can find the most recent tags for them
          name: 'toIdandcreatedAt',
          properties: [{ toId: 'asc' }, { $createdAt: 'asc' }],
          unique: false,
        },
        { //This is for the finding and deleting of tags
          name: 'msgId',
          properties: [{ msgId: 'asc' }],
          unique: false,
        },
      ],
      properties: {

        toId: {
          type: 'array',
          byteArray: true,
          minItems: 32,
          maxItems: 32,
          contentMediaType: 'application/x.dash.dpp.identifier',
        },
        msgId:{ 
          type: 'array',
          byteArray: true,
          minItems: 32,
          maxItems: 32,
          contentMediaType: 'application/x.dash.dpp.identifier',
        }       
      },
      required: ['toId', 'msgId', "$createdAt", "$updatedAt"],
      additionalProperties: false,
    },
  };


  const contract = await platform.contracts.create(contractDocuments, identity);
  console.dir({ contract: contract.toJSON() });

  

    await platform.contracts.publish(contract, identity);
  return contract;
   
};

registerContract()
  .then((d) => console.log('Contract registered:\n', d.toJSON()))
  .catch((e) => console.error('Something went wrong:\n', e))
  .finally(() => client.disconnect());

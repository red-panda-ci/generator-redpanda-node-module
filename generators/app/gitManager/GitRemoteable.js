'use strict'

const Interface = require('interface')

/*
{constructor}: The class that implements this interface
   has to receive in the constructor the object autoziation: {type, username, password, token}

{createRepo}: sholuld to be a Promise and return an object with props:
  {htmlUrl,  ownerUrl, sshUrl}, and receive as argument an object { name: <String>, org<String Options>, private: <Boolean> }

{projection}: Make object transformation to use the method createRepo (use helper method 'projection' in utils module)
*/

const GitRemoteable = Interface.create('createRepo', 'projection')

module.exports = GitRemoteable

import * as http from 'http';
const packets = require('../in/session6.json');
import * as util from 'util';
import * as packet from './packet';
import * as error from './error';

// Filter down to relevant HTTP packets
// Early 
if (!Array.isArray(packets))
    error.exit(error.ERROR_TYPE.InvalidPacketStructure);

const filteredPackets = packet.http.filter(packets);
console.log(filteredPackets);
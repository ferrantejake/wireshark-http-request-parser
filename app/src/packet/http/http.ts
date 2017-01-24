import { Packet } from '../packet';
import * as error from '../../error';
import * as request from 'request';

// This is a rough sketch of what a WireShark HTTP packet
// looks like excluding many non-crucial fields.
export interface HttpPacket {
    'http.date': string;
    'http.server': string;
    'http.location': string;
    'http.content_length_header': string;
    'http.content_length_header_tree': {
        'http.content_length': string
    };
    'http.connection': string;
    'http.content_type': string;
    '\\r\\n': string;
    'http.response': string;
    'http.response_number': string;
    'http.time': string;
    'http.request_in': string;
    'http.next_request_in': string;
    'http.next_response_in': string;
    'http.file_data': string;
    // 'HTTP\/1.1 302 Found\\r\\n'
    // Supports a key which may have these properties
    [key: string]: {
        '_ws.expert': {
            'http.chat': string,
            '_ws.expert.message': string,
            '_ws.expert.severity': string,
            '_ws.expert.group': string
        },
        'http.request.version': string,
        'http.response.code': string,
        'http.response.phrase': string
    } | any;
};

export interface HttpObject {
    method: string;
    response: boolean;
    resource: string;
    headers: any;

}

export function filter(packets: Packet[]): HttpObject[] {
    try {
        let filteredPackets: HttpObject[] = [];
        packets.forEach(packet => isHttpPacket(packet) ? filteredPackets.push(filterOnHttpPacket(packet)) : console.log('not an http packet'));
        return filteredPackets;
    } catch (e) { return []; }
};

export function isHttpPacket(packet: any) {
    try { return packet._source.layers.http ? true : false; }
    catch (e) { return false; }
}

function filterOnHttpPacket(packet: Packet): HttpObject {
    console.log('found packet:');
    // console.log(packet);

    const parsedPacket = getHttpObject(packet);
    console.log('parsed packet:');
    console.log(parsedPacket);
    return parsedPacket;
}

function getHttpObject(packet: Packet): HttpObject {
    try {
        const httpObject = packet._source.layers.http;
        const requestPattern = /^(GET|POST|HTTP\\\/1.1|\[truncated\]|\s\[truncated\])/;
        const responsePattern = /^(HTTP\/1.1 \d{3})/;
        for (const key in httpObject) {
            if (requestPattern.test(key)) { return parseRequestObject(httpObject); }
            else if (responsePattern.test(key)) { return parseResponseObject(httpObject); }
        }
        return null;
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
}

function parseRequestObject(httpObject: HttpPacket): HttpObject {
    const obj: HttpObject = {
        headers: {},
        method: undefined,
        resource: undefined,
        response: undefined
    };
    return obj;
}

function parseResponseObject(httpObject: HttpPacket): HttpObject {
    const obj: HttpObject = {
        headers: {},
        method: undefined,
        resource: undefined,
        response: undefined
    };
    return obj;
}

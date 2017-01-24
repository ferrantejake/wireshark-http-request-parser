// This is a rough sketch of what a WireShark HTTP packet
// looks like excluding many non-crucial fields.
export interface Packet {
    _index: string;
    _type: string;
    _score: any;
    _source: {
        layers: {
            frame: any,
            eth: any
            ip: any,
            tcp: any,
            'tcp.segments': any
            ssl: any
            http: {
                'HTTP\/1.1 302 Found\\r\\n': {
                    '_ws.expert': {
                        'http.chat': string,
                        '_ws.expert.message': string,
                        '_ws.expert.severity': string,
                        '_ws.expert.group': string
                    },
                    'http.request.version': string,
                    'http.response.code': string,
                    'http.response.phrase': string
                },
                'http.date': string,
                'http.server': string,
                'http.location': string,
                'http.content_length_header': string,
                'http.content_length_header_tree': {
                    'http.content_length': string
                },
                'http.connection': string,
                'http.content_type': string,
                '\\r\\n': string,
                'http.response': string,
                'http.response_number': string,
                'http.time': string,
                'http.request_in': string,
                'http.next_request_in': string,
                'http.next_response_in': string,
                'http.file_data': string
            },
            'data-text-lines': any
        }
    };
}
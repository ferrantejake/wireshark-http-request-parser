export function exit(error: ERROR_TYPE) {
    let errorMessage = '';
    switch (error) {
        case ERROR_TYPE.InvalidPacketStructure: errorMessage = 'invalid packets structure';
        default: errorMessage = 'undefined error';
    };
    throw new Error(errorMessage);
}

export enum ERROR_TYPE {
    InvalidPacketStructure,
    InvalidHTTPPacketStructure,
}
import DomainError from './DomainError.js';

function generateMsg(error) {
    let msg = '';
    let e = error;

    do {
        const m = e.message || e.reason;
        if (m) {
            msg += `[${m}]`;
        }
        e = e.cause;
    } while (e);
    return msg;
}

class DeepError extends DomainError {
    constructor(error) {
        super(generateMsg(error));
        this.cause = error;
    }
}
export default DeepError;

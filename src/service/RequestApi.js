import { API } from 'aws-amplify';
import RequestError from '../error/RequestError.js';


/**
 * @desc Enables the interaction with the profile and comms services. When creating the object
 * the activeUser has to be passed into the constructor
 * @see BaseApi
 */
class RequestApi {
    static async post({ endpoint, body, apiName }) {
        try {
            const result = await API.post(
                apiName,
                `/${endpoint}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body,
                },
            );
            return result;
        } catch (err) {
            console.log(err);
            let httpCode = 0;
            let message = '';
            if (err.response) {
                const {
                    response: { status, data },
                } = err;
                httpCode = status;
                message = data.message;
            } else {
                message = err.message || err;
            }
            throw new RequestError(message, httpCode, err);
        }
    }
}

export default RequestApi;

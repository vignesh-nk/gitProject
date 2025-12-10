window.BASE_URL = "https://apicr.suturenote.ai/";
const BASE_URL = "https://apicr.suturenote.ai/";
window.BASE_URL_KINESIS = "https://edacr.suturenote.ai/";
const BASE_URL_KINESIS = "https://edacr.suturenote.ai/";

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        BASE_URL: window.BASE_URL,
        BASE_URL_KINESIS: window.BASE_URL_KINESIS 
    };
}
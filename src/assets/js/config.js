window.BASE_URL = "https://apicr.suturenote.ai/";
const BASE_URL = "https://apicr.suturenote.ai/";
window.BASE_URL_KINESIS = "https://edacr.suturenote.ai/";
const BASE_URL_KINESIS = "https://edacr.suturenote.ai/";
window.BASE_PHRASE_URL = "https://create.suturenote.ai/dot_phrase/";
const BASE_PHRASE_URL = "https://create.suturenote.ai/dot_phrase/";
window.BASE_GOOGLE_REDIRECT_URL = "https://create.suturenote.ai/dist/html/patient_summary.html";
const BASE_GOOGLE_REDIRECT_URL = "https://create.suturenote.ai/dist/html/patient_summary.html";


if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        BASE_URL: window.BASE_URL,
        BASE_URL_KINESIS: window.BASE_URL_KINESIS,
        BASE_PHRASE_URL: window.BASE_PHRASE_URL,
        BASE_GOOGLE_REDIRECT_URL: window.BASE_GOOGLE_REDIRECT_URL 
    };
}
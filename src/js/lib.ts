export class Utils {
    constructor() {}
    static getUrlQuery(key: string, url?: string) {
        let reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i');
        if (!url) {
            url = window.location.search;
        }
        let regResult = url.substr(1).match(reg);
        let result = null;
        if (regResult) {
            result = decodeURIComponent(regResult[2]);
        }
        return result;
    }
}

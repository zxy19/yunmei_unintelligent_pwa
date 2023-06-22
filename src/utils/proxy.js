//代理请求接口。
const axios = require('axios');
function joinUrl(baseUrl, relativePath) {
    return new URL(relativePath, baseUrl).href;
}
export class ProxyRequest {
    constructor(proxyUrl, baseUrl) {
        this.proxyUrl = proxyUrl;
        this.baseUrl = baseUrl;
    }
    async get(url, header = [], cookie = "") {
        url = joinUrl(this.baseUrl, url);
        try {
            let t_data = await axios({
                url: this.proxyUrl,
                method: "post",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: {
                    method: "get",
                    cookie, header, url
                },
                withCredentials: false
            });
            return t_data.data;
        } catch (error) {
            console.log(error);
        }
    }

    async post(url, data, header = [], cookie = "") {
        url = joinUrl(this.baseUrl, url);
        try {
            let t_data = await axios({
                url: this.proxyUrl,
                method: "post",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: {
                    data:data, method: "post",
                    cookie, header, url
                },
                withCredentials: false
            });
            return t_data.data;
        } catch (error) {
            console.log(error);
        }
    }
    setBaseUrl(url) {
        this.baseUrl = url;
    }
}
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = false;
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // récupéré depuis le context indirectement
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


axios.interceptors.response.use(
    (response: any) => {
        console.log("interceptor response", response);
        return response;
    },
    (error: any) => {
        if (error.response) {
            const {status} = error.response;
            console.log("interceptor error", status);

            switch (status) {
                case 400:
                    console.log("ERROR 400: Bad Request");
                    break;
                case 401:
                    console.log("ERROR 401: Unauthorized");
                    return Promise.reject(error?.response ?? error);
                case 403:
                    console.log("ERROR 403: Forbidden");
                    break;
                case 404:
                    console.log("ERROR 404: Not Found");
                    break;
                case 500:
                    console.log("ERROR 500: Internal Server Error");
                    break;
                default:
                    console.log("Unknown Error");
                    break;
            }
        } else {
            console.error("No response received", error);
        }
        return Promise.reject(error);
    }
);


export const get = async (url: string, config: any = {}) => {
    return axios.get(url, config)
        .then((response) => response.data)
        .catch((error) => {
            console.error("API call failed", error);
            return undefined;
        });
};

export const post = async (url: string, data: object, config: any = {}) => {
    return axios.post(url, data, config)
    .then((response) => response.data)
    .catch((error) => {
        console.error("API call failed", error);
        return undefined;
    })
};

export const put = async (url: string, data: object, config: any = {}) => {
    return axios.put(url, data, config)
        .then((response) => response.data)
        .catch((error) => {
            console.error("API call failed", error);
            return undefined;
        })
};

get("/product/all").then((data) => console.log("Produits:", data));
import axios from "api/axios";

const Fetcher = (url, user) => {
    if (user) {
        return axios.get(url, {
            headers: {
                Authorization: `Bearer ${user?.token}`,
            },
        });
    } else {
        return axios(url);
    }
};

export default Fetcher;

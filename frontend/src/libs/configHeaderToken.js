export default (token) => {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    return config;
}




if (process.env.NODE_ENV === 'development') {
    require('../../mock/home')
}

let postApi = (path, mock) => {
    return path + (mock ? '' : '.mock');
};
let mock=0;


export const HOME={
    entries:postApi("/shopping/v2/entries", mock),
    recommend:postApi("/shopping/v2/recommend", mock)
}
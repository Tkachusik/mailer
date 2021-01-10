import axios from 'axios';

export const getFolders = (token) => async (dispatch) => {
    console.log("send request to server");
    const auth = `Bearer ${token}`;
    const result = await axios
        .get('https://gmail.googleapis.com/gmail/v1/users/me/labels', {headers: { Authorization: auth }});
    console.log(result);
    return dispatch({type: "GET_FOLDERS", data: result.data})
}

export const setAccessToken = (token) => ({type: "SET_ACCESS_TOKEN", token});

export const selectFolder = (id, token) => async (dispatch) => {
    const auth = `Bearer ${token}`;
    const result = await axios.get(`https://gmail.googleapis.com/gmail/v1/users/me/messages?labelIds=${id}&maxResults=50`, {headers:  {Authorization: auth }});
    
    // get every message
    const requests = result.data.messages.map(message => {
        return axios.get(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${message.id}`, {headers: { Authorization: auth }});
    });

    const responses = await Promise.all(requests);
    const messages = responses.map(resp => resp.data);

    return dispatch({type: "SELECT_FOLDER", id, messages: messages, paginationNextToken: result.data.nextPageToken});
}

export const nextMessages = (folderId, token, currentPage, paginationTokens) => async (dispatch) => {
    const auth = `Bearer ${token}`;
    // const nextPageToken = paginationTokens[currentPage-1];

    const result = await axios.get(`https://gmail.googleapis.com/gmail/v1/users/me/messages`, 
        {
            headers:  {Authorization: auth },
            params: {
                labelIds: folderId,
                maxResults: 50,
                pageToken: paginationTokens.get(currentPage+1),
            },
        }
    );
    
    // get every message
    const requests = result.data.messages.map(message => {
        return axios.get(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${message.id}`, {headers: { Authorization: auth }});
    });

    const responses = await Promise.all(requests);
    const messages = responses.map(resp => resp.data);

    return dispatch({type: "NEXT_MESSAGES", messages: messages, paginationNextToken: result.data.nextPageToken});
}

export const prevMessages = (folderId, token, currentPage, paginationTokens) => async (dispatch) => {
    const auth = `Bearer ${token}`;
    // const prevPageTokenIndex = currentPage-3;

    const result = await axios.get(`https://gmail.googleapis.com/gmail/v1/users/me/messages`, 
        {
            headers:  {Authorization: auth },
            params: {
                labelIds: folderId,
                maxResults: 50,
                // pageToken: prevPageTokenIndex < 0 ? 0 : paginationTokens[prevPageTokenIndex],
                pageToken: paginationTokens.get(currentPage-1),
            },
        }
    );
    
    // get every message
    const requests = result.data.messages.map(message => {
        return axios.get(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${message.id}`, {headers: { Authorization: auth }});
    });

    const responses = await Promise.all(requests);
    const messages = responses.map(resp => resp.data);

    return dispatch({type: "PREV_MESSAGES", messages: messages});
};

export const showMessageDetails = (id) => ({type: "SHOW_MESSAGE_DETAILS", id});
const initialState = {
    folders: [],
    accessToken: "",
    selectedFolderId: "",
    messages: [],
    // paginationTokens: [],
    paginationTokens: new Map(),
    currentPage: 1,
    showMessageDetailsId: "",
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_FOLDERS":
            return {
                ...state,
                folders: action.data.labels,
            }
        case "SET_ACCESS_TOKEN":
            return {
                ...state,
                accessToken: action.token,
            }
        case "SELECT_FOLDER":
            const initMap = new Map();
            initMap.set(1, 0);
            initMap.set(2, action.paginationNextToken);

            return {
                ...state,
                messages: action.messages,
                selectedFolderId: action.id,
                currentPage: 1,
                paginationTokens: initMap,
            }
        case "NEXT_MESSAGES":
            const nextPage = state.currentPage + 1;
            const map = new Map(state.paginationTokens);
            map.set(nextPage+1, action.paginationNextToken);

            return {
                ...state,
                messages: action.messages,
                currentPage: nextPage,
                paginationTokens: map,
            }
        case "PREV_MESSAGES":
            const prevPage = state.currentPage - 1
            return {
                ...state,
                messages: action.messages,
                currentPage: prevPage < 1 ? 1 : prevPage,
            }
            case "SHOW_MESSAGE_DETAILS":
                return {
                    ...state, 
                    showMessageDetailsId: action.id,
                }
        default:
            return state;
    }
}
export default reducer;
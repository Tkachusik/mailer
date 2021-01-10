import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getFolders, selectFolder } from './actions';

const Folders = ({ getFolders, accessToken, folders, selectFolder, selectedFolderId }) => {

    useEffect(() => {
        getFolders(accessToken);
    }, [])

    return (
        <div>
            <ul>
                {folders.map((label) => (
                    <li  className={label.id === selectedFolderId ? "marker active" : "marker"} onClick={() => selectFolder(label.id, accessToken)} key={label.id}>
                        <a href="#">{label.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        folders: state.folders,
        accessToken: state.accessToken,
        selectedFolderId: state.selectedFolderId,
    }
}

const mapDispatchToProps = {
    getFolders,
    selectFolder,
}
export default connect(mapStateToProps, mapDispatchToProps)(Folders);
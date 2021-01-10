import React from 'react';
import { connect } from 'react-redux';
import { nextMessages, prevMessages, showMessageDetails } from "./actions";
import parseMessage from 'gmail-api-parse-message';

const getMessageInfo = (message) => {
    let date = ""
    let subject = ""
    let from = ""
    let to = ""

    for (let i = 0; i < message.payload.headers.length; i++) {
        if (message.payload.headers[i].name === "Date") {
            date = message.payload.headers[i].value
        }
        if (message.payload.headers[i].name === "Subject") {
            subject = message.payload.headers[i].value
        }
        if (message.payload.headers[i].name === "To") {
            to = message.payload.headers[i].value
        }
        if (message.payload.headers[i].name === "From") {
            from = message.payload.headers[i].value
        }
    }

    return {
        date,
        subject,
        from, 
        to,
    }
}

const Mails = ({ selectedFolderId, messages, nextMessages, prevMessages, accessToken, currentPage, paginationTokens, showMessageDetails, showMessageDetailsId }) => {
    return (
        <div>
            <div className="button-pozition">
                <button type="button" className="btn btn-light" onClick={() => prevMessages(selectedFolderId, accessToken, currentPage, paginationTokens)}>pref</button>
                <button type="button" className="btn btn-light" onClick={() => nextMessages(selectedFolderId, accessToken, currentPage, paginationTokens)}>next</button>
            </div>
            {
                (selectedFolderId === "") ?
                    "You must select a folder"
                    :
                    <div>
                        {messages.map((message) => {
                            const { date, subject, from, to } = getMessageInfo(message);
                            return (
                                <div onClick={() => showMessageDetails(message.id)} className="email-message" key={message.id}>
                                    <b>{subject}</b> | {date}
                                    {
                                        (message.id === showMessageDetailsId) ?
                                            <div>
                                                <p>From: {from}</p>
                                                <p>To: {to}</p>
                                                <p>Message: {parseMessage(message).textPlain}</p>
                                            </div>
                                            : ""
                                    }
                                    <hr />
                                </div>
                            )
                        })}
                    </div>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        selectedFolderId: state.selectedFolderId,
        messages: state.messages,
        accessToken: state.accessToken,
        currentPage: state.currentPage,
        paginationTokens: state.paginationTokens,
        showMessageDetailsId: state.showMessageDetailsId,
    }
}

const mapDispatchToProps = {
    nextMessages,
    prevMessages,
    showMessageDetails,
}

export default connect(mapStateToProps, mapDispatchToProps)(Mails);
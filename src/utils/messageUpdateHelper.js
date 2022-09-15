export const messageUpdateHelper = (message, messageStatus, setMessage, setMessageStatus) => {
    setMessage(message)
    setMessageStatus(messageStatus)

    setTimeout(() => {
        setMessage(null)
        setMessageStatus(null)
    }, 3000)
}

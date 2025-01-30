const sendNotification = async (userId, message) => {
    const user = await Client.findById(userId);
    if(user) {
        user.notifications.push(message);
        await user.save();
    }
};

module.exports = { sendNotification };
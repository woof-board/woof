const appendZero = input => {
	const inputStr = input.toString();
  	return inputStr.length < 2 ? `0${inputStr}` : inputStr;
};

module.exports.formatDate = timeStamp => {
	const dateObj = new Date(timeStamp);
  	return `${dateObj.getFullYear()}-${appendZero(dateObj.getMonth() + 1)}-${appendZero(dateObj.getUTCDate())}`;
}

module.exports.getTimeSlot = timeStr => {
    return `slot${timeStr}`;
}
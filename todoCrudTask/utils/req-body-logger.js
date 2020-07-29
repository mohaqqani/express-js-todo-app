// Prints stringified Reqbody in console
const log = (functionName, dataBody) => {
    console.log("");
    console.log("=============" + functionName + " [START] ==================");
    console.log(JSON.stringify(dataBody, null, 4));
    console.log("=============" + functionName + " [END] ==================");
    console.log("");
};


module.exports = log;

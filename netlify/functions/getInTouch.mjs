exports.handler = async function(event) {
    const requestBody = JSON.parse(event.body);
    if (event.body === null || Object.keys(requestBody).length === 0) {
        return {
            statusCode: 400,
            body: JSON.stringify("Payload required")
        }
    }
    try{
         const response = await fetch(`${process.env.URL}/.netlify/functions/emails/getInTouch`, {
             headers: {
                 "netlify-emails-secret": process.env.NETLIFY_EMAILS_SECRET
             },
             method: "POST",
             body: JSON.stringify({
                 from: {
                     email: "blogi.rendszergazda@gmail.com",
                     name: "Kapcsolatfelvételi kérelem"
                 },
                 to: "szakacs.agi21@gmail.com",
                 subject: "Új ember szeretné felvenni a kapcsolatot veled",
                 text: "Szép napot Anna! Valaki szeretné felvenni veled a kapcsolatot",
                 parameters: {...requestBody}
             })
         })
        if (response.statusText === 'OK'){
            return {
                statusCode: 200,
                body: JSON.stringify("Subscribe email sent!")
            }
        }
       else{
           let error= new Error("The email sent was unsuccessful");
           error.cause = {statusCode:response.status, statusText:response.statusText}
            throw error;
        }
    }
    catch(error){
        console.error(error)
        console.error(`Error in get getInTouch email template ${error.cause.statusCode}`);
        return {
            statusCode: error.cause.statusCode,
            body: JSON.stringify(error.cause.statusText)
        }
    }
}
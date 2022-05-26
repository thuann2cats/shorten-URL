// SET original instruction text

// SET main values
const fetchURL = 'https://api.rebrandly.com/v1/links';
const apiKey = 'af2226bc399c486fbd3a3fa186531691';

// setOnclick, must prevent default, on Shorten button
const shortenButton = document.getElementById("shorten-button");
shortenButton.addEventListener('click', evt => {
    evt.preventDefault();
    const URLtoShorten = document.getElementById("url-to-shorten").value.trim();
    if (URLtoShorten) {
        getShortURL_ver2(URLtoShorten);
    } else {
        document.getElementById("returned-url-box").innerHTML = 'Please enter a URL';
    }
});

let res;
let jsonResponse;

async function getShortURL_ver2(URLtoShorten) {
    // create the body of the init object in Fetch request
    const bodyData = JSON.stringify({destination: URLtoShorten});

    // create the header
    // const headerData = JSON.stringify({Content-type: 'application/json', apikey: apiKey});

    const initObject = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            apikey: apiKey
        },
        body: bodyData
    };

    try {
        res = await fetch(fetchURL, initObject);
        if (res.ok) {
            console.log(`inside async ${res.status}`)
            jsonResponse = await res.json();
            renderResponse(jsonResponse);
        } else {
            throw new Error(`Errorrrrr in the async func: ${res.status}`)
        }
    } catch (err) {
        console.log(`Error here here in async func ${err}`);
        const returnedURL = document.getElementById("returned-url-box");
        returnedURL.innerHTML = `(async) Error in generating URL for: '${URLtoShorten}'`;
    }

}

function getShortURL(URLtoShorten) {
    
    // create the body of the init object in Fetch request
    const bodyData = JSON.stringify({destination: URLtoShorten});

    // create the header
    // const headerData = JSON.stringify({Content-type: 'application/json', apikey: apiKey});

    const initObject = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            apikey: apiKey
        },
        body: bodyData
    };

    // fetch --> check response --> handle with renderResponse()
    fetch(fetchURL, initObject)
        .then(response => {
            if (response.ok) {
                console.log(`in normal ver`)
                return response.json();
            } else {
                throw new Error(`Error: ${response.status}`);
            }
        })
        .then(json => renderResponse(json))
        //--> exception then display the error message on the screen
        .catch(err => {
            console.log(`Error here here ${err}`);
            const returnedURL = document.getElementById("returned-url-box");
            returnedURL.innerHTML = `Error in generating URL for: '${URLtoShorten}'`;
        });


}

// renderResponse
function renderResponse(json) {
    console.log(json);
    //extract the link part of json
    const shortenedURL = json.shortUrl;

    //update the <p> box
    const returnedURL = document.getElementById("returned-url-box");
    returnedURL.innerHTML = `Your shortened URL is:<br><br> <a href="https://${shortenedURL}" target="_blank" style="color:white;">${shortenedURL}</a>`;
    console.log(`Your shortened URL is:\n ${shortenedURL}`);
}
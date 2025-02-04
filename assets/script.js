// Function to load an external HTML file (like header.html or footer.html) into a specific div.
function loadComponent(component, targetID) {
    fetch(component) // Fetch the external HTML file (e.g., "components/header.html").
        .then(response => response.text()) // Convert the fetched response into plain text (HTML).
        .then(data => {
            document.getElementById(targetID).innerHTML = data; // Insert the fetched HTML content into the specified div.
        })
        // If the fetch fails (e.g., file not found), display an error message in the console.
        .catch(error => console.error("Error loading component:", component, error));
}

//##############################################################################

// Function to load an external HTML page (like home.html, projects.html) dynamically into #content, and update browser history.
function loadPage(page, addToHistory = true) {
    fetch(`components/${page}.html`) // Fetch the requested HTML page.
        .then(response => response.text()) // Convert the response to plain text (HTML content).
        .then(data => {
            document.getElementById('content').innerHTML = data; // Insert the fetched HTML content inside the #content div.
            updateCSS(page); // Load corresponding CSS file

            //Store the last visited page in localStorage.
            localStorage.setItem("lastVisitedPage", page);

            //Format the new has URL correctly.
            const newHash = `#${page}`;

            //Update the browswer's url and history state, and prevent redundant history states. 
            if (addToHistory && window.location.hash != newHash) {
                history.pushState({page:page}, "", newHash);
            }
            
            console.log(`${page} loaded successfully.`)
        })
        // If there is an error (e.g., page not found), log it in the console.
        .catch(error => console.error("Error loading page", error));
}

//##############################################################################
//function to update CSS file dynamically based on the current page. 
function updateCSS(page) {
    const cssFile =  `${page}.css`; //Extract CSS file name. 
    const cssPath = `assets/css/${cssFile}`;

    let existingLink = document.getElementById("dynamic-css");
    
    //only page specific CSS file is loaded at a time and prevents redundancy.
    if (existingLink) { // looks for and existing <link> element wit id="dynamic-css"
        existingLink.href = cssPath; //Update existing CSS file. 
    } 
    else {
        let newLink = document.createElement("link");
        newLink.rel = "stylesheet";
        newLink.id = "dynamic-css";
        newLink.href = cssPath;
        document.head.appendChild(newLink); //the <link> is appended to head, adding new stylesheet to the page. 
    }
    console.log(`CSS updated: ${cssPath}`)
}

//##############################################################################

// When the document is fully loaded, automatically load the header, footer, and the default home page.
document.addEventListener("DOMContentLoaded", function () {
    loadComponent("components/header.html", 'header'); // Load header.html into the <div id="header"></div>.
    loadComponent("components/footer.html", "footer"); // Load footer.html into the <div id="footer"></div>.

    //Check the URL for a page hash before defaulting to home
    const urlPage = window.location.hash.substring(1) || "home"; //Extract the page from the url hash (e.g., "projects" -> "projects")
    loadPage(urlPage, false);
});

//##############################################################################

//Handle navigation clicks dynamically.
document.body.addEventListener("click", function(event){
    if (event.target.tagName === "A" && event.target.getAttribute("href")) {
        let link = event.target.getAttribute("href");

        //Allow external links (http, https) to open normally. 
        if (link.startsWith("http") || link.startsWith("mailto") || link.startsWith("tel")) {
            return; //allow normal behaviour.
        }

        event.preventDefault(); //Prevent default navigation

        let page = link.replace(".html", "");
        loadPage(page); //Load the clicked page dynamically.
    }
});

//##############################################################################

//Handle Back and Forward Browswer Navigation
window.addEventListener("popstate", function (event) { //'popstate' event fires when link is clicked. 
    if (event.state && event.state.page) { //contains data stored in history.pushState({page:page})
        loadPage(event.state.page, false); //Load the stored page without pushing new history.
    }
});

//##############################################################################
// script.js

// Wait for the DOM content to be fully loaded before executing JavaScript
document.addEventListener("DOMContentLoaded", function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll(".nav-button");

    // Loop through each navigation link
    navLinks.forEach(function(link) {
        // Add a click event listener to each link
        link.addEventListener("click", function(event) {
            // Prevent the default behavior of the link
            event.preventDefault();
            
            // Get the href attribute of the clicked link
            const href = link.getAttribute("href");
            
            // Navigate to the specified href
            window.location.href = href;
        });
    });
});

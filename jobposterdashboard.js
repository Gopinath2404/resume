document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll(".nav-links a");
    const content = document.getElementById("content");
    const sidebar = document.getElementById("sidebar");
    const menuToggle = document.getElementById("menu-toggle");

    // Handle sidebar toggle
    menuToggle.addEventListener("click", function() {
        sidebar.classList.toggle("active"); // Toggle the 'active' class on the sidebar
    });

    // Prevent default link behavior and update content dynamically
    links.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault(); // Stop the page from reloading

            // Get the page name from the href attribute
            const page = this.getAttribute("href").replace(".html", "");

            // Call the navigate function
            navigate(page);
        });
    });
});

// Function to load content dynamically
function navigate(page) {
    let contentArea = document.getElementById("content");

    switch (page) {
        case "postjob":
            window.location.href = "postjob.html";
            break;

        case "myjobs":
            window.location.href = "myjob.html";
            break;

        case "mentorform":
            window.location.href = "mentorform.html";
            break;

        case "mentor list":
            window.location.href = "mentor list.html";
            break;

        case "womenjob": // Logout case
            window.location.href = "womenjob.html";
            break;

        default:
            window.location.href = "postjob.html";
            break;
    }
}
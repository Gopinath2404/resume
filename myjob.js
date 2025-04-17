document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const jobCards = document.querySelectorAll(".job-card");

    // Function to update job status in localStorage
    function saveJobStatus(jobId, status) {
        let jobStatuses = JSON.parse(localStorage.getItem("jobStatuses")) || {};
        jobStatuses[jobId] = status;
        localStorage.setItem("jobStatuses", JSON.stringify(jobStatuses));
    }

    // Function to load job statuses from localStorage
    function loadJobStatuses() {
        let jobStatuses = JSON.parse(localStorage.getItem("jobStatuses")) || {};
        jobCards.forEach(card => {
            let jobId = card.querySelector("h3").textContent.trim(); // Using job title as an ID
            if (jobStatuses[jobId] === "closed") {
                closeJobUI(card);
            }
        });
    }

    // Function to update UI when closing a job
    function closeJobUI(jobCard) {
        jobCard.setAttribute("data-status", "closed");
        jobCard.querySelector(".status").textContent = "CLOSED";
        jobCard.querySelector(".status").style.color = "#F44336";

        // Disable and change button text
        let closeBtn = jobCard.querySelector(".close-job-btn");
        closeBtn.textContent = "Closed";
        closeBtn.disabled = true;
    }

    // Load saved job statuses on page load
    loadJobStatuses();

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.getAttribute("data-filter");

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            // Show/Hide jobs based on filter
            jobCards.forEach(card => {
                if (filter === "all" || card.getAttribute("data-status") === filter) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // Close Job functionality with localStorage update
    document.querySelectorAll(".close-job-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            const jobCard = event.target.closest(".job-card");
            const jobId = jobCard.querySelector("h3").textContent.trim(); // Using job title as an ID

            if (confirm("Are you sure you want to close this job?")) {
                closeJobUI(jobCard);
                saveJobStatus(jobId, "closed");
            }
        });
    });
});
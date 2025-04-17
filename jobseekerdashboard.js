// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAiSIvkXHbc7DMWXctMCR240lY3QTo3DPI",
    authDomain: "alumini-project-92d35.firebaseapp.com",
    projectId: "alumini-project-92d35",
    storageBucket: "alumini-project-92d35.appspot.com",
    messagingSenderId: "824256308559",
    appId: "1:824256308559:web:e3301cc6e36b381a7cd13a",
    measurementId: "G-VPN8QGJTGY"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to fetch job listings
function fetchJobListings() {
    const jobListContainer = document.querySelector(".jobs");
    jobListContainer.innerHTML = "<p>Loading jobs...</p>";

    db.collection("jobListings")
        .get()
        .then(snapshot => {
            jobListContainer.innerHTML = ""; // Clear loading text
            snapshot.forEach(doc => {
                const job = doc.data();
                const jobCard = document.createElement("div");
                jobCard.classList.add("job-card");
                jobCard.innerHTML = `
                    <h3>${job.fullName} - ${job.company}</h3>
                    <p><strong>Department:</strong> ${job.department}</p>
                    <p><strong>Email:</strong> ${job.email}</p>
                    <p><strong>Contact:</strong> ${job.contact}</p>
                    <p><strong>Distengnation:</strong> ${job.distengnation}</p>
                    <p><strong>Salary:</strong> ${job.salary}</p>
                    <a href="${job.linkedin}" target="_blank" class="apply-btn">Apply Now</a>
                `;
                jobListContainer.appendChild(jobCard);
            });

            if (snapshot.empty) {
                jobListContainer.innerHTML = "<p>No job listings available.</p>";
            }
        })
        .catch(error => {
            console.error("Error fetching jobs:", error);
            jobListContainer.innerHTML = "<p>Error loading jobs.</p>";
        });
}

// Load jobs when the page is ready
document.addEventListener("DOMContentLoaded", fetchJobListings);
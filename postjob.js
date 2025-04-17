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

// Form submit event
document.getElementById('jobForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    try {
        // Get input values
        const fullName = document.getElementById('fullName').value.trim();
        const batch = document.getElementById('batch').value.trim();
        const department = document.getElementById('department').value.trim();
        const email = document.getElementById('email').value.trim();
        const contact = document.getElementById('contact').value.trim();
        const company = document.getElementById('company').value.trim();
        const distengnation = document.getElementById('distengnation').value.trim();
        const salary = document.getElementById('salary').value.trim();
        const linkedIn = document.getElementById('linkedIn').value.trim();

        // Basic validation
        if (!fullName || !batch || !department || !email || !contact || !company || !distengnation || !salary || !linkedIn) {
            alert("All fields are required.");
            return;
        }

        // Validate email format
        if (!/\S+@\S+\.\S+/.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Validate contact number (Only digits, 10-15 length)
        if (!/^\d{10,15}$/.test(contact)) {
            alert("Please enter a valid contact number (10-15 digits).");
            return;
        }

        // Create job data object
        const jobData = {
            fullName,
            batch,
            department,
            email,
            contact,
            company,
            distengnation,
            salary,
            linkedIn,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        };

        // Save job details to Firestore
        await db.collection('jobs').add(jobData);

        // Success alert and reset form
        alert('Job posted successfully!');
        document.getElementById('jobForm').reset();
    } catch (error) {
        console.error('Error posting job:', error);
        alert('Failed to post job. ' + error.message);
    }
});
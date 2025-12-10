document.addEventListener("DOMContentLoaded", function () {
    includeHTML("footer-container", "../html/footer.html");
    includeHTML("header_menu", "../html/header.html");
});

function includeHTML(elementId, filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = data;
                
                // Update the current year after the footer is loaded
                const currentYear = new Date().getFullYear();
                const currentYearElement = document.getElementById('current-year');
                if (currentYearElement) {
                    currentYearElement.textContent = currentYear;
                }
            } else {
                console.error("❌ Element not found:", elementId);
            }
        })
        .catch(error => console.error("❌ Error loading file:", filePath, error));
}
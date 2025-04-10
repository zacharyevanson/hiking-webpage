$(document).ready(function () {
    const savedHikes = JSON.parse(sessionStorage.getItem("savedHikes")) || [];
    const comments = JSON.parse(sessionStorage.getItem("hikeComments")) || {};
    const hikesList = $("#saved-hikes-list");

    // rendering saved hikes
    function renderSavedHikes() {
        if (savedHikes.length === 0) {
            hikesList.append("<li>No hikes saved yet.</li>");
            return;
        }

        savedHikes.forEach(hike => {
            const hikeDetails = getHikeDetails(hike);
            const hikeComments = comments[hike] || [];
            hikesList.append(createHikeItem(hike, hikeDetails, hikeComments));
        });

        attachEventListeners();
    }

    // create template hike item in HTML
    function createHikeItem(hike, hikeDetails, hikeComments) {
        return `
            <li class="hike-item">
                <div class="hike-name">
                    <h2>${hike}</h2>
                    <div class="hike-popup">${hikeDetails}</div>
                </div>
                <button class="remove-btn" data-hike="${hike}">Remove</button>
                <div class="comment-section">
                    <textarea class="comment-input" placeholder="Leave a comment below..." data-hike="${hike}"></textarea>
                    <button class="comment-btn" data-hike="${hike}">Submit</button>
                    <ul class="comment-list" id="comments-${hike}">
                        ${hikeComments.map(comment => `<li>${comment}</li>`).join('')}
                    </ul>
                </div>
            </li>
        `;
    }

    // function to remove a hike
    function removeHike(hikeToRemove) {
        const updatedHikes = savedHikes.filter(hike => hike !== hikeToRemove);
        delete comments[hikeToRemove];

        sessionStorage.setItem("savedHikes", JSON.stringify(updatedHikes));
        sessionStorage.setItem("hikeComments", JSON.stringify(comments));
        location.reload();
    }

    // function to allow user to comment on each saved hike
    function addComment(hike, commentText) {
        if (!comments[hike]) {
            comments[hike] = [];
        }
        comments[hike].push(commentText);
        sessionStorage.setItem("hikeComments", JSON.stringify(comments));

        const commentList = $(`#comments-${hike}`);
        commentList.append(`<li>${commentText}</li>`);
    }

    // event listeners for removing or commmenting on each hike
    function attachEventListeners() {
        $(".remove-btn").click(function () {
            const hikeToRemove = $(this).data("hike");
            removeHike(hikeToRemove);
        });

        $(".comment-btn").click(function () {
            const hike = $(this).data("hike");
            const commentInput = $(`textarea[data-hike="${hike}"]`);
            const commentText = commentInput.val().trim();

            if (commentText) {
                addComment(hike, commentText);
                commentInput.val("");
                location.reload();
            }
        });
    }

    renderSavedHikes();
});

// hike details stored as 'data' for each hike to be retrieved when hikes are saved
function getHikeDetails(hikeName) {
    const hikeData = {
        "Devil's Peak": `
            <table class="hike-details">
                <h3>Hike Details:</h3>
                <tr><th>Trail Length</th><td><b>6km</b></td></tr>
                <tr><th>Duration</th><td><b>+- 3hrs</b></td></tr>
                <tr><th>Start Point</th><td><b>Tafelberg Road...</b></td></tr>
                <tr><th>Difficulty</th><td><b>6/10</b></td></tr>
            </table>`,
        "Kloof Corner": `
            <table class="hike-details">
                <h3>Hike Details:</h3>
                <tr><th>Trail Length</th><td><b>1.5km</b></td></tr>
                <tr><th>Duration</th><td><b>+- 40min</b></td></tr>
                <tr><th>Start Point</th><td><b>Tafelberg Road...</b></td></tr>
                <tr><th>Difficulty</th><td><b>3/10</b></td></tr>
            </table>`,
        "Lion's Head": `
            <table class="hike-details">
                <h3>Hike Details:</h3>
                <tr><th>Trail Length</th><td><b>5.5km</b></td></tr>
                <tr><th>Duration</th><td><b>+- 2.5hrs</b></td></tr>
                <tr><th>Start Point</th><td><b>Lion's Head parking lot...</b></td></tr>
                <tr><th>Difficulty</th><td><b>7/10</b></td></tr>
            </table>`,
        "Skeleton Gorge": `
            <table class="hike-details">
                <h3>Hike Details:</h3>
                <tr><th>Trail Length</th><td><b>5.3km</b></td></tr>
                <tr><th>Duration</th><td><b>+- 4.5hrs</b></td></tr>
                <tr><th>Start Point</th><td><b>Kirstenbosch Gardens</b></td></tr>
                <tr><th>Difficulty</th><td><b>8/10</b></td></tr>
            </table>`
    };

    return hikeData[hikeName] || "<p>Details not available.</p>";
}
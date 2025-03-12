$(document).ready(function() {
    let savedHikes = JSON.parse(sessionStorage.getItem("savedHikes")) || [];
    let hikesList = $("#saved-hikes-list");
    let comments = JSON.parse(sessionStorage.getItem("hikeComments")) || {};

    if (savedHikes.length === 0) {
        hikesList.append("<li>No hikes saved yet.</li>");
    } else {
        savedHikes.forEach(hike => {
            let hikeDetails = getHikeDetails(hike);
            let hikeComments = comments[hike] || [];

            hikesList.append(`
                <li class="hike-item">
                    <div class="hike-name"><h2>${hike}</h2>
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
            `);
        });
    }

    $(".remove-btn").click(function () {
        let hikeToRemove = $(this).data("hike");
        savedHikes = savedHikes.filter(hike => hike !== hikeToRemove);
        delete comments[hikeToRemove]; // Ensure comments for the hike are also removed

        sessionStorage.setItem("savedHikes", JSON.stringify(savedHikes));
        sessionStorage.setItem("hikeComments", JSON.stringify(comments));
        location.reload();
    });

    $(".comment-btn").click(function () {
        let hike = $(this).data("hike");
        let commentInput = $(`textarea[data-hike="${hike}"]`);
        let commentText = commentInput.val().trim();

        if (commentText) {
            if (!comments[hike]) {
                comments[hike] = [];
            }
            comments[hike].push(commentText);
            sessionStorage.setItem("hikeComments", JSON.stringify(comments));

            let commentList = $(`#comments-${hike}`);
            commentList.append(`<li>${commentText}</li>`);

            commentInput.val(""); // Clear input after submitting
            location.reload();
        }
    });
});

function getHikeDetails(hikeName) {
    const hikeData = {
        "Devil's Peak": `<table class="hike-details">
                        <h3>Hike Details:</h3>
                        <tr>
                            <th>Trail Length</th>
                            <td><b>6km</b></td>
                        </tr>
                        <tr>
                            <th>Duration</th>
                            <td><b>+- 3hrs</b></td>
                        </tr>
                        <tr>
                            <th>Start Point</th>
                            <td><b>Tafelberg Road. Drive past the cable station, park at the furthest parking lot and find the signage for the trail on the right of the road</b></td>
                        </tr>
                        <tr>
                            <th>Difficulty</th>
                            <td><b>6/10</b></td>
                        </tr>
                        </table>`,
        "Kloof Corner": `<table class="hike-details">
                        <h3>Hike Details:</h3>
                        <tr>
                            <th>Trail Length</th>
                            <td><b>1.5km</b></td>
                        </tr>
                        <tr>
                            <th>Duration</th>
                            <td><b>+- 40min</b></td>
                        </tr>
                        <tr>
                            <th>Start Point</th>
                            <td><b>Tafelberg Road. Drive past the cable station, park at the furthest parking lot (next to the hairpin) and find the signage for the trail on the right of the road</b></td>
                        </tr>
                        <tr>
                            <th>Difficulty</th>
                            <td><b>3/10</b></td>
                        </tr>
                        </table>`,
        "Lion's Head": `<table class="hike-details">
                        <h3>Hike Details:</h3>
                        <tr>
                            <th>Trail Length</th>
                            <td><b>5.5km</b></td>
                        </tr>
                        <tr>
                            <th>Duration</th>
                            <td><b>+- 2.5hrs</b></td>
                        </tr>
                        <tr>
                            <th>Start Point</th>
                            <td><b>Lion's Head parking lot. Park off anywhere nearby and find the signage for the trail at the base of the mountain</b></td>
                        </tr>
                        <tr>
                            <th>Difficulty</th>
                            <td><b>7/10</b></td>
                        </tr>
                        </table>`,
        "Skeleton Gorge": `<table class="hike-details">
                        <h3>Hike Details:</h3>
                        <tr>
                            <th>Trail Length</th>
                            <td><b>5.3km</b></td>
                        </tr>
                        <tr>
                            <th>Duration</th>
                            <td><b>+- 4.5hrs</b></td>
                        </tr>
                        <tr>
                            <th>Start Point</th>
                            <td><b>Kirstenbosch Gardens</b></td>
                        </tr>
                        <tr>
                            <th>Difficulty</th>
                            <td><b>8/10</b></td>
                        </tr>
                        </table>`
    };

    return hikeData[hikeName] || "<p>Details not available.</p>";
}

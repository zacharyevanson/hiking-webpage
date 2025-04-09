$(document).ready(function () {
    // allow user to 'like' hike
    let likeBtn = document.querySelector(".like-btn")
    let hikeName = likeBtn.getAttribute("data-hike")
    // retrieving number of likes for a hike from session storage
    let likes = JSON.parse(sessionStorage.getItem("hikeLikes")) || {};

    if (!likes[hikeName]) {
        // initializing likes for a hike without any likes
        likes[hikeName] = 0;
        // setting session storage to carry over likes
        sessionStorage.setItem("hikeLikes", JSON.stringify(likes));
    }

    $("#likes-" + hikeName).text(likes[hikeName]);

    $(".like-btn").click(function () {
        // on click, increment number of likes by 1
        likes[hikeName] += 1;
        sessionStorage.setItem("hikeLikes", JSON.stringify(likes));

        $("#likes-" + hikeName).text(likes[hikeName]);
    });
});
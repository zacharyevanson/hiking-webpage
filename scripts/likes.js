$(document).ready(function () {
    let likeBtn = document.querySelector(".like-btn")
    let hikeName = likeBtn.getAttribute("data-hike")
    let likes = JSON.parse(sessionStorage.getItem("hikeLikes")) || {};

    if (!likes[hikeName]) {
        likes[hikeName] = 0;
        sessionStorage.setItem("hikeLikes", JSON.stringify(likes));
    }

    $("#likes-" + hikeName).text(likes[hikeName]);

    $(".like-btn").click(function () {
        likes[hikeName] += 1;
        sessionStorage.setItem("hikeLikes", JSON.stringify(likes));

        $("#likes-" + hikeName).text(likes[hikeName]);
    });
});
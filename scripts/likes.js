$(document).ready(function () {
    // function to initialize hike likes
    function initializeLikes(hikeName) {
        let likes = JSON.parse(sessionStorage.getItem("hikeLikes")) || {};
        if (!likes[hikeName]) {
            likes[hikeName] = 0;
            sessionStorage.setItem(JSON.stringify("hikeLikes", likes));
        }
        return likes;
    }
    
    // function to update likes
    function updateLikesDisplay(hikeName, likes) {
        $("#likes-" + hikeName).text(likes[hikeName]);
    }

    // function to handle and update likes
    function handleLike(hikeName) {
        let likes = JSON.parse(sessionStorage.getItem("hikeLikes"));
        likes[hikeName] += 1;
        sessionStorage.setItem("hikeLikes", JSON.stringify(likes));
        updateLikesDisplay(hikeName, likes)
    }

    // main logic
    $(".like-btn").each(function () {
        const hikeName = $(this).data("hike");
        let likes = initializeLikes(hikeName);
        updateLikesDisplay(hikeName, likes);

        $(this).click(function () {
            handleLike(hikeName);
        });
    });
});
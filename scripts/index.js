$(document).ready(function () {
    // save feature implemented: 'data' is stored under each hikes name, and can be retrieved in the 'save for later' page
    $(".save-btn").click(function () {
        let hikeName = $(this).data("hike");
        // retrieving saved hikes from session storage
        let savedHikes = JSON.parse(sessionStorage.getItem("savedHikes")) || [];

        if (!savedHikes.includes(hikeName)) {
            // in case of hike already being in saved hikes, alert user that they have saved already
            savedHikes.push(hikeName);
            sessionStorage.setItem("savedHikes", JSON.stringify(savedHikes));
            alert(hikeName + " added to your Save for Later! You now have " + savedHikes.length + " hike(s) in your Save for Later." )
        } else {
            alert("This hike is already in your Save for Later!")
        }
    });
});
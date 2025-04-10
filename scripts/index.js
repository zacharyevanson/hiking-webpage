$(document).ready(function () {
    // creating function to handle saved hikes
    function saveHike(hikeName) {
        let savedHikes = JSON.parse(sessionStorage.getItem("savedHikes")) || [];

        if (savedHikes.includes(hikeName)) {
            alert("This hike is already in your Save for Later!");
            return;
        }

        savedHikes.push(hikeName);
        sessionStorage.setItem("savedHikes", JSON.stringify(savedHikes));
        alert(`${hikeName} added to your Save for Later! You now have ${savedHikes.length} hike(s) in your Save for Later.`)
    }

    // save feature implemented: 'data' is stored under each hikes name, and can be retrieved in the 'save for later' page
    $(".save-btn").click(function () {
        const hikeName = $(this).data("hike");
        saveHike(hikeName);
    });
});
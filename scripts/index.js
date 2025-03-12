$(document).ready(function () {
    $(".save-btn").click(function () {
        let hikeName = $(this).data("hike");
        let savedHikes = JSON.parse(sessionStorage.getItem("savedHikes")) || [];

        if (!savedHikes.includes(hikeName)) {
            savedHikes.push(hikeName);
            sessionStorage.setItem("savedHikes", JSON.stringify(savedHikes));
            alert(hikeName + " added to your Save for Later! You now have " + savedHikes.length + " hike(s) in your Save for Later." )
        } else {
            alert("This hike is already in your Save for Later!")
        }
    });
});
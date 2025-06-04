function loadReviews() {
    console.log("logReviews called");

    fetch("reviews.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not OK");
            }
            return response.json();
        })
        .then((reviews) => {
            reviews.forEach((review) => {
                createReviewElement(review);
            });
        })
        .catch((error) => {
            console.log("An error when getting the JSON occured... " + error);
        });
}

function handleReviewSubmit() {
    console.log("handleReviewSubmir called");
}

function createReviewElement(review) {
    console.log(review);
    let newReview = document.createElement();
}

function toggleLike() {
    console.log("Like button clicked");
}

function repostReview() {
    console.log("Repost button clicked");
}

document.addEventListener("DOMContentLoaded", () => {
    loadReviews();
    let form = document.getElementById("review-form");
    form.addEventListener("submit", handleReviewSubmit);
});

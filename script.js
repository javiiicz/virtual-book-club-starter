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
                let element = createReviewElement(review);
                document.getElementById('reviews-list').appendChild(element)
            });
        })
        .catch((error) => {
            console.log("An error when getting the JSON occured... " + error);
        });
}

function handleReviewSubmit() {
    console.log("handleReviewSubmit called");

    const userReview = {
        id: Date.now(),
        title: document.getElementById('book-title').value,
        reviewText: document.getElementById('review-text').value,
        rating: document.getElementById('rating').value,
        likes: 0,
        reposts: 0
    }

    let newReview = createReviewElement(userReview);
    revList = document.getElementById('reviews-list')
    revList.insertBefore(newReview, revList.firstChild)
}

function createReviewElement(review) {
    console.log(review);
    
    let newReview = document.createElement('div');
    newReview.classList.add('review-item');
    newReview.innerHTML =
    `<h3>${review.title}</h3>
    <p>${review.reviewText}</p>
    <p>Rating: ${review.rating}</p>
    <button id='like-${review.id}' data-isliked='false' onclick='toggleLike(this)'>Like (${review.likes})</button>
    <button id='repost-${review.id}' onclick='repostReview(this)'>Repost (${review.reposts})</button>`

    return newReview
}

function toggleLike(btn) {
    console.log("Like button clicked");

    let likePattern = /\d+/;
    let likeMatch = btn.textContent.match(likePattern);

    let count = parseInt(likeMatch[0])
    console.log(count)

    if (btn.dataset.isliked === 'true') {
        console.log('remove like')
        btn.dataset.isliked = false
        count -= 1
    }
    else {
        console.log('add like')
        btn.dataset.isliked = true
        count += 1
    }
    
    btn.textContent = `Like (${count})`
}

function repostReview(btn) {
    console.log("Repost button clicked");

    let repostPattern = /\d+/;
    let repostMatch = btn.textContent.match(repostPattern)

    let count = parseInt(repostMatch[0])
    count++

    btn.textContent = `Repost (${count})`
}

document.addEventListener("DOMContentLoaded", function() {
    loadReviews();
    let form = document.getElementById("review-form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        handleReviewSubmit()
    });
});

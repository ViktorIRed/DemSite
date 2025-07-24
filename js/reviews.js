const reviews_id = document.getElementById('reviews-id');

async function getReviews() {
    const response = await fetch(API_URL('pages/reviews'));
    if (!response.ok) return;
    const data = await response.json();
    reviews_id.innerHTML = '';
    for (const key of data) {
        reviews_id.insertAdjacentHTML('beforeend', `<div class="review-card">
                <p class="review-text">${key.text}</p>
                <p class="review-author">— ${key.name}</p>
            </div>`)
    }
}

document.getElementById('reviews-send').addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        name: document.getElementById('review-name').value,
        email: document.getElementById('review-email').value,
        text: document.getElementById('review-message').value
    };
    fetch(API_URL('pages/reviews'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
});

getReviews();
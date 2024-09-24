// app.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const commentForm = document.getElementById('commentForm');
    const commentsList = document.getElementById('commentsList');
    const message = document.getElementById('message');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const result = await response.json();
            if (result.success) {
                window.location.href = '/comments.html';
            } else {
                message.textContent = 'Login failed. Please try again.';
            }
        });
    }

    if (commentForm) {
        commentForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const comment = document.getElementById('comment').value;

            const response = await fetch('/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ comment }),
            });

            if (response.ok) {
                const newComment = await response.json();
                const listItem = document.createElement('li');
                listItem.textContent = newComment.text;
                commentsList.appendChild(listItem);
                commentForm.reset();
            }
        });

        // Fetch existing comments
        (async () => {
            const response = await fetch('/api/comments');
            const comments = await response.json();
            comments.forEach(comment => {
                const listItem = document.createElement('li');
                listItem.textContent = comment.text;
                commentsList.appendChild(listItem);
            });
        })();
    }
});
function github() {
    var getinp = document.getElementById('inp');
    var username = getinp.value.trim();
    if (username === '') {
        alert('Please enter a valid GitHub username.');
        return;
    }
    fetch(`https://api.github.com/users/${username}`)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('User not found');
            }
            return response.json();
        })
        .then(function (data) {
            var getdiv = document.getElementById('show');
            getdiv.innerHTML = `
            <div class="card-horizontal mb-4">
                <img src="${data.avatar_url}" alt="User Avatar">
                <div class="card-body">
                    <h5 class="card-title mb-2">${data.name || 'No Name'}</h5>
                    <p class="card-text"><strong>Bio:</strong> ${data.bio ? data.bio : 'No bio available'}</p>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><strong>Followers:</strong> ${data.followers}</li>
                        <li class="list-group-item"><strong>Following:</strong> ${data.following}</li>
                        <li class="list-group-item"><strong>Repos:</strong> ${data.public_repos}</li>
                        <li class="list-group-item"><strong>Company:</strong> ${data.company ? data.company : 'Not specified'}</li>
                        <li class="list-group-item"><strong>Location:</strong> ${data.location ? data.location : 'Not specified'}</li>
                        <li class="list-group-item"><strong>Joined:</strong> ${new Date(data.created_at).toLocaleDateString()}</li>
                    </ul>
                    <div class="mt-3">
                        <a target="_blank" class="btn btn-outline-primary" href="${data.html_url}">View Profile</a>
                    </div>
                </div>
            </div>`;
            getinp.value = '';
        })
        .catch(function (error) {
            alert(error.message);
        });
}
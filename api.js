const apiKey = 'ecfccc58d345415bb9818c6612a272aa'; // Replace with your API key
const newsContainer = document.getElementById('news-container');

// Fetch top news by keyword (India)
function fetchNews(keyword = 'India') {
    const url = `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${apiKey}`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                // Handle 404 and 429 errors
                if (response.status === 404) {
                    throw new Error('Resource not found (404).');
                } else if (response.status === 429) {
                    throw new Error('Too many requests (429). Please try again later.');
                } else {
                    throw new Error('Error fetching news. Status code: ' + response.status);
                }
            }
            return response.json();
        })
        .then(data => {
            if (data && data.articles && Array.isArray(data.articles)) {
                displayNews(data.articles);
            } else {
                throw new Error('No articles found.');
            }
        })
        .catch(error => {
            console.error('Error fetching news:', error);
            newsContainer.innerHTML = `<p class="error">${error.message}</p>`;
        });
}

// Display news articles
function displayNews(articles) {
    newsContainer.innerHTML = ''; // Clear previous content

    if (articles.length === 0) {
        newsContainer.innerHTML = '<p>No articles available.</p>';
        return;
    }

    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.className = 'article';

        articleElement.innerHTML = `
            <img src="${article.urlToImage || '/default-image.jpg'}" alt="News Image">
            <h3>${article.title}</h3>
            <p>${article.description || 'No description available.'}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;

        newsContainer.appendChild(articleElement);
    });
}

// Search news by keyword
function searchNews(event) {
    if (event.key === 'Enter') {
        const query = document.getElementById('search-input').value.trim();

        if (!query) {
            alert('Please enter a search term.');
            return;
        }

        fetchNews(query); // Reuse fetchNews function for searching
    }
}

// Load default news on page load (news about India)
window.onload = function() {
    fetchNews(); // Default keyword is 'India'
};


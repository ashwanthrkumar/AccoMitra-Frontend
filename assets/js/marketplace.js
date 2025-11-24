// =========================
// MARKETPLACE FUNCTIONALITY
// =========================

document.addEventListener('DOMContentLoaded', function () {
    // Initialize marketplace functionality
    initializeMarketplace();
});

function initializeMarketplace() {
    // Get all elements
    const searchInput = document.getElementById('searchInput');
    const locationFilter = document.getElementById('locationFilter');
    const expertiseFilter = document.getElementById('expertiseFilter');
    const experienceFilter = document.getElementById('experienceFilter');
    const ratingFilter = document.getElementById('ratingFilter');
    const priceFilter = document.getElementById('priceFilter');
    const resultsCount = document.getElementById('resultsCount');
    const accountantsGrid = document.getElementById('accountantsGrid');
    const loadMoreBtn = document.querySelector('.load-more-btn');

    // Add event listeners
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }

    if (locationFilter) {
        locationFilter.addEventListener('change', handleFilterChange);
    }

    if (expertiseFilter) {
        expertiseFilter.addEventListener('change', handleFilterChange);
    }

    if (experienceFilter) {
        experienceFilter.addEventListener('change', handleFilterChange);
    }

    if (ratingFilter) {
        ratingFilter.addEventListener('change', handleFilterChange);
    }

    if (priceFilter) {
        priceFilter.addEventListener('change', handleFilterChange);
    }

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', handleLoadMore);
    }

    // Initialize with all cards visible
    updateResultsCount();
}

// Search functionality
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const accountantCards = document.querySelectorAll('.accountant-card');

    accountantCards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        const designation = card.querySelector('.designation').textContent.toLowerCase();
        const location = card.querySelector('.location span').textContent.toLowerCase();
        const specializations = Array.from(card.querySelectorAll('.specialization-tag'))
            .map(tag => tag.textContent.toLowerCase())
            .join(' ');

        const searchableText = `${name} ${designation} ${location} ${specializations}`;

        if (searchableText.includes(searchTerm)) {
            card.classList.remove('hidden');
            card.classList.add('visible');
        } else {
            card.classList.add('hidden');
            card.classList.remove('visible');
        }
    });

    updateResultsCount();
}

// Filter functionality
function handleFilterChange() {
    const locationFilter = document.getElementById('locationFilter').value;
    const expertiseFilter = document.getElementById('expertiseFilter').value;
    const experienceFilter = document.getElementById('experienceFilter').value;
    const ratingFilter = document.getElementById('ratingFilter').value;
    const priceFilter = document.getElementById('priceFilter').value;

    const accountantCards = document.querySelectorAll('.accountant-card');

    accountantCards.forEach(card => {
        let isVisible = true;

        // Location filter
        if (locationFilter && card.dataset.location !== locationFilter) {
            isVisible = false;
        }

        // Expertise filter
        if (expertiseFilter && !card.dataset.expertise.includes(expertiseFilter)) {
            isVisible = false;
        }

        // Experience filter
        if (experienceFilter && card.dataset.experience !== experienceFilter) {
            isVisible = false;
        }

        // Rating filter
        if (ratingFilter) {
            const cardRating = parseFloat(card.dataset.rating);
            const filterRating = parseFloat(ratingFilter);
            if (cardRating < filterRating) {
                isVisible = false;
            }
        }

        // Price filter
        if (priceFilter && card.dataset.price !== priceFilter) {
            isVisible = false;
        }

        // Show/hide card
        if (isVisible) {
            card.classList.remove('hidden');
            card.classList.add('visible');
        } else {
            card.classList.add('hidden');
            card.classList.remove('visible');
        }
    });

    updateResultsCount();
}

// Clear all filters
function clearFilters() {
    document.getElementById('locationFilter').value = '';
    document.getElementById('expertiseFilter').value = '';
    document.getElementById('experienceFilter').value = '';
    document.getElementById('ratingFilter').value = '';
    document.getElementById('priceFilter').value = '';
    document.getElementById('searchInput').value = '';

    // Show all cards
    const accountantCards = document.querySelectorAll('.accountant-card');
    accountantCards.forEach(card => {
        card.classList.remove('hidden');
        card.classList.add('visible');
    });

    updateResultsCount();
}

// Update results count
function updateResultsCount() {
    const visibleCards = document.querySelectorAll('.accountant-card.visible');
    const resultsCount = document.getElementById('resultsCount');

    if (resultsCount) {
        resultsCount.textContent = visibleCards.length;
    }
}

// Load more functionality
function handleLoadMore() {
    const loadMoreBtn = document.querySelector('.load-more-btn');

    // Add loading state
    loadMoreBtn.innerHTML = '<i class="lni lni-spinner-arrow"></i> Loading...';
    loadMoreBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Add more accountant cards (in a real app, this would be fetched from API)
        addMoreAccountants();

        // Reset button
        loadMoreBtn.innerHTML = 'Load More Accountants';
        loadMoreBtn.disabled = false;
    }, 1500);
}

// Add more accountants (simulated)
function addMoreAccountants() {
    const accountantsGrid = document.getElementById('accountantsGrid');
    const moreAccountants = [
        {
            name: 'Arjun Mehta',
            designation: 'Chartered Accountant (CA)',
            location: 'Kolkata, West Bengal',
            experience: '6 years experience',
            rating: 4.5,
            reviews: 98,
            specializations: ['GST Filing', 'Tax Returns', 'Compliance'],
            price: '₹7,500',
            image: '../assets/images/accountants/accountant-7.jpg',
            dataAttributes: {
                location: 'kolkata',
                expertise: 'gst,tax',
                experience: '6-10',
                rating: '4',
                price: '5000-15000'
            }
        },
        {
            name: 'Deepika Agarwal',
            designation: 'Senior Chartered Accountant',
            location: 'Ahmedabad, Gujarat',
            experience: '11 years experience',
            rating: 4.8,
            reviews: 145,
            specializations: ['Business Advisory', 'Audit', 'Tax Planning'],
            price: '₹22,000',
            image: '../assets/images/accountants/accountant-8.jpg',
            dataAttributes: {
                location: 'ahmedabad',
                expertise: 'advisory,audit',
                experience: '10+',
                rating: '4',
                price: '15000-30000'
            }
        },
        {
            name: 'Rohit Gupta',
            designation: 'Chartered Accountant (CA)',
            location: 'Jaipur, Rajasthan',
            experience: '3 years experience',
            rating: 4.3,
            reviews: 67,
            specializations: ['Bookkeeping', 'Payroll', 'GST Filing'],
            price: '₹4,800',
            image: '../assets/images/accountants/accountant-9.jpg',
            dataAttributes: {
                location: 'jaipur',
                expertise: 'bookkeeping,payroll',
                experience: '3-5',
                rating: '4',
                price: '0-5000'
            }
        }
    ];

    moreAccountants.forEach(accountant => {
        const cardHtml = createAccountantCard(accountant);
        accountantsGrid.insertAdjacentHTML('beforeend', cardHtml);
    });

    updateResultsCount();
}

// Create accountant card HTML
function createAccountantCard(accountant) {
    const stars = generateStars(accountant.rating);
    const specializations = accountant.specializations.map(spec =>
        `<span class="specialization-tag">${spec}</span>`
    ).join('');

    return `
        <div class="col-lg-4 col-md-6 col-12 accountant-card visible" 
             data-location="${accountant.dataAttributes.location}" 
             data-expertise="${accountant.dataAttributes.expertise}" 
             data-experience="${accountant.dataAttributes.experience}" 
             data-rating="${accountant.dataAttributes.rating}" 
             data-price="${accountant.dataAttributes.price}">
            <div class="accountant-profile-card">
                <div class="profile-header">
                    <div class="profile-image">
                        <img src="${accountant.image}" alt="${accountant.name}" />
                        <div class="verified-badge">
                            <i class="lni lni-checkmark-circle"></i>
                        </div>
                    </div>
                    <div class="profile-info">
                        <h3>${accountant.name}</h3>
                        <p class="designation">${accountant.designation}</p>
                        <div class="rating">
                            <div class="stars">${stars}</div>
                            <span class="rating-text">${accountant.rating} (${accountant.reviews} reviews)</span>
                        </div>
                    </div>
                </div>
                
                <div class="profile-details">
                    <div class="location">
                        <i class="lni lni-map-marker"></i>
                        <span>${accountant.location}</span>
                    </div>
                    <div class="experience">
                        <i class="lni lni-briefcase"></i>
                        <span>${accountant.experience}</span>
                    </div>
                    <div class="specializations">
                        ${specializations}
                    </div>
                </div>
                
                <div class="profile-footer">
                    <div class="pricing">
                        <span class="price-label">Starting from</span>
                        <span class="price">${accountant.price}</span>
                    </div>
                    <div class="action-buttons">
                        <a href="accountant/accountant-details.html?email=${encodeURIComponent(accountant.name.toLowerCase().replace(/\s+/g, '') + '@example.com')}" class="btn btn-outline-primary btn-sm">View Profile</a>
                        <button class="btn btn-primary btn-sm">Contact</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Generate star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHtml = '';

    // Full stars
    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<i class="lni lni-star-filled"></i>';
    }

    // Half star
    if (hasHalfStar) {
        starsHtml += '<i class="lni lni-star-half"></i>';
    }

    // Empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<i class="lni lni-star"></i>';
    }

    return starsHtml;
}

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Contact button functionality
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-primary') && e.target.textContent === 'Contact') {
        e.preventDefault();
        handleContactClick(e.target);
    }
});

function handleContactClick(button) {
    // Get accountant name from the card
    const card = button.closest('.accountant-profile-card');
    const name = card.querySelector('h3').textContent;

    // Show contact modal or redirect to contact page
    alert(`Contacting ${name}... This would open a contact form or redirect to their profile.`);

    // In a real application, you might:
    // 1. Open a contact modal
    // 2. Redirect to a contact page with pre-filled data
    // 3. Send a message through the platform
}



// Smooth scroll for anchor links
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('page-scroll')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        if (targetId.startsWith('#')) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    }
});

// Initialize tooltips and other Bootstrap components
document.addEventListener('DOMContentLoaded', function () {
    // Initialize Bootstrap tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

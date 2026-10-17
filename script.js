 
 // sign in
 document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("loginBtn");
    const loginModal = document.getElementById("loginModal");
    const closeLogin = document.getElementById("closeLogin");
    const signInForm = document.getElementById("signInForm");
    const signInSuccess = document.getElementById("signInSuccess");

    // Open Modal
    if (loginBtn) {
        loginBtn.addEventListener("click", function (event) {
            event.preventDefault();
            loginModal.style.display = "flex";
            
            // Reset form view when opened
            if (signInForm) signInForm.style.display = "block";
            if (signInSuccess) signInSuccess.style.display = "none";
        });
    }

    // Close Modal
    if (closeLogin) {
        closeLogin.addEventListener("click", function () {
            loginModal.style.display = "none";
        });
    }

    // Close when clicking outside modal box
    window.addEventListener("click", function (event) {
        if (event.target === loginModal) {
            loginModal.style.display = "none";
        }
    });

    // Handle Sign In Submit
    if (signInForm) {
        signInForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Stop page refresh

            // Hide the form and show thank you message
            signInForm.style.display = "none";
            signInSuccess.style.display = "block";

            // Automatically close modal after 2.5 seconds
            setTimeout(function () {
                loginModal.style.display = "none";
                signInForm.reset(); // Clear input fields
            }, 2500);
        });
    }
});



//search bar
const searchBtn = document.getElementById("searchBtn")
const searchContainer = document.querySelector(".search-container");

searchBtn.addEventListener("click", () => { 
    searchContainer.classList.toggle("active");

});


//add to cart
let cart = [];
// Get elements
const cartCount = document.getElementById("cart-count");
const addCartButtons = document.querySelectorAll(".add-cart");

// Add item to cart
addCartButtons.forEach(button => {
    button.addEventListener("click", function (event) {
        event.preventDefault();
        const name = this.dataset.name;
        const price = Number(this.dataset.price);
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }
        updateCartCount();
        console.log("Cart:", cart);
        alert(name + " added to cart!");
    });
});
function updateCartCount() {
    const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );
    cartCount.textContent = totalQuantity;
}


  // Search Bar Functionality
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

if (searchInput && searchResults) {
    searchInput.addEventListener("input", function () {
        const query = this.value.toLowerCase().trim();
        searchResults.innerHTML = ""; // Clear old results

        if (query === "") {
            searchResults.style.display = "none";
            return;
        }

        // Gather all menu cards and their titles/prices
        const menuCards = document.querySelectorAll(".section-menu_card");
        let matches = [];

        menuCards.forEach(card => {
            const titleElement = card.querySelector(".section-menu_title");
            const priceElement = card.querySelector(".section-menu__card-price");
            
            if (titleElement) {
                const title = titleElement.textContent.trim();
                const price = priceElement ? priceElement.textContent.trim() : "";

                if (title.toLowerCase().includes(query)) {
                    matches.push({ title, price });
                }
            }
        });

        // Display results or "No results found"
        if (matches.length > 0) {
            searchResults.style.display = "block";
            matches.forEach(match => {
                const div = document.createElement("div");
                div.textContent = `${match.title} - ${match.price}`;
                div.addEventListener("click", () => {
                    // Scroll to menu section when clicked
                    document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
                    searchInput.value = "";
                    searchResults.style.display = "none";
                });
                searchResults.appendChild(div);
            });
        } else {
            searchResults.style.display = "block";
            const div = document.createElement("div");
            div.textContent = "No menu items found";
            div.style.color = "#888";
            searchResults.appendChild(div);
        }
    });

    // Hide search results when clicking outside
    document.addEventListener("click", function (event) {
        if (!searchContainer.contains(event.target)) {
            searchResults.style.display = "none";
        }
    });
}
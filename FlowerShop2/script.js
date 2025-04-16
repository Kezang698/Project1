//to show drop down of user icon
function toggleUserMenu() {
    const menu = document.getElementById('userMenu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  }

  // Optional: Close dropdown when clicking outside
  window.addEventListener('click', function (e) {
    const userDropdown = document.querySelector('.user-dropdown');
    if (!userDropdown.contains(e.target)) {
      document.getElementById('userMenu').style.display = 'none';
    }
  });


//wish-list items
document.addEventListener("DOMContentLoaded", function () {
    const wishlistButtons = document.querySelectorAll(".add-to-wishlist");

    wishlistButtons.forEach(btn => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();

        const flower = {
          id: this.dataset.id,
          name: this.dataset.name,
          img: this.dataset.img
        };

        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

        if (!wishlist.find(item => item.id === flower.id)) {
          wishlist.push(flower);
          localStorage.setItem("wishlist", JSON.stringify(wishlist));
          alert(`💖 ${flower.name} added to your wishlist!`);
        } else {
          alert(`${flower.name} is already in your wishlist!`);
        }
      });
    });
  });

  //search for the flowers available and take the user to that flower
  document.getElementById("flowerSearchForm").addEventListener("submit", function () {
    const input = document.getElementById("flowerSearchInput").value.trim().toLowerCase();
    const allProducts = document.querySelectorAll(".Products .box");
    let found = false;

    allProducts.forEach(product => {
      const productName = product.querySelector("h3").textContent.trim().toLowerCase();

      if (productName === input) {
        product.scrollIntoView({ behavior: "smooth", block: "center" });
        product.style.boxShadow = "0 0 10px 5px #e84393";

        setTimeout(() => {
          product.style.boxShadow = "none";
        }, 2000);

        found = true;
      }
    });

    if (!found) {
      alert("Sorry, we don't sell that flower 💐");
    }
  });


//getting review responses
// Grab all star icons and the hidden rating input
const stars = document.querySelectorAll('#starRating i');
const ratingInput = document.getElementById('ratingInput');

// Attach click event to each star
stars.forEach((star, index) => {
  star.addEventListener('click', () => {
    const selectedRating = index + 1;
    ratingInput.value = selectedRating;

    // Update star appearance
    updateStars(selectedRating);
  });
});

// Function to visually update stars based on selection
function updateStars(rating) {
  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.add('active');
    } else {
      star.classList.remove('active');
    }
  });
}

// Handle form submission
const reviewForm = document.querySelector('.review-form');

reviewForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = reviewForm.querySelector('input[type="text"]').value.trim();
  const email = reviewForm.querySelector('input[type="email"]').value.trim();
  const message = reviewForm.querySelector('textarea').value.trim();
  const rating = ratingInput.value;

  if (!name || !email || !message || !rating) {
    alert("Please fill out all fields and select a rating.");
    return;
  }

  // Simulate form handling (you can connect backend later)
  alert(`🌸 Thank you ${name}! Your ${rating}-star review has been submitted.`);

  // Reset form
  reviewForm.reset();
  updateStars(0);
});
const modal = document.getElementById("myModal");
const closeModal = document.getElementsByClassName("close")[0];

// Example trigger function (you can attach this to your buttons)
function openModal() {
  modal.style.display = "block";
}

// Close modal when 'x' is clicked
closeModal.onclick = function () {
  modal.style.display = "none";
};

// Close modal when clicking outside of it
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const categorySelect = document.getElementById("category");

  const inputGroups = {
    5: ["plies", "concave", "width"], // Example: Category ID 1 requires plies, concave, and width inputs
    6: ["base", "hanger"], // Example: Category ID 2 requires base and hanger inputs
    7: ["wheel-colors"], // Example: Category ID 3 requires wheel_colors input
    // Add more categories as needed
  };
  categorySelect.addEventListener("change", (event) => {
    const selectedCategory = event.target.value;

    // Hide all conditional inputs first
    document.querySelectorAll(".conditional-input").forEach((inputGroup) => {
      inputGroup.style.display = "none";
    });

    // Show the relevant inputs based on the selected category
    if (inputGroups[selectedCategory]) {
      inputGroups[selectedCategory].forEach((inputId) => {
        const inputGroup = document.getElementById(`${inputId}-group`);
        if (inputGroup) {
          inputGroup.style.display = "block";
        }
      });
    }
  });
});

function deleteItem(itemId) {
  fetch(`/dashboard/delete/${itemId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        // Remove the item from the DOM or refresh the page
        window.location.reload();
      } else {
        console.error("Failed to delete the item");
      }
    })
    .catch((error) => console.error("Error:", error));
}

function deleteCategory(event, categoryId) {
  event.preventDefault();
  fetch(`/dashboard/delete/category/${categoryId}`, {
    method: "DELETE",
  })
    .then((response) => {
      // Remove the item from the DOM or refresh the page
      window.location.reload();
    })
    .catch((error) => console.error("Error:", error));
}

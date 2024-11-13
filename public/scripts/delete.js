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

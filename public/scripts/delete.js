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

// /dashboard/edit/:itemId
// function editItem(itemId) {
//   // open edit form modal
//   const modal = document.querySelector("#editItemModal");

//   fetch(`/dashboard/edit/${itemId}`, {
//     method: "PATCH",
//   })
//     .then((response) => {
//       if (response.ok) {
//         // Remove the item from the DOM or refresh the page
//         window.location.reload();
//       } else {
//         console.error("Failed to delete the item");
//       }
//     })
//     .catch((error) => console.error("Error:", error));
// }

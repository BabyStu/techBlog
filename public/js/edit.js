// JS for edit.handlebars
document.addEventListener('DOMContentLoaded', () => {
  // Selects the edit form
  const editPost = document.querySelector('#editPostForm');
  console.log(editPost)
  // Event listener for when the edit form is submitted
  editPost.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const postId = document.location.href.split('/').pop();
    console.log(postId)

    // Selects input fields
    const postTitle = document.querySelector('#titleInput');

    const postDescription = document.querySelector('#descriptionInput');
    
    // Gets the values from the input fields
    const newTitle = postTitle.value.trim();
    const newDescription = postDescription.value.trim();

    // Updates the item object
    const updatedPost = {
      title: newTitle,
      description: newDescription,
    };
    
    // Sends a PUT request to update the selected item
    try {
      const response = await fetch(`/api/posts/edit-post/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPost),
      });

      
      if (response.ok) {
        document.location.replace('/homepage');
      } else {
        alert('Failed to edit post');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while editing the post');
    }
  });
});

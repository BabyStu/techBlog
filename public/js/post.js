const postFileHandler = async (event) => {
    event.preventDefault();

    const postTitleInput = document.querySelector('#postTitle'); 
    const postDescriptionInput = document.querySelector('#postDescription'); 

    const postTitle = postTitleInput.value.trim();
    const description = postDescriptionInput.value.trim();

    console.log(postTitle, description, "title and description");
    // Creates an object with the values from the input fields
    const formData = {};
  
    formData.title= postTitle;
    formData.description= description;
    formData.date_created = new Date();
    // Sends a POST request to create a new item

    console.log(formData, "form data");
    try {
        console.log(formData, "form data inside of try");
      const response = await fetch('/api/posts/', { 
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response, "response");
      if (response.ok) {
        document.location.replace('/homepage'); 
      } else {
        alert('Failed to create item');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while creating the item');
    }
  };
  
  const createPostForm = document.querySelector('#postForm');
  
  createPostForm.addEventListener('submit', postFileHandler);
  
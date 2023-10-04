const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    console.log(id);
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/homepage');
    } else {
      alert('Failed to delete post');
    }
  }
};

const editButtonHandler = (event) => {
  if (event.target.classList.contains('edit-button')) {
    const id = event.target.getAttribute('data-id');
    document.location.href = `/edit/${id}`;
  }
};

document.getElementById("post-button").addEventListener("click", function() {
  window.location.href = "/post";
});

document.querySelectorAll('.btn-group').forEach((btnGroup) => {
  btnGroup.addEventListener('click', (event) => {
    editButtonHandler(event);
    delButtonHandler(event);
  });
});

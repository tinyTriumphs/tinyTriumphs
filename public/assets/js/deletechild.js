//Event handler for deleting a child
const childCard = $('.child-card')

const deleteChild = async (event) => {
    event.preventDefault();

    const childID = document.querySelector('#child-id').value;

    console.log(childID);

    if (childID) {
        const response = await fetch(`/api/children/`, {
          method: 'DELETE',
          body: JSON.stringify({ id: childID }),
          headers: {
            'Content-Type': 'application/json',
          },
          });
  
      if (response.ok) {
        alert("Child deleted!")
        document.location.replace('/api/children/');
        } else {
          alert('Failed to delete child');
      }
    }
}


childCard.on("click", '.delete-button', deleteChild)
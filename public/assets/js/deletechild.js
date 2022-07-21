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




const devModal = $('.devmodal');
const medModal = $('.medmodal');

//Event handler for DEV milestones
const devMilestoneUpdate = async (event) => {
    event.preventDefault();

    const devDate = document.querySelector('#dev-milestone-date').value.trim();
    const devID = document.querySelector('#dev-milestone-id').value;

    if (devDate && devID) {
        const response = await fetch(`/api/todos/dev`, {
          method: 'PUT',
          body: JSON.stringify({ devMilestone_dateComplete: devDate, id: devID }),
          headers: {
            'Content-Type': 'application/json',
          },
          });
  
      if (response.ok) {
        alert("TADA! Milestone updated!")
        document.location.reload();
        } else {
          alert('Failed to update devMmilestone');
      }
    }
  };

// //Event handler for MED milestones
// const medMilestoneUpdate = async (event) => {
//     event.preventDefault();

//     const medDate = document.querySelector('#med-milestone-date').value.trim();
//     const medID = document.querySelector('#med-milestone-id').value;

//     if (medDate && medID) {
//         const response = await fetch(`/api/todos/med`, {
//           method: 'PUT',
//           body: JSON.stringify({ medMilestone_dateComplete: medDate, id: medID }),
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           });
  
//       if (response.ok) {
//         alert("TADA! Milestone updated!")
//         document.location.reload();
//         } else {
//           alert('Failed to update medMmilestone');
//       }
//     }
//   };

// devModal.on("click", ".button", devMilestoneUpdate);
// medModal.on("click", ".button", medMilestoneUpdate);



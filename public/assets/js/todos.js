const devModal = $('.devmodal');
const medModal = $('.medmodal');

//Event handler for DEV milestones
const devMilestoneUpdate = async (event) => {
    event.preventDefault();

    event.preventDefault();
    const devDate = document.querySelector('#dev-milestone-date').value.trim();
    const devID = document.querySelector('#dev-milestone-id').value;

    
    var submitButtonClicked = $(event.target);
    var currentInput = submitButtonClicked.parent()[0];
    // const selectedFile = document.getElementById('input').files[0].name;
    // console.log (selectedFile);
    console.log(submitButtonClicked);
    console.log('it was clicked');
    console.log(currentInput);
    console.log(devDate);
    // console.log(devID);

    if (devDate && devID) {
        const response = await fetch(`/api/todos/dev`, {
          method: 'PUT',
          body: JSON.stringify({ devMilestone_dateComplete: devDate, id: devID }),
          headers: {
            'Content-Type': 'application/json',
          },
          });
          console.log(response, `
          
          THIS IS THE RESPONSE ON THE CLIENT
          
          `);
  
      if (response.ok) {
        console.log(response);
        //   document.location.replace('/api/children');
        } else {
          alert('Failed to update devMmilestone');
      }
    }
  };


//Event handler for MED milestones
const medMilestoneUpdate = async (event) => {
    event.preventDefault();

    event.preventDefault();
    const medDate = document.querySelector('#med-milestone-date').value.trim();
    const medID = document.querySelector('#med-milestone-id').value;

    
    var submitButtonClicked = $(event.target);
    var currentInput = submitButtonClicked.parent()[0];
    // const selectedFile = document.getElementById('input').files[0].name;
    // console.log (selectedFile);
    console.log(submitButtonClicked);
    console.log('it was clicked');
    console.log(currentInput);
    console.log(medDate);
    // console.log(devID);

    if (medDate && medID) {
        const response = await fetch(`/api/todos/med`, {
          method: 'PUT',
          body: JSON.stringify({ medMilestone_dateComplete: medDate, id: medID }),
          headers: {
            'Content-Type': 'application/json',
          },
          });
          console.log(response, `
          
          THIS IS THE RESPONSE ON THE CLIENT
          
          `);
  
      if (response.ok) {
        console.log(response);
        //   document.location.replace('/api/children');
        } else {
          alert('Failed to update medMmilestone');
      }
    }
  };

devModal.on("click", ".button", devMilestoneUpdate);
medModal.on("click", ".button", medMilestoneUpdate);



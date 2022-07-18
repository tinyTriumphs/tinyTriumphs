// const childCards = $('#newid');
const photoUpload = $('#photo-upload')

const newFormHandler = async (event) => {
    event.preventDefault();
    
    var uploadButtonClicked = $(event.target);
    currentInput = uploadButtonClicked.parent()[0];
    console.log('it was clicked');
    console.log(currentInput);
    await alert(currentInput)


    // $('#child-photo-upload').attr('src', 'new');
}

photoUpload.on("click", ".newclass", newFormHandler);
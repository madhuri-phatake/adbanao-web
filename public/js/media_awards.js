function media() {
    document.getElementById('awards').style.display = 'none';
    document.getElementById('media').style.display = 'block';
    document.querySelector('.nav-link.active').classList.remove('active');
    document.querySelector('.nav-link[href="#media"]').classList.add('active');
}

function awards() {
    document.getElementById('media').style.display = 'none';
    document.getElementById('awards').style.display = 'block';
    document.querySelector('.nav-link.active').classList.remove('active');
    document.querySelector('.nav-link[href="#awards"]').classList.add('active');
}


function photomodel(photopath) {
    document.getElementById("photo").innerHTML = `<img src="${photopath}" alt="Photo not found" width="100%" height="100%">`
}
var link = document.getElementsByClassName('testimonial-card')[0];
link.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default action
    var videoUrl = link.getAttribute('href') + '?autoplay=1'; // Add autoplay property
    document.querySelector('#exampleModal1 iframe').setAttribute('src', videoUrl); // Set the src attribute of the iframe element
    $('#exampleModal1').modal('show'); // Show the modal
});
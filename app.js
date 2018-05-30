const key = 'EEMd66MUcyYPmsNblizFGk5c4y2t1816MJ0BMgxU'; //key for nasa api
const sol = 1000;

// Elements
const links = document.querySelectorAll('.camera-link'); // get all the links
const imagesContainer = document.querySelector('.images'); //get container to hold images to insert html

// Functions
/* This function is to either display the error message if there are no images for the selected day */
const displayImages = images => {
  if (images.length === 0) {
    return (imagesContainer.innerHTML =
      '<p class="error-message">No photos available</p>');
  }
  imagesContainer.innerHTML = images
    .slice(0, 6)
    .map(image => {
      return `
      <div class="image-container">
        <img src="${image.img_src}" class="image"/>
      </div>
    `;
    })
    .join('');
};

/* This is the function for the nasa api fetch */
const getPhotos = camera => {
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&camera=${camera}&api_key=${key}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      displayImages(data.photos);
    });
};

// Events
links.forEach(link => {
  link.addEventListener('click', () => {
    getPhotos(link.dataset.camera);
  });
});

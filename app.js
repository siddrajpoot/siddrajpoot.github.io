const key = 'EEMd66MUcyYPmsNblizFGk5c4y2t1816MJ0BMgxU';
const images = [];

// Elements
const links = document.querySelectorAll('.camera-link');
const imagesContainer = document.querySelector('.images');

// Functions
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

const getPhotos = camera => {
  fetch(
    `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=${camera}&api_key=${key}`
  )
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

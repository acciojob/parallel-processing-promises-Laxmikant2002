//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to download a single image
function downloadImage(imageUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      resolve(img);
    };
    
    img.onerror = () => {
      reject(new Error(`Failed to load image's URL: ${imageUrl}`));
    };
    
    img.src = imageUrl;
  });
}

// Function to download all images
function downloadImages() {
  // Show loading spinner and hide error
  loading.style.display = "block";
  error.style.display = "none";
  output.innerHTML = "";
  
  // Create an array of promises
  const imagePromises = images.map(image => downloadImage(image.url));
  
  // Use Promise.all to download all images in parallel
  Promise.all(imagePromises)
    .then(downloadedImages => {
      // Hide loading spinner
      loading.style.display = "none";
      
      // Display all images
      downloadedImages.forEach(img => {
        output.appendChild(img);
      });
    })
    .catch(err => {
      // Hide loading spinner
      loading.style.display = "none";
      
      // Show error message
      error.style.display = "block";
      error.textContent = err.message;
    });
}

// Add event listener to button
btn.addEventListener("click", downloadImages);
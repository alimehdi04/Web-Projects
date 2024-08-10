const mainContent = document.getElementById("image-gallery");
const initialMessage = document.getElementById("initial-msg");
const loading = document.getElementById("loading-msg");
const gallery = document.getElementById("gallery-container");
const searchInput = document.getElementById('searchtxt');
const searchButton = document.getElementById('searchbtn');

async function fetchNASAImages(query) {
    const url = `https://images-api.nasa.gov/search?q=${query}&media_type=image`;
    try{
        const response = await fetch(url);
        const data = await response.json();
        return data.collection.items;
    }
    catch(error){
        console.error('Error Fetching Images:', error);
        // alert("Error fetching images");
    }
}

function displayImages(images){
    initialMessage.style.display = 'none';
    loading.style.display = 'none';
    gallery.innerHTML = '';

    images.forEach(item => {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'image-container';

        const img = document.createElement('img');
        img.src = item.links[0].href;
        img.alt = item.data[0].title;

        const title = document.createElement('h2');
        title.textContent = item.data[0].title;

        const description = document.createElement('p');
        description.textContent = item.data[0].description.substring(0,200)+"...";

        imgContainer.appendChild(img);
        imgContainer.appendChild(title);
        imgContainer.appendChild(description);

        gallery.appendChild(imgContainer);

    });
}

function handleSearch(){
    const query = searchInput.value.trim();
    if(query){
        initialMessage.style.display = "none";
        loading.style.display = "block";
        gallery.innerHTML = "";

        fetchNASAImages(query).then(images =>{
            if(images && images.length > 0){
                displayImages(images);
            }
            else{
                loading.style.display = 'none';
                gallery.innerHTML = "<p>No Images found. Try another search term.</p>";
            }
        });
    }
}

searchButton.addEventListener('click', handleSearch);

searchInput.addEventListener("keypress", (event)=> {
    if(event.key === 'Enter'){
        handleSearch();
    }
});

initialMessage.style.display = 'block';
loading.style.display = 'none';













//                   Will See
// async function fetchNASAImages(query = '') {
//     const url = `https://images-api.nasa.gov/search?q=${query}&media_type=image`;
//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       return data.collection.items;
//     } catch (error) {
//       console.error('Error fetching NASA images:', error);
//     }
//   }
  
//   // Usage
//   fetchNASAImages('mars').then(images => {
//     // Process and display the images
//     console.log(images);
//   });
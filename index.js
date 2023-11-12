// Define variables for DOM elements
const imageUpload = document.getElementById("image-upload");
const memeImage = document.getElementById("meme-image");
const topText = document.getElementById("top-text");
const bottomText = document.getElementById("bottom-text");
const generateMemeButton = document.getElementById("generate-meme");

// Event listener for image upload
imageUpload.addEventListener("change", () => {
    const file = imageUpload.files[0];
    if (file) {
        const imageURL = URL.createObjectURL(file);
        memeImage.src = imageURL;
    }
});

// Event listener for generating the meme
generateMemeButton.addEventListener("click", () => {
    // Remove existing text elements
    document.querySelectorAll(".meme-text").forEach((element) => {
        element.remove();
    });

    // Create top text element
    const topTextValue = topText.value;
    const topTextDiv = document.createElement("div");
    topTextDiv.className = "meme-text top";
    topTextDiv.innerText = topTextValue;
    memeImage.insertAdjacentElement("beforebegin", topTextDiv);

    // Create bottom text element
    const bottomTextValue = bottomText.value;
    const bottomTextDiv = document.createElement("div");
    bottomTextDiv.className = "meme-text bottom";
    bottomTextDiv.innerText = bottomTextValue;
    memeImage.insertAdjacentElement("afterend", bottomTextDiv);

    // Clear textareas
    topText.value = "";
    bottomText.value = "";
});

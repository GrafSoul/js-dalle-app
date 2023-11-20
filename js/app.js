const API_KEY = "YOUR_OPENAI_KEY";

const submitIcon = document.querySelector("#submit-btn");
const imageSection = document.querySelector(".image-section");

const getImage = async () => {
  const prompt = document.querySelector("#input").value;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      prompt: prompt,
      n: 4,
      size: "1024x1024",
    }),
  };

  try {
    const response = await fetch(
      `https://api.openai.com/v1/images/generations`,
      options
    );
    const data = await response.json();
    console.log(data);

    data?.data.map((image) => {
      const imageContainer = document.createElement("div");
      imageContainer.classList.add("image-container");
      const img = document.createElement("img");
      img.src = image.url;
      img.classList.add("image");
      imageContainer.append(img);
      imageSection.append(imageContainer);
      document.querySelector("#input").value = "";
    });
  } catch (error) {
    console.error(error);
  }
};

submitIcon.addEventListener("click", () => getImage());

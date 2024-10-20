// Function to fetch AI-generated text from Hugging Face API
async function getGeneratedText(prompt) {
  const API_URL = "https://api-inference.huggingface.co/models/openai-community/gpt2-large";  // GPT-2 model URL
  const headers = {
      Authorization: `Bearer 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`, // My Hugging Face API key got from the hugging face website by accessing tokens
      "Content-Type": "application/json"
  };

  const response = await fetch(API_URL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ inputs: prompt })
  });

  const data = await response.json();
  return data[0]?.generated_text;
}

// Function to insert zero-width characters (invisible watermark) into generated text
function insertWatermark(text) {
  const watermark = '\u200D'; // Zero-width joiner shown as "&zwj" in html 
  const words = text.split(' ');
  const interval = Math.floor(words.length / 10); // Watermark every 10% of the text length

  for (let i = interval; i < words.length; i += interval + 1) {
      words[i] += watermark; // Appends the invisible watermark
  }

  return words.join(' ');
}

// Event listener for the "Generate" button
document.getElementById('search-btn').addEventListener('click', async () => {
  const userPrompt = document.getElementById('search-box').value; // Gets user input from the search box
  if (userPrompt) {
      try {
          const generatedText = await getGeneratedText(userPrompt); // Fetches AI-generated text
          if (generatedText) {
              const watermarkedText = insertWatermark(generatedText); // Applies watermark
              // Displays the watermarked text in the output paragraph
              document.getElementById('output').innerHTML = watermarkedText;
          } else {
              console.error("Failed to fetch generated text from the API."); // shows eroor in console when the api cannot be fetched
          }
      } catch (error) {
          console.error("Error during API request:", error);
      }
  } else {
      console.error("No input provided!");
  }
});




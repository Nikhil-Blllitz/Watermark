const express = require('express');  // I have used express, a Node.js web application framework 
const app = express();
const PORT = process.env.PORT || 3001;

// Serves static files (index.html, script.js)
app.use(express.static(__dirname));

// Starts the server at local host 3001
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});





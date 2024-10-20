const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files (index.html, script.js)
app.use(express.static(__dirname));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});





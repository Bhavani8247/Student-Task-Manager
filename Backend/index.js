const app = require("./server");

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

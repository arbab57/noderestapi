const fs = require("fs");

function writeToFile(filename, content) {
  fs.writeFileSync(
    filename,
    JSON.stringify(content),
    {
      encoding: "utf8",
    },
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
}

async function getPostData(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  writeToFile,
  getPostData,
};

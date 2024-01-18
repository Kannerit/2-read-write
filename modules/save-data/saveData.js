const { error } = require("console");
const data = require("../data/data.json");
const fs = require("fs");
const path = require("path");

function saveData(jsonData, folderName, overwrite) {
  console.log(jsonData);

  fs.readdir(path.join(__dirname, "..", jsonData), (err, files) => {
    if (err) {
      console.error(err);
    } else {
      fs.mkdir(path.join(__dirname, "dataFiles"), (err) => {
        if (err) {
          if (err.code === "EEXIST") {
            console.log("This folder exists");
            return;
          }
        } else {
          console.log("Folder was created");
        }
      });
      files.forEach((file) => {
        console.log(file);
        fs.readFile(
          path.join(__dirname, "..", jsonData, file),
          "utf-8",
          (err, data) => {
            if (err) {
              console.error(err);
            } else {
              // console.log(JSON.parse(data));

              //here make forEach//

              let studentsData = JSON.parse(data);

              studentsData.forEach((student) => {
                const studentInfo = {
                  Name: student.name.split(" ").join(" "),
                  Username: student.username,
                  Street: student.address.street,
                  ZipCode: student.address.zipcode,
                  City: student.address.city,
                  Phone: student.phone,
                };

                let content = `Name: 
                ${studentInfo.Name}, \n Username: 
                ${studentInfo.Username}, \n Street: 
                ${studentInfo.Street}, \n \nZipCode:
                ${studentInfo.ZipCode}, \nCity:
                ${studentInfo.City}, \nPhone:
                ${studentInfo.Phone}, `;

                fs.writeFile(
                  path.join(
                    __dirname,
                    "dataFiles",
                    `studentInfo_${studentInfo.Name}.txt`
                  ),
                  content,
                  (err) => {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log("File was succesfully made!");
                    }
                  }
                );

                console.log(studentInfo);
              });
            }
          }
        );
      });
    }
  });
}

module.exports.saveData = saveData;

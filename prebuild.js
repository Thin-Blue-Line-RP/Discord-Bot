const path = require('path');
const fs = require('fs');

const distPath = path.join(__dirname, 'dist');

const prebuild = async () => {
    if (fs.existsSync(distPath)) {
        fs.rm(distPath, { recursive: true }, (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log("Clean up dist folder successfully!")
            }
        });

    } else {
        console.log("Clean up dist folder successfully!")
    }
}

prebuild();
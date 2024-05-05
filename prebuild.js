const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const distPath = path.join(__dirname, 'dist');

const prebuild = async () => {
    if (fs.existsSync(distPath)) {
        try {
            rimraf.sync(distPath)
            console.log('Deleted dist folder')
        } catch (error) {
            console.error('Error deleting dist folder: ', error)
        }
    }
}

prebuild()
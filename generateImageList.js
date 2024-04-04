const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'assets');
const outputFilePath = path.join(__dirname, 'assets', 'imageList.json');

let imageList = {};

// assets 폴더 내의 모든 디렉토리를 순회
fs.readdirSync(assetsDir, { withFileTypes: true }).forEach(dir => {
    if (dir.isDirectory()) {
        const dirPath = path.join(assetsDir, dir.name);
        imageList[dir.name] = fs.readdirSync(dirPath)
            .filter(file => /\.(jpg|jpeg|png|svg)$/.test(file))
            .map(file => `https://cdn.jsdelivr.net/gh/deccomm/fdp/assets/${dir.name}/${file}`);
    }
});

// JSON 파일로 결과 저장
fs.writeFileSync(outputFilePath, JSON.stringify(imageList, null, 2));
console.log('Image list JSON file generated.');

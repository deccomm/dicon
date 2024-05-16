const fs = require('fs');
const path = require('path');

// 'assets' 폴더가 저장된 로컬 디렉토리 경로 설정
const assetsDir = path.join(__dirname, 'assets');
// 결과를 저장할 JSON 파일의 경로 설정
const outputFilePath = path.join(__dirname, 'assets', 'logoList.json');

let logoList = {};

// 'assets' 폴더 내의 모든 디렉토리를 순회
fs.readdirSync(assetsDir, { withFileTypes: true }).forEach(dir => {
    if (dir.isDirectory()) {
        const dirPath = path.join(assetsDir, dir.name);
        logoList[dir.name] = fs.readdirSync(dirPath)
            .filter(file => /\.svg$/.test(file))  // 오직 SVG 파일만 필터링
            .map(file => `https://cdn.jsdelivr.net/gh/deccomm/dicon/assets/${dir.name}/${file}`);
    }
});

// 결과를 JSON 파일로 저장
fs.writeFileSync(outputFilePath, JSON.stringify(logoList, null, 2));
console.log('Logo list JSON file generated.');

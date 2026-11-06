import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

async function packExtension() {
  const zip = new JSZip();
  const extensionDir = path.resolve('extension');

  function addDirToZip(currentDir, zipFolder) {
    const files = fs.readdirSync(currentDir);
    for (const file of files) {
      const fullPath = path.join(currentDir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        const subFolder = zipFolder.folder(file);
        addDirToZip(fullPath, subFolder);
      } else {
        const content = fs.readFileSync(fullPath);
        zipFolder.file(file, content);
      }
    }
  }

  addDirToZip(extensionDir, zip);

  const outDir = path.resolve('public');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'apex-capital-chrome-extension.zip');

  const content = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
  fs.writeFileSync(outPath, content);
  console.log(`Successfully packed Chrome Extension to ${outPath} (${content.length} bytes)`);
}

packExtension().catch(err => {
  console.error('Failed to pack extension:', err);
  process.exit(1);
});

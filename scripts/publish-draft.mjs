// 사용법: yarn publish-draft <category> <id>
// drafts/(비공개 저장소)의 초안을 contents/로 옮기고, metadata의 `draft: true`를 지운다.
// 옮긴 뒤에는 블로그 저장소에서 확인·커밋하고, drafts 저장소에서 초안을 지운다.
import fs from 'fs';
import path from 'path';

const [category, id] = process.argv.slice(2);

const fail = (message) => {
  console.error(message);
  process.exit(1);
};

if (!category || !id) fail('사용법: yarn publish-draft <category> <id>');

const root = process.cwd();
const draftFile = path.join(root, 'drafts/contents', category, `${id}.mdx`);
const postFile = path.join(root, 'contents', category, `${id}.mdx`);
const draftImages = path.join(root, 'drafts/contents/image', category, id);
const postImages = path.join(root, 'contents/image', category, id);

if (!fs.existsSync(draftFile)) {
  fail(`초안이 없습니다: ${path.relative(root, draftFile)}`);
}
if (fs.existsSync(postFile)) {
  fail(`이미 같은 이름의 글이 있습니다: ${path.relative(root, postFile)}`);
}
if (fs.existsSync(draftImages) && fs.existsSync(postImages)) {
  fail(
    `이미 같은 이름의 이미지 폴더가 있습니다: ${path.relative(root, postImages)}`,
  );
}

const published = fs
  .readFileSync(draftFile, 'utf-8')
  .replace(/^[ \t]*draft:\s*true,?[ \t]*\r?\n/m, '');

fs.mkdirSync(path.dirname(postFile), { recursive: true });
fs.writeFileSync(postFile, published);
console.log(`글을 옮겼습니다: ${path.relative(root, postFile)}`);

if (fs.existsSync(draftImages)) {
  fs.cpSync(draftImages, postImages, { recursive: true });
  console.log(`이미지를 옮겼습니다: ${path.relative(root, postImages)}`);
}

console.log(`
다음 단계:
  1. yarn dev 로 글을 확인합니다. ("초안" 표시가 없어야 합니다)
  2. 블로그 저장소에서 브랜치를 만들고 커밋해 Preview로 확인한 뒤 main에 반영합니다.
  3. 발행이 끝나면 drafts 저장소에서 이 초안을 지웁니다.`);

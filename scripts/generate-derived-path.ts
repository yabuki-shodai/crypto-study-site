async function main() {
  const addressIndex = 0;
  const path = `m/84'/0'/0'/0/${addressIndex}`;

  return path;
}

main().then((path) => {
  console.log(path);
});

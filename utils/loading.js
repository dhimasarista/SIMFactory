function loadingAnimation() {
    const chars = ['⣾', '⣽', '⢻', '⡟', '⡿', '⣿', '⢿', '⣾', '⣽', '⣻'];
    let i = 0;
    return setInterval(() => {
      const text = '>>> Checking Database';
      process.stdout.write(`\r${text} ${chars[i]}`);
      i = (i + 1) % chars.length;
    }, 200);
}
  

  module.exports = loadingAnimation;
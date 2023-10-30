function loadingAnimation(params) {
    const chars = ['⣾', '⣽', '⢻', '⡟', '⡿', '⣿', '⢿', '⣾', '⣽', '⣻'];
    let i = 0;
    return setInterval(() => {
      const text = params;
      process.stdout.write(`\r${text} ${chars[i]}`);
      i = (i + 1) % chars.length;
    }, 200);
}
  

  module.exports = loadingAnimation;
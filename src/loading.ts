const loading = document.getElementById('loading') as HTMLElement;
const root = document.getElementById('root') as HTMLElement;
const animationDuration = 1640;

const theme = localStorage.getItem('theme') ?? 'dark';

// apply themed css to #loading
const bgColor = theme === 'dark' ? '#111111' : '#ffffff';
loading.setAttribute(
  'style',
  `
    align-items: center; 
    background-color: ${bgColor};
    bottom: 0;
    display: flex;
    justify-content: center;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
  `,
);

// append image inside #loading
const logo = document.createElement('img');
logo.setAttribute('alt', 'Bushy JS Ltd');
logo.setAttribute('width', '500px');
logo.onload = removeLoading;
logo.setAttribute('src', `/img/${theme}-mode/loading-gif.gif`);
loading.appendChild(logo);

// attach theme value to document element (picked up by redux)
document.documentElement.setAttribute('data-theme', theme);

// remove #loading once react has been injected and animation has finished
function removeLoading() {
  const startTime = new Date();

  if (root.hasChildNodes()) {
    return setTimeout(
      () => loading.remove(),
      Math.max(animationDuration - (new Date().valueOf() - startTime.valueOf()), 0),
    );
  }

  const observer = new MutationObserver((_, observer) => {
    setTimeout(() => loading.remove(), Math.max(animationDuration - (new Date().valueOf() - startTime.valueOf()), 0));
    observer.disconnect();
  });

  observer.observe(root, { childList: true, subtree: true });
}

// load main css in the background
document.head.innerHTML += '<link href="/main.css" rel="stylesheet" type="text/css">';

export function createStyleSheet(container = document.getElementsByTagName('head')[0]) {
  let style = document.createElement('style');
  style.type = 'text/css';
  style.media = 'screen';
  container.appendChild(style);
  return style;
}

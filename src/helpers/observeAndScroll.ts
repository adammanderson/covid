/* eslint-disable no-param-reassign */

export function scrollToTop(element: HTMLElement | null): void {
  if (!element) return;

  element.scrollTop = 0;
}

export function observeAndScroll(element: HTMLElement | null): void {
  if (!element) return;

  const observer = new MutationObserver(() => scrollToTop(element));
  const config = { attributes: true };
  scrollToTop(element);
  observer.observe(element, config);
}

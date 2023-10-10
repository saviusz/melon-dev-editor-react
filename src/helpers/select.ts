export function selectStart(el: HTMLElement) {
  const range = new Range();
  range.setStart(el.firstChild ?? el, 0);
  range.setEnd(el.firstChild ?? el, 0);
  return range;
}

export function selectEnd(el: HTMLElement) {
  const range = new Range();
  const elem = el.lastChild ?? el;
  range.setStart(elem, elem.textContent?.length ?? 0);
  range.setEnd(elem, elem.textContent?.length ?? 0);
  return range;
}

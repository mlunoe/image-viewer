export default function getImageID(link) {
  const segments = link.split('/');
  const id = segments.pop();
  if (id) {
    return id;
  }
  return segments.pop();
};

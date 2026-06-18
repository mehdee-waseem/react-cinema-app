// just a random id stored in the browser so favorites can be tied to
// "this visitor" without needing an actual login system
export function getVisitorId() {
  let id = localStorage.getItem('visitorId');

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('visitorId', id);
  }

  return id;
}

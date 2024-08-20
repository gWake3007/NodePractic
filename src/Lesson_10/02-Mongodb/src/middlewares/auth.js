export async function auth(req, res, next) {
  console.log(req.headers);
  next();
}

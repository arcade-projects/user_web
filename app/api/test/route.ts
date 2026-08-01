export async function GET() {
  return Response.json({
    jwt: process.env.JWT_SECRET,
    node: process.env.NODE_ENV,
  });
}
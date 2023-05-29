import { NextResponse } from "next/server";

//test data
const posts = [
  {
    title: "Lorem Ipsum",
    slug: "lorem-ipsum",
    content: "1234567890 hi",
  },
];

export async function GET() {
  return NextResponse.json(posts);
}

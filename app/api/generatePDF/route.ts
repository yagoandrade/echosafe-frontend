import { NextResponse } from "next/server";
import { UrlConverter } from "chromiumly";

async function generatePDFfromHTML(url: string) {
  const urlConverter = new UrlConverter();

  const buffer = await urlConverter.convert({
    url,
  });

  return buffer;
}

export async function POST(req: Request, res: Response) {
  const { url } = await req.json();

  try {
    const buffer = await generatePDFfromHTML(url);

    return new Response(buffer, {
      headers: { "content-type": "application/pdf" },
    });
  } catch (err) {
    return NextResponse.json({ message: err, success: false });
  }
}

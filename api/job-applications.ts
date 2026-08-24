import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const cmsApiUrl = process.env.VITE_CMS_API_URL || "";
    
    // Forward directly to CMS backend which handles database storage & email notifications
    const cmsRes = await fetch(`${cmsApiUrl}/api/job-applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await cmsRes.json();
    return res.status(cmsRes.status).json(data);
  } catch (error: any) {
    console.error("Job application forwarder error:", error);
    return res.status(500).json({
      error: error.message || "Internal server error",
    });
  }
}

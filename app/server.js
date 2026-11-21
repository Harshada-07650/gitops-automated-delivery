const http = require("http");
const os = require("os");

const PORT = process.env.PORT || 3000;
const VERSION = process.env.APP_VERSION || "1.0.0";

http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ status: "healthy" }));
  }

  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(`<!doctype html>
<html><head><meta name="viewport" content="width=device-width,initial-scale=1">
<title>GitOps Delivery Demo</title>
<style>
body{font-family:Arial,sans-serif;background:#101827;color:#eef2ff;margin:0;display:grid;min-height:100vh;place-items:center}
main{max-width:680px;margin:24px;padding:36px;border:1px solid #334155;border-radius:18px;background:#1e293b}
h1{color:#67e8f9} .tag{display:inline-block;padding:8px 12px;background:#064e3b;border-radius:20px}
p{line-height:1.6;color:#cbd5e1}
</style></head><body><main>
<span class="tag">LIVE • Kubernetes</span>
<h1>GitOps & Automated Delivery Pipelines</h1>
<p>Deployment is managed through Git. GitHub Actions builds and publishes the container image, while Argo CD reconciles the Kubernetes cluster with the desired state stored in Git.</p>
<p><b>Application version:</b> ${VERSION}</p>
<p><b>Container host:</b> ${os.hostname()}</p>
<p><b>Environment:</b> Kubernetes-ready demo</p>
</main></body></html>`);
}).listen(PORT, () => console.log(`App listening on ${PORT}`));

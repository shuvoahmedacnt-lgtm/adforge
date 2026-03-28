{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" }
  ],
  "functions": {
    "api/generate-ad.js": {
      "maxDuration": 30
    }
  }
}

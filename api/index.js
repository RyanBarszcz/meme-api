export default function handler(req, res) {
  res.status(200).json({
    name: "Meme Error API",
    usage: "/api/error?type=SERVER_ERROR",
    typesEndpoint: "/api/types"
  });
}

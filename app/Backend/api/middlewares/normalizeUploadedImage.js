const fs = require("fs/promises");
const path = require("path");
const heicConvert = require("heic-convert");
const { ValidationError } = require("../errors");

const HEIC_EXTENSIONS = new Set([".heic", ".heif"]);
const HEIC_MIME_TYPES = new Set(["image/heic", "image/heif"]);

function isHeicFile(file) {
  if (!file) return false;

  const ext = path.extname(file.originalname || file.filename || "").toLowerCase();
  const mime = String(file.mimetype || "").toLowerCase();

  return HEIC_EXTENSIONS.has(ext) || HEIC_MIME_TYPES.has(mime);
}

function toJpgName(name = "image.heic") {
  const parsed = path.parse(name);
  return `${parsed.name}.jpg`;
}

module.exports = async function normalizeUploadedImage(req, res, next) {
  try {
    if (!req.file) return next();
    if (!isHeicFile(req.file)) return next();

    // TEST / memoryStorage eset
    if (req.file.buffer) {
      const outputBuffer = await heicConvert({
        buffer: req.file.buffer,
        format: "JPEG",
        quality: 0.9,
      });

      req.file.buffer = outputBuffer;
      req.file.size = outputBuffer.length;
      req.file.mimetype = "image/jpeg";
      req.file.originalname = toJpgName(req.file.originalname);
      req.file.filename = toJpgName(req.file.filename || req.file.originalname);

      return next();
    }

    // Production / diskStorage eset
    if (!req.file.path) {
      return next(
        new ValidationError("A feltöltött fájl nem dolgozható fel.")
      );
    }

    const inputPath = req.file.path;
    const inputBuffer = await fs.readFile(inputPath);

    const outputBuffer = await heicConvert({
      buffer: inputBuffer,
      format: "JPEG",
      quality: 0.9,
    });

    const parsedPath = path.parse(inputPath);
    const outputPath = path.join(parsedPath.dir, `${parsedPath.name}.jpg`);

    await fs.writeFile(outputPath, outputBuffer);
    await fs.unlink(inputPath);

    req.file.path = outputPath;
    req.file.destination = parsedPath.dir;
    req.file.filename = `${parsedPath.name}.jpg`;
    req.file.mimetype = "image/jpeg";
    req.file.size = outputBuffer.length;
    req.file.originalname = toJpgName(req.file.originalname);

    return next();
  } catch (error) {
    return next(
      new ValidationError("A HEIC/HEIF kép JPG-vé alakítása sikertelen volt.")
    );
  }
};
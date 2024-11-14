import * as crypto from "crypto";

const algorithm = "aes-256-ctr";
const secretKey = process.env.SECRET_KEY;

function encrypt(text: string) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(secretKey, "hex"),
    iv
  );
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

function decrypt(text: string) {
  const [iv, encryptedText] = text.split(":");
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(secretKey, "hex"),
    Buffer.from(iv, "hex")
  );
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedText, "hex")),
    decipher.final(),
  ]);
  return decrypted.toString();
}


import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as fs from "fs";

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync("path/to/private-key.pem"),
    cert: fs.readFileSync("path/to/public-certificate.pem"),
  };
  const app = await NestFactory.create(AppModule, { httpsOptions });
  await app.listen(3000);
}

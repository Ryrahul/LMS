import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
@Injectable()
export class MinioService {
  private minioClient: Minio.Client;
  private endPoint: string;
  private port: number;
  private accessKey: string;
  private secretKey: string;
  constructor(private readonly configService: ConfigService) {
    this.accessKey = configService.getOrThrow('ACCESS_KEY');
    this.accessKey = configService.getOrThrow('SECRET_KEY');
    this.accessKey = configService.getOrThrow('PORT');
    this.accessKey = configService.getOrThrow('END_POINT');
    this.minioClient = new Minio.Client({
      endPoint: this.endPoint,
      port: this.port,
      useSSL: false,
      accessKey: this.accessKey,
      secretKey: this.secretKey,
    });
  }
  async UploadFile(file: Express.Multer.File, key: string) {
    try {
      this.minioClient.putObject(
        this.configService.getOrThrow('BUCKET_NAME'),
        key,
        file.buffer,
        (err) => {
          console.log(err);
        },
      );
    } catch (e) {
      return e.message;
    }
  }

  async GetfileUrl(key: string) {
    return `https://my-minio-server.com/${this.configService.get(
      'BUCKET_NAME',
    )}/${key}`;
  }
  async DeleteFile(key: string) {
    try {
      await this.minioClient.removeObject(
        this.configService.getOrThrow('BUCKET_NAME'),
        key,
      );
    } catch (e) {}
  }
}

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
    this.secretKey = configService.getOrThrow('SECRET_KEY');
    this.port = parseInt(configService.getOrThrow('PORT'));
    this.endPoint = configService.getOrThrow('END_POINT');
    this.minioClient = new Minio.Client({
      endPoint: this.endPoint,
      port: this.port,
      useSSL: false,
      accessKey: this.accessKey,
      secretKey: this.secretKey,
    });
  }
  async UploadFile(file:Buffer, key: string) {
    try {
      this.minioClient.putObject(
        this.configService.getOrThrow('BUCKET'),
        key,
        file,
        (err,objInfo) => {
            if(err){
          console.log(err)
            }
            else{
                console.log(objInfo)
            };
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

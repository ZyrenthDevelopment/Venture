import { deflate, inflate } from "zlib";

export default class ZLib {
    static compress(data: Buffer): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            deflate(data, (error, compressedData) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(compressedData);
                }
            });
        });
    }

    static decompres(data: Buffer): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            inflate(data, (error, decompressedData) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(decompressedData);
                }
            });
        });
    }
}
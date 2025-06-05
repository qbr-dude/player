import {Controller, Get, Param, Req, Res} from '@nestjs/common';
import {Request, Response} from 'express';
import {createReadStream, statSync} from 'node:fs';
import {join} from 'node:path';

const CHUNK_SIZE = 2 ** 20; // 1MB

@Controller('videos')
export class VideosController {
  constructor() {}

  @Get(':name')
  getVideo(
    @Param('name') name: string,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    const path = join(__dirname, '..', '..', 'uploads', name);

    const stats = statSync(path);
    const fileSize = stats.size;

    const range = request.headers.range;
    if (!range) {
      response.writeHead(200, {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      });
      createReadStream(path).pipe(response);
      return;
    }

    const [startStr, endStr] = range.replace(/bytes=/, '').split('-');
    const start = parseInt(startStr, 10);
    const end = endStr ? parseInt(endStr, 10) : start + CHUNK_SIZE - 1;

    const stream = createReadStream(path, {start, end});
    response.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': CHUNK_SIZE,
      'Content-Type': 'video/mp4',
    });

    stream.pipe(response);
  }
}

import { serveDirMiddleware, type HTTPMiddleware } from "revolution";

export function assetsRoute(
  fsDir: string,
  urlDir: string = fsDir,
): HTTPMiddleware {
  return serveDirMiddleware({
    fsRoot: new URL(import.meta.resolve(`../${fsDir}`)).pathname,
    urlRoot: urlDir,
  });
}

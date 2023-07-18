import { randomUUID } from "crypto";
import MediaType from "../../src/data/models/media-type";

export default function storyFactory(params: { 
  userId?: number,
  title?: string,
  description?: string,
  mediaType?: MediaType,
  mediaId?: string,
  isEnabled?: boolean,
}) {
  const uuid = randomUUID();
  return {
    userId: params.userId ?? 1,
    title: params.title ?? `title-${uuid}`,
    description: params.description ?? `description-${uuid}`,
    mediaType: params.mediaType ?? MediaType.image,
    mediaId: params.mediaId ?? `mediaId-${uuid}`,
    isEnabled: params.isEnabled ?? true,
  };
}
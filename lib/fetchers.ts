/**
 * Data fetching utilities
 * To be implemented in PR-002
 */

import { ProfileLite } from "@/types/user";
import { Cast } from "@/types/cast";
import { GraphList } from "@/types/graph";

export async function searchUsers(query: string): Promise<ProfileLite[]> {
  // TODO: Implement user search
  throw new Error("Not implemented");
}

export async function getCastByHash(hash: string): Promise<Cast> {
  // TODO: Implement cast lookup
  throw new Error("Not implemented");
}

export async function getFollowers(
  fid: number,
  cursor?: string
): Promise<GraphList> {
  // TODO: Implement followers fetch
  throw new Error("Not implemented");
}

export async function getFollowing(
  fid: number,
  cursor?: string
): Promise<GraphList> {
  // TODO: Implement following fetch
  throw new Error("Not implemented");
}

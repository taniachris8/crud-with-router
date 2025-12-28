import axios from "axios";
import type { PostType } from "./components/Posts";

const BASE_URL = "http://localhost:7070/posts";

export const createNewPost = async (post: {
  content: string;
}): Promise<void> => {
  await axios.post(BASE_URL, post);
};

export const getAllPosts = async (): Promise<PostType[]> => {
  const response = await axios.get<PostType[]>(BASE_URL);
  return response.data;
};

export const getPostById = async (id: number): Promise<PostType> => {
  const response = await axios.get<{ post: PostType }>(`${BASE_URL}/${id}`);
  console.log("API response", response.data);
  return response.data.post;
};

export const updatePostById = async (
  id: number,
  updatedPost: { content: string }
): Promise<void> => {
  await axios.put(`${BASE_URL}/${id}`, updatedPost);
};

export const deletePostById = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};

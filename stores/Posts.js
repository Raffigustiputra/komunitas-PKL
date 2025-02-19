import { defineStore } from "pinia";

export const usePosts = defineStore("Posts", () => {
  async function fetchPosts() {
    try {
      const response = await fetch("http://192.168.19.251:8000/api/posts/");
      if (!response.ok) {
        throw new Error(
          `Gagal mengambil postingan. Status: ${response.status}`
        );
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Error fetching posts:", err);
      throw err;
    }
  }

  async function createPost(
    name,
    description,
    image,
    visibility,
    category
  ) {
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);

      if (image) {
        formData.append("image", image);
      }

      formData.append("visibility", visibility);
      formData.append("category", category);
      const response = await fetch(
        "http://192.168.19.251:8000/api/communities/create/",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Token ${useAuth().userToken.value}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Gagal membuat komunitas. Status: ${response.status}`);
      }
      const create = await response.json();
      return create;
    } catch (err) {
      console.error("Error creating community:", err);
      throw err;
    }
  }

  return {
    fetchPosts,
    createPost,
  };
});

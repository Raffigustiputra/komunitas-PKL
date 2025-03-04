
export const usePosts = defineStore("Posts", () => {
  async function fetchPosts() {
    try {
      const response = await fetch("http://192.168.19.251:8000/api/posts/", {
        headers: {
          'Authorization': `Token ${useAuth().userToken.value}`,
        }
      })
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

  async function fetchUserPosts() {
    try {
      const response = await fetch("http://192.168.19.251:8000/api/posts/users/", {
        headers: {
          'Authorization': `Token ${useAuth().userToken.value}`,
        }
      });
  
      if (!response.ok) {
        throw new Error(`Gagal mengambil postingan user. Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data; // Mengembalikan data postingan user
    } catch (err) {
      console.error("Error fetching user posts:", err);
      throw err;
    }
  }

  async function fetchCommunityPosts(postId) {
    try {
      const response = await fetch(
        `http://192.168.19.251:8000/api/posts/community/${postId}/`,
        {
          headers: {
            Authorization: `Token ${useAuth().userToken.value}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Gagal mengambil postingan user. Status: ${response.status}`
        );
      }

      const data = await response.json();
      return data; // Mengembalikan data postingan user
    } catch (err) {
      console.error("Error fetching user posts:", err);
      throw err;
    }
  }
  
  async function createPost(description, image, attachment, visibility, community, userId) {
    const formData = new FormData();

    formData.append('description', description);
    if (image) {
      formData.append("image", image);
    }
    if (attachment) {
      formData.append("attachment", attachment);
    }
    formData.append('visibility', visibility);  
    formData.append('community', community);   
    formData.append('user', userId);  

    try {
        const response = await fetch(
          "http://192.168.19.251:8000/api/posts/create/",
          {
            method: "POST",
            body: formData,
            headers: {
              'Authorization': `Token ${useAuth().userToken.value}`,
            },
          }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error(' Error dari server:', errorData);
            throw new Error('Gagal membuat postingan');
        }

        // const result = await response.json();z
        // console.log(' Postingan berhasil dibuat:', result);
        return true;
    } catch (error) {
        console.error('Error saat membuat postingan:', error);
        throw error;
    }
  };

  async function removePost(postId) {
    try {
      const response = await fetch(
        `http://192.168.19.251:8000/api/posts/delete/${postId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${useAuth().userToken.value}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(
          `Gagal menghapus Postingan. Status: ${response.status}`
        );
      }
      return true;
    } catch (err) {
      console.error(`Error deleting ${postId}:`, err);
      throw err;
    }
  }

  return {
    fetchPosts,
    fetchUserPosts,
    createPost,
    removePost,
    fetchCommunityPosts,
  };
});

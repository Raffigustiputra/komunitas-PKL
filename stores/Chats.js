export const useChats = defineStore("Chats", () => {
  async function fetchChatingan(communityId) {
    try {
      const response = await fetch(
        `http://192.168.19.251:8000/api/chats/community/${communityId}/`,
        {
          headers: {
            Authorization: `Token ${useAuth().userToken.value}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(
          `Gagal mengambil chatingan inih. Status: ${response.status}`
        );
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async function createChat(description, image, attachment, community, user) {
    const formData = new FormData();

    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }
    if (attachment) {
      formData.append("attachment", attachment);
    }
    formData.append("community", community);
    formData.append("user", user);
    try {
      const response = await fetch(
        "http://192.168.19.251:8000/api/chats/create/",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Token ${useAuth().userToken.value}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.error(" Error dari server:", errorData);
        throw new Error("Gagal membuat postingan");
      }
      return true;
    } catch (error) {
      console.error("Error saat membuat postingan:", error);
      throw error;
    }
  }

  async function removeChat(chatId) {
    try {
      const response = await fetch(
        `http://192.168.19.251:8000/api/chats/delete/${chatId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${useAuth().userToken.value}`,
          }
        }
      ) 
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
    fetchChatingan,
    createChat,
    removeChat
  };
});

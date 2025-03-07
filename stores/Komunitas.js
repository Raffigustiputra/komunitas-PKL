export const useKomunitas = defineStore("komunitas", () => {
  // Fungsi untuk mengambil daftar komunitas
  async function fetchKomunitas() {
    try {
      const response = await fetch(
        "http://192.168.19.251:8000/api/communities/",
        {
          headers: {
            Authorization: `Token ${useAuth().userToken.value}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(
          `Gagal mengambil komunitas. Status: ${response.status}`
        );
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Error fetching communities:", err);
      throw err;
    }
  }

  async function fetchJoinedKomunitas() {
    try {
      const response = await fetch(
        "http://192.168.19.251:8000/api/communities/joined/",
        {
          headers: {
            Authorization: `Token ${useAuth().userToken.value}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(
          `Gagal mengambil komunitas. Status: ${response.status}`
        );
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Error fetching communities:", err);
      throw err;
    }
  }

    async function fetchJoiningKomunitas(komunitasId) {
      try {
      const response = await fetch(
        `http://192.168.19.251:8000/api/communities/join/${komunitasId}/`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${useAuth().userToken.value}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(
          `Gagal mengirim komunitas. Status: ${response.status}`
        );
      }
      const responseData = await response.json();
    } catch (err) {
      console.error("Error fetching communities:", err);
      throw err;
    }
  }

  // Fungsi untuk mengambil detail komunitas berdasarkan ID
  const fetchKomunitasDetail = async (komunitasId) => {
    try {
      const response = await fetch(
        `http://192.168.19.251:8000/api/communities/detail/${komunitasId}/`,
        {
          headers: {
            Authorization: `Token ${useAuth().userToken.value}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(
          `Gagal mengambil detail komunitas. Status: ${response.status}`
        );
      }
      const responseData = await response.json();

      console.log(responseData);
      return {
        id: responseData.id,
        nama_komunitas: responseData.name,
        deskripsi: responseData.description,
        image: responseData.image
          ? `http://192.168.19.251:8000${responseData.image}`
          : null,
        visibility: responseData.visibility,
        category: responseData.category
          ? responseData.category.name
          : "Tidak ada kategori",
      };
    } catch (err) {
      console.error("Error fetching community detail:", err);
      throw err;
    }
  };


  async function CreateKomunitas(
    name,
    description,
    image,
    banner,
    visibility,
    category
  ) {
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);

      if (image, banner) {
        formData.append("image", image);
        formData.append("banner", banner);
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

  async function CategoryKomunitas() {
    try {
      const response = await fetch(
        "http://192.168.19.251:8000/api/categories/",
        {
          headers: {
            Authorization: `Token ${useAuth().userToken.value}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(
          `Gagal mengambil kategori komunitas. Status: ${response.status}`
        );
      }
      const category = await response.json();
      return category;
    } catch (err) {
      console.error("Error fetching categories:", err);
      throw err;
    }
  }

  async function removeKomunitas(komunitasId) {
    try {
      const response = await fetch(
        `http://192.168.19.251:8000/api/communities/${komunitasId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${useAuth().userToken.value}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(
          `Gagal menghapus komunitas. Status: ${response.status}`
        );
      }
      console.log("Komunitas berhasil dihapus.");
      return true;
    } catch (err) {
      console.error(`Error deleting community with ID ${komunitasId}:`, err);
      throw err;
    }
  }

  // Fungsi untuk mengedit komunitas berdasarkan ID
  async function editKomunitas(komunitasId, updatedData) {
    console.log("editKomunitas", komunitasId, updatedData);
    try {
      const response = await fetch(
        `http://192.168.19.251:8000/api/communities/${komunitasId}/`,
        {
          method: "PUT",
          body: updatedData,
          headers: {
            Authorization: `Token ${useAuth().userToken.value}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Gagal mengedit komunitas. Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Data after update:", data);
      return data;
    } catch (err) {
      console.error(`Error updating community with ID ${komunitasId}:`, err);
      throw err;
    }
  }

  // Fungsi untuk menghapus gambar komunitas berdasarkan ID
  async function removeImage(komunitasId) {
    try {
      const response = await fetch(
        `http://192.168.19.251:8000/api/communities/delete/${komunitasId}/`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`Gagal menghapus gambar. Status: ${response.status}`);
      }
      console.log("Gambar berhasil dihapus.");
      return true;
    } catch (err) {
      console.error(
        `Error deleting image for community ID ${komunitasId}:`,
        err
      );
      throw err;
    }
  }

  return {
    fetchKomunitas,
    CategoryKomunitas,
    CreateKomunitas,
    removeKomunitas,
    editKomunitas,
    fetchKomunitasDetail,
    removeImage,
    fetchJoinedKomunitas,
    fetchJoiningKomunitas,
  };
});

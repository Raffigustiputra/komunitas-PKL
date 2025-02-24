  <template>
    <div class="flex gap-3 bg-white p-3 rounded-3xl dark:bg-[#000000] dark:text-white">
      <div>
        <BaseImageIcon :image="account.profile_photo ? `http://192.168.19.251:8000${account.profile_photo}` : ''" />
      </div>

      <div class="flex flex-col w-full">
        <div>
          <BaseDropdownSecondaryDropdown
            v-if="isDropdownVisible"
            dropdownName="Semua dapat berkomentar"
            :items="['Option 1', 'Option 2', 'Option 3']"
            class="mb-3"
          />
          <BaseInputTextArea @click="showDropdowns" placeholder="Hai, ada apa?" />
          <div class="flex items-center gap-3">
            <BaseDropdownPrimaryDropdown
            v-if="isDropdownVisible"
            v-model="selectedVisibility"
            class="mt-3 mb-2"
            />
            <BaseDropdownCategoryDropdown  v-if="isDropdownVisible"  :items="dropdownItems" v-model="community" />
          </div>
        </div>
        
        <div class="flex justify-between">
          <div class="flex gap-3">
            <input
            type="file"
              accept=".pdf,.doc,.docx,.txt"
              hidden
              ref="docInput"
              @change="handleFileSelect"
            />
            <BaseButtonIconButton :icon="Attachment" @click="openDocPicker" />
            <input
              type="file"
              accept="image/*"
              hidden
              ref="imageInput"
              @change="handleFileSelect"
            />
            <BaseButtonIconButton :icon="Image" @click="openImagePicker" />
          </div>
          <div class="flex gap-3">
            <BaseButtonSecondaryButton buttonName="Drafts" />
            <BaseButtonPrimaryButton buttonName="Posting" />
          </div>
        </div>
      </div>
    </div>
  </template>

  <script setup>
  import { ref, onMounted } from "vue";
  import Attachment from "~/components/icons/Attachment.vue";
  import Image from "~/components/icons/Image.vue";
  import { useAuth } from "~/stores/Auth.js";
  import { useKomunitas } from '../stores/Komunitas';

  const accountStore = useAuth();
  const account = ref([]);
  const loading = ref(true);
  const komunitasStore = useKomunitas();
  const community = ref('');
  const dropdownItems = ref([]);

  const fetchData = async () => {
    loading.value = true;
    try {
      const auth = await accountStore.profile();
      account.value = auth; 
      console.log("Auth Response:", account.value);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      loading.value = false;
    }
  };

  const fetchKomunitas = async () => {
      try {
          const dataKomunitas = await komunitasStore.fetchKomunitas();
          dropdownItems.value = dataKomunitas.map((item) => ({
              label: item.name,
              value: item.id,
          }));
      } catch (error) {
          console.error('Error fetching categories:', error);
      }
  };

  onMounted(() => {
    fetchData();
    fetchKomunitas()
  });

  const docInput = ref(null);
  const imageInput = ref(null);
  const isDropdownVisible = ref(false);

  const openDocPicker = () => {
    docInput.value.click();
  };

  const openImagePicker = () => {
    imageInput.value.click();
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file);
    }
  };

  const showDropdowns = () => {
    isDropdownVisible.value = true;
  };
  </script>

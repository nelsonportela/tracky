import { ref } from "vue";

export function useMediaStoreFactory(api, mediaType) {
  const items = ref([]);
  const searchResults = ref([]);
  const loading = ref(false);
  const searchError = ref(null);

  const search = async (query) => {
    if (!query.trim()) {
      searchResults.value = [];
      searchError.value = null;
      return;
    }
    loading.value = true;
    searchError.value = null;
    try {
      const response = await api.search(query);
      searchResults.value = response.data;
    } catch (error) {
      searchResults.value = [];
      searchError.value =
        error.response?.data?.message || `Failed to search ${mediaType}s`;
    } finally {
      loading.value = false;
    }
  };

  const getUserItems = async () => {
    loading.value = true;
    try {
      const response = await api.getUserItems();
      items.value = response.data;
    } catch {
      // Silently fail
    } finally {
      loading.value = false;
    }
  };

  const addItem = async (itemData) => {
    try {
      const response = await api.addItem(itemData);
      items.value.push(response.data);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || `Failed to add ${mediaType}`,
      };
    }
  };

  const updateItemStatus = async (id, status) => {
    try {
      const response = await api.updateItem(id, { status });
      const index = items.value.findIndex((item) => item.id === id);
      if (index !== -1) {
        items.value[index] = response.data;
      }
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || `Failed to update ${mediaType} status`,
      };
    }
  };

  const updateItemQuickReview = async (id, quickReview) => {
    try {
      const response = await api.updateItem(id, { quick_review: quickReview });
      const index = items.value.findIndex((item) => item.id === id);
      if (index !== -1) {
        items.value[index] = response.data;
      }
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || `Failed to update ${mediaType} review`,
      };
    }
  };

  const updateItemDetails = async (id, updateData) => {
    try {
      const data = { ...updateData };
      if (data.quickReview !== undefined) {
        data.quick_review = data.quickReview;
        delete data.quickReview;
      }
      const response = await api.updateItem(id, data);
      const index = items.value.findIndex((item) => item.id === id);
      if (index !== -1) {
        items.value[index] = response.data;
      }
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || `Failed to update ${mediaType}`,
      };
    }
  };

  const removeItem = async (id) => {
    try {
      await api.removeItem(id);
      items.value = items.value.filter((item) => item.id !== id);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || `Failed to remove ${mediaType}`,
      };
    }
  };

  const getItemDetails = async (externalId) => {
    try {
      const response = await api.getItemDetails(externalId);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || `Failed to get ${mediaType} details`,
      };
    }
  };

  const getStats = async () => {
    try {
      const response = await api.getStats();
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || `Failed to get ${mediaType} statistics`,
      };
    }
  };

  return {
    items,
    searchResults,
    loading,
    searchError,
    search,
    getUserItems,
    addItem,
    updateItemStatus,
    updateItemQuickReview,
    updateItemDetails,
    removeItem,
    getItemDetails,
    getStats,
  };
}

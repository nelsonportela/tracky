<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-lg font-medium text-gray-900 dark:text-white">
        Preferences
      </h2>
      <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Customize your application preferences and display settings.
      </p>
    </div>

    <form @submit.prevent="submitForm" class="space-y-6">
      <!-- Library Preferences -->
      <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
        <h3 class="text-md font-medium text-gray-900 dark:text-white mb-4">
          Library Settings
        </h3>

        <div class="space-y-4">
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Default View
            </label>
            <select
              v-model="formData.default_view"
              class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400">
              <option value="grid">Grid View</option>
              <option value="list">List View</option>
              <option value="compact">Compact View</option>
            </select>
          </div>

          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Items per Page
            </label>
            <select
              v-model="formData.items_per_page"
              class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400">
              <option :value="10">10</option>
              <option :value="20">20</option>
              <option :value="50">50</option>
              <option :value="100">100</option>
            </select>
          </div>

          <div class="flex items-center">
            <input
              id="show-spoilers"
              v-model="formData.show_spoilers"
              type="checkbox"
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700" />
            <label
              for="show-spoilers"
              class="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Show spoiler content by default
            </label>
          </div>

          <div class="flex items-center">
            <input
              id="auto-update-status"
              v-model="formData.auto_update_status"
              type="checkbox"
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700" />
            <label
              for="auto-update-status"
              class="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Automatically update status when adding items
            </label>
          </div>
        </div>
      </div>

      <!-- Menu Options -->
      <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
        <h3 class="text-md font-medium text-gray-900 dark:text-white mb-4">
          Menu Options
        </h3>
        <div class="space-y-2">
          <div
            v-for="option in menuOptions"
            :key="option.value"
            class="flex items-center">
            <input
              :id="'menu-option-' + option.value"
              type="checkbox"
              v-model="formData.menu_options"
              :value="option.value"
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700" />
            <label
              :for="'menu-option-' + option.value"
              class="ml-2 text-sm text-gray-700 dark:text-gray-300">
              {{ option.label }}
            </label>
          </div>
        </div>
      </div>

      <!-- Notification Preferences -->
      <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
        <h3 class="text-md font-medium text-gray-900 dark:text-white mb-4">
          Notifications
        </h3>

        <div class="space-y-4">
          <div class="flex items-center">
            <input
              id="email-updates"
              v-model="formData.email_updates"
              type="checkbox"
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700" />
            <label
              for="email-updates"
              class="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Email updates about new features
            </label>
          </div>

          <div class="flex items-center">
            <input
              id="release-notifications"
              v-model="formData.release_notifications"
              type="checkbox"
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700" />
            <label
              for="release-notifications"
              class="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Notify about upcoming releases
            </label>
          </div>

          <p class="text-xs text-gray-500 dark:text-gray-400">
            <span
              class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
              Coming Soon
            </span>
            Notification features are currently in development.
          </p>
        </div>
      </div>

      <!-- Save Button -->
      <div class="flex justify-end">
        <button
          type="submit"
          :disabled="loading || !hasChanges"
          class="px-4 py-2 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white font-medium rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <span v-if="loading" class="flex items-center">
            <svg
              class="animate-spin -ml-1 mr-3 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24">
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Saving...
          </span>
          <span v-else>Save Preferences</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  profile: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["update-preferences"]);

const loading = ref(false);

const menuOptions = [
  { value: "games", label: "Games" },
  { value: "movies", label: "Movies" },
  { value: "tv", label: "TV Shows" },
  { value: "books", label: "Books" },
];

const formData = ref({
  default_view: "grid",
  items_per_page: 20,
  show_spoilers: false,
  auto_update_status: true,
  email_updates: false,
  release_notifications: false,
  menu_options: ["games", "movies", "tv", "books"],
});

const originalData = ref({});

// Watch for profile changes to update form
watch(
  () => props.profile,
  (newProfile) => {
    if (newProfile) {
      // Load from localStorage if available
      const stored = localStorage.getItem("media_tracker_preferences");
      let menu_options = ["games", "movies", "tv", "books"];
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed.menu_options)) {
            menu_options = parsed.menu_options;
          }
        } catch {
          // Ignore JSON parse errors
        }
      }
      formData.value = {
        default_view: "grid",
        items_per_page: 20,
        show_spoilers: false,
        auto_update_status: true,
        email_updates: false,
        release_notifications: false,
        menu_options,
      };
      originalData.value = { ...formData.value };
    }
  },
  { immediate: true }
);

const hasChanges = computed(() => {
  return JSON.stringify(formData.value) !== JSON.stringify(originalData.value);
});

import { useMediaStore } from "@/stores/media.js";
const mediaStore = useMediaStore();

const submitForm = async () => {
  if (!hasChanges.value) return;

  loading.value = true;

  try {
    // For now, only save theme_preference to backend
    // Other preferences can be stored in localStorage or added to backend later
    emit("update-preferences", {
      theme_preference: props.profile?.theme_preference,
    });

    // Store other preferences in localStorage for now
    localStorage.setItem(
      "media_tracker_preferences",
      JSON.stringify({
        default_view: formData.value.default_view,
        items_per_page: formData.value.items_per_page,
        show_spoilers: formData.value.show_spoilers,
        auto_update_status: formData.value.auto_update_status,
        email_updates: formData.value.email_updates,
        release_notifications: formData.value.release_notifications,
        menu_options: formData.value.menu_options,
      })
    );

    // Immediately update sidebar menu options reactively
    mediaStore.reloadEnabledMenuOptions();

    originalData.value = { ...formData.value };
  } finally {
    loading.value = false;
  }
};
</script>

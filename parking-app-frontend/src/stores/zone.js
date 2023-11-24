import { ref } from "vue";
import { defineStore } from "pinia";

export const defineZone = defineStore("zone", () => {
    const zones = ref([]);
    const loading = ref(false);

    function getZones() {
        return window.axios
          .get("zones")
          .then((response) => (zones.value = response.data.data));
    }

    return { zones, loading, getZones };
});
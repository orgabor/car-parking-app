import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useParking = defineStore("parking", () => {
    const router = useRouter();
    const errors = reactive({});
    const parkings = ref([]);
    const loading = ref(false);
    const form = reactive(
        {
            zone_id: "",
            vehicle_id: ""
        }
    );
    const stoppedParkings = ref([]);

    function resetForm() {
        form.zone_id = "";
        form.vehicle_id = "";
        errors.value = {};
    }

    function startParking() {
        if (loading.value) return;

        loading.value = true;
        errors.value = {};

        window.axios
           .post("parkings/start", form)
           .then(() => {
                router.push({ name: "parkings.active"});
            })
           .catch((error) => {
                if (error.response.status === 422) {
                    errors.value = error.response.data.errors;
                }
            })
           .finally(() => (loading.value = false));
    }

    function getActiveParkings() {
        return window.axios.get("parkings").then((response) => {
            parkings.value = response.data.data;
        });
    }

    function stopParking(parking) {
        window.axios.put(`parkings/${parking.id}`).then(getActiveParkings);
    }

    function getStoppedParkings() {
        return window.axios.get("parkings/history").then((response) => {
            stoppedParkings.value = response.data.data;
        });
    }

    return { form, loading, errors, parkings, stoppedParkings, resetForm, startParking, getActiveParkings, stopParking, getStoppedParkings };
})
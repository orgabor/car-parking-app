import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useVehicle = defineStore("vehicle", () => {
    const router = useRouter();
    const errors = reactive({});
    const vehicles = ref([]);
    const loading = ref(false);
    const form = reactive({
        plate_number: ""
    });

    function resetForm() {
        form.plate_number = "";
        errors.value = {};
    }

    function storeVehicle() {
        if (loading.value) return;

        loading.value = true;
        errors.value = {};

        window.axios
            .post("vehicles", form)
            .then(() => {
                router.push({ name: "vehicles.index" });
            })
            .catch((error) => {
                if (error.response.status === 422) {
                    errors.value = error.response.data.errors;
                }
            })
            .finally(() => (loading.value = false));
    }

    function getVehicles() {
        return window.axios
            .get("vehicles")
            .then((response) => (vehicles.value = response.data.data));
    }

    function updateVehicle(vehicle) {
        if (loading.value) return;

        loading.value = true;
        errors.value = {};

        window.axios
            .put(`vehicles/${vehicle.id}`, form)
            .then(() => {
                router.push({ name: "vehicles.index" });
            })
            .catch((error) => {
                if (error.response.status === 422) {
                    errors.value = error.response.data.errors;
                }
            })
            .finally(() => (loading.value = false));
    }

    function getVehicle(vehicle) {
        window.axios.get(`vehicles/${vehicle.id}`).then((response) => {
            form.plate_number = response.data.data.plate_number;
        });
    }

    function deleteVehicle(vehicle) {
        window.axios.delete(`vehicles/${vehicle.id}`)
        .then(getVehicles)
        .catch((error) => {
                if (error.response.status === 422) {
                    errors.value = error.response.data.errors;
                   // console.log(errors.value);
                }
            })
        .finally(() => (loading.value = false));
    }

    return { form, errors, loading, vehicles, resetForm, getVehicles, storeVehicle, updateVehicle, getVehicle, deleteVehicle };
});
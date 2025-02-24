<script setup>
import axios from "axios";
import { ref,onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const data = ref([]);
const pcList = ref(Array.from({ length: 30 }, (_, i) => `PC-${String(i + 1).padStart(3, "0")}`));
onMounted(async () => {
    try {
        const apiURL = `http://localhost:3000/api-repair/edit-repair/${route.params.id}`;
        const response = await axios.get(apiURL);
        data.value = response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});

const updateData = async () => {
    try {
        const apiURL = `http://localhost:3000/api-repair/update-repair/${route.params.id}`;
        const response = await axios.put(apiURL, data.value);
        if (response.status === 200) {
            router.push('/admin/manage-repair');
        }
    } catch (error) {
        console.error('Error updating data:', error);
    }
};

</script>

<template>
    <div class=" flex justify-center mt-12">
        <div class="bg-neutral-300 rounded-md p-6 w-96 shadow-2xl">
            <h1 class="text-center text-2xl font-bold">แจ้งซ่อม</h1>
            <form @submit.prevent="updateData">
                <div class="flex-col mt-3">
                    <label for="room">เลือกห้องคอมพิวเตอร์</label>
                    <select v-model="data.room"
                        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        required>
                        <option value="" hidden>-- กรุณาเลือก --</option>
                        <option>ห้องคอม1</option>
                        <option>ห้องคอม2</option>
                        <option>ห้องคอม3</option>
                        <option>ห้องคอม4</option>
                        <option>ห้องคอม5</option>
                    </select>
                </div>
                <div class="flex-col mt-3">
                    <label for="pc">เลือกเครื่องคอมพิวเตอร์</label>
                    <select v-model="data.pc"
                        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        required>
                        <option value="" hidden>-- กรุณาเลือก --</option>
                        <option v-for="pc in pcList" :key="pc" :value="pc">{{ pc }}</option>
                    </select>
                </div>
                <div class="flex-col mt-3">
                    <label for="category">เลือกหมวดหมู่อุปกรณ์</label>
                    <select v-model="data.category"
                        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        required>
                        <option hidden value="">-- กรุณาเลือก --</option>
                        <option>คีย์บอร์ด</option>
                        <option>เมาส์</option>
                        <option>จอภาพ</option>
                        <option>เคส</option>
                    </select>
                </div>
                <div class="flex-col mt-3">
                    <label for="urgency">เลือกความเร่งด่วน</label>
                    <select v-model="data.urgency"
                        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        required>
                        <option hidden value="">-- กรุณาเลือก --</option>
                        <option>ต่ำ</option>
                        <option>ปานกลาง</option>
                        <option>สูง</option>
                    </select>
                </div>
                <div class="flex-col mt-3">
                    <label for="urgency">สถานะ</label>
                    <select v-model="data.status"
                        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        required>
                        <option hidden value="">-- กรุณาเลือก --</option>
                        <option>รอดำเนินการ</option>
                        <option>กำลังดำเนินการ</option>
                        <option>ดำเนินการเส็จสิ้น</option>
                    </select>
                </div>
                <div class="flex-col mt-3">
                    <label for="detail">รายละเอียด</label>
                    <textarea v-model="data.detail"
                        class="block w-full min-h-[150px] max-h-[150px] rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"></textarea>
                </div>
                <div class="flex justify-evenly mt-3">
                    <button
                        class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                        type="reset">
                        ยกเลิก
                    </button>
                    <button
                        class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                        type="submit">
                        ยืนยัน
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
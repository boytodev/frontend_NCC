<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const data = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get("https://ncc-api.ncc-computerrepair.com/api-repair");
    data.value = response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

const deleteData = async (id) => {
  try {
    const response = await axios.delete(`https://ncc-api.ncc-computerrepair.com/api-repair/delete-repair/${id}`);
    if (response.status === 200) {
      router.go();
    }
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};
</script>

<template>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white border border-gray-200">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-3 text-center">ลำดับ</th>
          <th class="p-3 text-center text-base">วันที่แจ้ง</th>
          <th class="p-3 text-center">ชื่อผู้แจ้ง</th>
          <th class="p-3 text-center">ห้อง</th>
          <th class="p-3 text-center">หมายเลขเครื่อง</th>
          <th class="p-3 text-center">หมวดหมู่อุปกรณ์</th>
          <th class="p-3 text-center">ความเร่งด่วน</th>
          <th class="p-3 text-center">รายละเอียด</th>
          <th class="p-3 text-center">สถานะ</th>
          <th class="p-3 text-center">จัดการ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(response, index) in data" :key="response._id" class="border-t">
          <td class="p-3 text-center">{{ index + 1 }}</td>
          <td class="p-3 text-center">{{ response.createdAt }}</td>
          <td class="p-3 text-center">{{ response.reporter }}</td>
          <td class="p-3 text-center">{{ response.room }}</td>
          <td class="p-3 text-center">{{ response.pc }}</td>
          <td class="p-3 text-center">{{ response.category }}</td>
          <td class="p-3 text-center">{{ response.urgency }}</td>
          <td class="p-3 text-center">{{ response.detail || '-' }}</td>
          <td class="p-3 text-center">{{ response.status }}</td>
          <td class="p-3 text-center">
            <button @click="deleteData(response._id)" class="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded">
              ลบข้อมูล
            </button>
            <router-link
              v-if="response._id"
              :to="{ name: 'edit-repair', params: { id: response._id } }"
              class="bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded ml-2"
            >
              แก้ไข
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

onMounted(async () => {
  try {
    const response = await axios.get("https://ncc-api.ncc-computerrepair.com/api-repair");
    data.value = response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

const data = ref([]);
let index = 1;
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
        </tr>
      </thead>
      <tbody>
        <tr v-for="response in data" class="border-t">
          <td class="p-3 text-center">{{ index++ }}</td>
          <td class="p-3 text-center">{{ response.createdAt }}</td>
          <td class="p-3 text-center">{{ response.reporter }}</td>
          <td class="p-3 text-center">{{ response.room }}</td>
          <td class="p-3 text-center">{{ response.pc }}</td>
          <td class="p-3 text-center">{{ response.category }}</td>
          <td class="p-3 text-center">{{ response.urgency }}</td>
          <td class="p-3 text-center">{{ response.detail || '-'}}</td>
          <td class="p-3 text-center">{{ response.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import Swal from "sweetalert2";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("accessToken");
const decoded = jwtDecode(token);
const isEditing = ref(false); // สถานะแสดง Modal
const username = ref(""); // ค่า username ปัจจุบัน
const newusername = ref(""); // ค่า username ใหม่ที่ป้อน

// เปิด Modal แก้ไข username
const openEditModal = () => {
    newusername.value = username.value; // ให้ค่าเริ่มต้นตรงกับอีเมลปัจจุบัน
    isEditing.value = true;
};

// ปิด Modal
const closeEditModal = () => {
    isEditing.value = false;
};

onMounted(async () => {
    try {
        const response = await axios.get(`http://89.116.33.183:3000/api-user/edit/${decoded.userId}`);
        username.value = response.data.username;

    } catch (error) {
        console.error("❌ Error fetching username:", error);
        Swal.fire({
            icon: "error",
            title: "โหลดข้อมูลไม่สำเร็จ",
            text: error.response?.data?.message || "เกิดข้อผิดพลาดในการโหลดข้อมูล",
            showConfirmButton: true,
        });
    }
});

// บันทึก username ใหม่
const UpdateUsername = async () => {
    try {
        const apiURL = `http://89.116.33.183:3000/api-user/update/${decoded.userId}`;
        axios.put(apiURL, { username: newusername.value });
        Swal.fire("บันทึกสำเร็จ!", "อีเมลของคุณได้รับการอัปเดต", "success");
        username.value = newusername.value;
        closeEditModal();
    } catch (error) {
        console.error("❌ Error updating username:", error);
        Swal.fire({
            icon: "error",
            title: "บันทึกข้อมูลไม่สำเร็จ",
            text: error.response?.data?.message || "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
            showConfirmButton: true,
        });
    }
};
</script>

<template>
    <!-- username -->
    <div class="mb-4 flex justify-between">
        <span class="text-gray-700">👤 ชื่อผู้ใช้: {{ username }}</span>
        <button @click="openEditModal" class="text-blue-500">แก้ไข</button>
    </div>

    <!-- ✅ Modal แก้ไข username -->
    <div v-if="isEditing" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-[100]">
        <div class="bg-white p-6 rounded-lg shadow-xl w-80">
            <h3 class="text-lg font-semibold mb-4">แก้ไขชื่อผู้ใช้</h3>
            <input v-model="newusername" type="username" class="w-full p-2 border rounded" placeholder="กรอกชื่อผู้ใช้ใหม่" />
            <div class="flex justify-end mt-4">
                <button @click="closeEditModal" class="mr-2 px-4 py-2 bg-gray-300 rounded">ยกเลิก</button>
                <button @click="UpdateUsername" class="px-4 py-2 bg-blue-500 text-white rounded">บันทึก</button>
            </div>
        </div>
    </div>
</template>

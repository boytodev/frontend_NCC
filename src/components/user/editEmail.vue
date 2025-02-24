<script setup>
import { ref, onMounted } from "vue";
import Swal from "sweetalert2";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("accessToken");
const decoded = jwtDecode(token);
const isEditing = ref(false); // สถานะแสดง Modal
const email = ref(""); // ค่า Email ปัจจุบัน
const newEmail = ref(""); // ค่า Email ใหม่ที่ป้อน

// เปิด Modal แก้ไข Email
const openEditModal = () => {
    newEmail.value = email.value; // ให้ค่าเริ่มต้นตรงกับอีเมลปัจจุบัน
    isEditing.value = true;
};

// ปิด Modal
const closeEditModal = () => {
    isEditing.value = false;
};

onMounted(async () => {
    try {
        console.log(decoded.userId);
        const response = await axios.get(`http://localhost:3000/api-user/edit/${decoded.userId}`);
        email.value = response.data.email;

    } catch (error) {
        console.error("❌ Error fetching Email:", error);
        Swal.fire({
            icon: "error",
            title: "โหลดข้อมูลไม่สำเร็จ",
            text: error.response?.data?.message || "เกิดข้อผิดพลาดในการโหลดข้อมูล",
            showConfirmButton: true,
        });
    }
});

// บันทึก Email ใหม่
const UpdateEmail = async () => {
    try {
        if (!newEmail.value.includes("@")) {
            Swal.fire("⚠️ กรุณากรอกอีเมลที่ถูกต้อง!", "", "warning");
            return;
        }

        const apiURL = `http://localhost:3000/api-user/update/${decoded.userId}`;
        axios.put(apiURL, { email: newEmail.value });
        Swal.fire("บันทึกสำเร็จ!", "อีเมลของคุณได้รับการอัปเดต", "success");
        email.value = newEmail.value;
        closeEditModal();
    } catch (error) {
        console.error("❌ Error updating Email:", error);
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
    <!-- Email -->
    <div class="mb-4 flex justify-between">
        <span class="text-gray-700">📧 อีเมล: {{ email }}</span>
        <button @click="openEditModal" class="text-blue-500 cursor-pointer">แก้ไข</button>
    </div>

    <!-- ✅ Modal แก้ไข Email -->
    <div v-if="isEditing" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-[100]">
        <div class="bg-white p-6 rounded-lg shadow-xl w-80">
            <h3 class="text-lg font-semibold mb-4">แก้ไขอีเมล</h3>
            <input v-model="newEmail" type="email" class="w-full p-2 border rounded" placeholder="กรอกอีเมลใหม่" />
            <div class="flex justify-end mt-4">
                <button @click="closeEditModal"
                    class="mr-2 px-4 py-2 bg-gray-300 rounded cursor-pointer">ยกเลิก</button>
                <button @click="UpdateEmail"
                    class="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">บันทึก</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

const isEditing = ref(false); // สถานะแสดง Modal
const oldPassword = ref(""); // รหัสผ่านเก่าที่ผู้ใช้กรอก
const newPassword = ref(""); // รหัสผ่านใหม่
const confirmPassword = ref(""); // ยืนยันรหัสผ่านใหม่
const message = ref(""); // ข้อความแจ้งเตือน
const token = localStorage.getItem("accessToken");
const decoded = jwtDecode(token)

// เปิด Modal แก้ไข Password
const openEditModal = () => {
    oldPassword.value = "";
    newPassword.value = "";
    confirmPassword.value = "";
    message.value = "";
    isEditing.value = true;
};

// ปิด Modal
const closeEditModal = () => {
    isEditing.value = false;
};

// ตรวจสอบว่ารหัสผ่านใหม่ตรงกันหรือไม่
const checkPasswordMatch = () => {
    if (newPassword.value !== confirmPassword.value) {
        message.value = "⚠️ รหัสผ่านใหม่ไม่ตรงกัน";
        return false;
    } else {
        message.value = "";
        return true;
    }
};

// บันทึกรหัสผ่านใหม่
const savePassword = async () => {
    if (!checkPasswordMatch()) return;

    try {
        const response = await axios.put(
            `http://89.116.33.183:3000/api-user/change-password/${decoded.userId}`,
            { oldPassword: oldPassword.value, newPassword: newPassword.value },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        Swal.fire("✅ บันทึกสำเร็จ!", response.data.message, "success");
        closeEditModal();
    } catch (error) {
        Swal.fire("❌ เกิดข้อผิดพลาด", error.response?.data?.message || "ไม่สามารถเปลี่ยนรหัสผ่านได้", "error");
    }
};
</script>

<template>
    <!-- Password -->
    <div class="mb-4 flex justify-between">
        <div>
            <span class="text-gray-700">🔒 รหัสผ่าน:</span>
            <span class="font-bold text-gray-500 ml-2">.........................</span>
        </div>
        <button @click="openEditModal" class="text-blue-500">แก้ไข</button>
    </div>

    <!-- ✅ Modal แก้ไข Password -->
    <div v-if="isEditing" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-[100]">
        <div class="bg-white p-6 rounded-lg shadow-xl w-80">
            <h3 class="text-lg font-semibold mb-4">แก้ไขรหัสผ่าน</h3>

            <!-- กรอกรหัสผ่านเก่า -->
            <input
                v-model="oldPassword"
                type="password"
                class="w-full p-2 border rounded mb-3"
                placeholder="กรอกรหัสผ่านเก่า"
            />

            <!-- กรอกรหัสผ่านใหม่ -->
            <input
                v-model="newPassword"
                type="password"
                class="w-full p-2 border rounded mb-3"
                placeholder="กรอกรหัสผ่านใหม่"
            />

            <!-- ยืนยันรหัสผ่านใหม่ -->
            <input
                v-model="confirmPassword"
                @input="checkPasswordMatch"
                type="password"
                class="w-full p-2 border rounded"
                placeholder="ยืนยันรหัสผ่านใหม่"
            />

            <!-- ข้อความแจ้งเตือน -->
            <p v-if="message" class="text-red-500 text-sm mt-2">{{ message }}</p>

            <div class="flex justify-end mt-4">
                <button @click="closeEditModal" class="mr-2 px-4 py-2 bg-gray-300 rounded">ยกเลิก</button>
                <button
                    @click="savePassword"
                    class="px-4 py-2 bg-blue-500 text-white rounded"
                    :disabled="message !== ''"
                >
                    บันทึก
                </button>
            </div>
        </div>
    </div>
</template>

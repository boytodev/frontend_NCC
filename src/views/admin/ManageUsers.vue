<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const users = ref([]);

onMounted(async () => {
    try {
        const response = await axios.get("http://localhost:3000/api-user");
        users.value = response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});


// ฟังก์ชันลบข้อมูล

const deleteData = async (id) => {
    const token = localStorage.getItem("accessToken"); // ✅ ใช้ `accessToken` ที่ถูกต้อง

    if (!id) {
        Swal.fire("เกิดข้อผิดพลาด", "ID ของผู้ใช้ไม่ถูกต้อง", "error");
        return;
    }

    const confirmDelete = await Swal.fire({
        title: "คุณแน่ใจหรือไม่?",
        text: "คุณไม่สามารถกู้คืนข้อมูลนี้ได้!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "ใช่, ลบเลย!",
        cancelButtonText: "ยกเลิก",
    });

    if (!confirmDelete.isConfirmed) return;

    try {
        const response = await axios.delete(`http://localhost:3000/api-user/delete/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
            // ✅ ลบผู้ใช้จาก `users.value` เพื่ออัปเดต UI
            users.value = users.value.filter(user => user._id !== id);

            Swal.fire("ลบสำเร็จ!", "ข้อมูลถูกลบแล้ว", "success");
        }
    } catch (error) {
        console.error("❌ Error deleting data:", error);

        Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: error.response?.data?.message || "ไม่สามารถลบข้อมูลได้",
            showConfirmButton: true,
        });
    }
};

</script>

<template>
    <div class="overflow-x-auto">
        <div class="flex items-center justify-end mt-8">
            <router-link to="/admin/create-user"
                class="bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded focus:outline-none focus:shadow-outline cursor-pointer text-base">
                เพิ่มผู้ใช้
            </router-link>
        </div>
        <table class="min-w-full bg-white border border-gray-200">
            <thead>
                <tr class="bg-gray-100">
                    <th class="p-3 text-center text-base">ที่</th>
                    <th class="p-3 text-center">ชื่อผู้ใช้</th>
                    <th class="p-3 text-center">บทบาท</th>
                    <th class="p-3 text-center">จัดการ</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in users" :key="user._id" class="border-t">
                    <td class="p-3 text-center">{{ index + 1 }}</td>
                    <td class="p-3 text-center">{{ user.username }}</td>
                    <td class="p-3 text-center">{{ user.role }}</td>
                    <td class="p-3 text-center">
                        <button @click="deleteData(user._id)"
                            class="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded focus:outline-none focus:shadow-outline cursor-pointer text-base">
                            ลบข้อมูล
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

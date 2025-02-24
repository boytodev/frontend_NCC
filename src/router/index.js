import { createRouter, createWebHistory } from "vue-router";

// Layouts
import userLayout from "../layouts/userLayout.vue";
import adminLayout from "../layouts/adminLayout.vue";

// Views
import repair from "../views/user/repair.vue"; // ✅ แก้ `repaire` → `repair`
import login from "../views/login.vue";
import ManageUsers from "../views/admin/ManageUsers.vue";
import userHistory from "../views/user/userHistory.vue";
import ManageRepair from "../views/admin/ManageRepair.vue";
import editRepair from "@/views/admin/edit.repair.vue";
import createUser from "@/views/admin/createUser.vue";
import adminSetting from "@/views/admin/setting.vue";
import userSettings from "@/views/user/setting.vue";

const routes = [
  { path: "/", redirect: "/login" }, // ✅ เปลี่ยนให้ถูกต้อง

  { path: "/login", name: 'login', component: login }, // ✅ เพิ่ม path สำหรับ Login

 
  {
    path: "/user",
    component: userLayout,
    children: [
      { path: "", name: "home", component: repair }, // ✅ หน้า default
      { path: "repair", name: "repair", component: repair },
      { path: "history", name: "history", component: userHistory },
      {path: "userSetting", name: "userSetting", component: userSettings}
    ],
  },
  {
    path: "/admin",
    component: adminLayout,
    children: [
      { path: "", name: 'ManageRepair', component: ManageRepair },
      { path: "manage-users",name: 'manage-users', component: ManageUsers },
      { path: "manage-repair",name: 'manage-repair', component: ManageRepair },
      {path: "edit-repair/:id", name: 'edit-repair', component: editRepair},
      {path: "create-user", name: 'create-user', component: createUser},
      {path: "adminSetting", name: 'adminSetting', component: adminSetting},
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

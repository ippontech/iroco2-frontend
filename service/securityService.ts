import { useClerk } from "vue-clerk";

export default {
  isAdmin(): boolean {
    const clerk = useClerk();
    const role = clerk.user?.publicMetadata?.role || "";
    return role === "admin";
  },
};

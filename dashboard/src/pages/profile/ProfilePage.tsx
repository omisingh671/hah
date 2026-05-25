import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import { adminPath, ADMIN_ROUTES } from "@/configs/routePathsAdmin";
import ProfileForm from "@/features/profile/components/ProfileForm";

export default function ProfilePage() {
  return (
    <div className="space-y-5">
      <Link
        to={adminPath(ADMIN_ROUTES.SETTINGS)}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
      >
        <FiArrowLeft size={16} />
        Back to settings
      </Link>

      <ProfileForm />
    </div>
  );
}

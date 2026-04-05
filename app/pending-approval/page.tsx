import { redirect } from "next/navigation";
import PendingApprovalComponent from "../components/pendingApproval/PendingApprovalComponent";

export default function PendingApprovalPage() {
  // Ensure users are redirected to this page if not approved
  return <PendingApprovalComponent />;
}

import { auth } from "@/auth";

import LogOutButton from "@/features/auth/components/log-out-button";

const DashboardPage = async () => {
  const session = await auth();

  return (
    <div>
      DashboardPage
      {JSON.stringify(session)}
      <LogOutButton />
    </div>
  );
};

export default DashboardPage;

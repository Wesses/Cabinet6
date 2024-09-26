import { ReactNode } from 'react';

function ScreenWrapper({ children }: { children: ReactNode }) {
  return <div className="h-screen w-screen font-roboto">{children}</div>;
}

export default ScreenWrapper;

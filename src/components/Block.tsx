import type { ReactNode } from "react";

type BlockProps = {
  children: ReactNode;
};
export function Block({ children }: BlockProps) {
  return (
    <>
      <div className="block">{children}</div>
    </>
  );
}

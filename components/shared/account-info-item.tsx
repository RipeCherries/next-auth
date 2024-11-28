import React from 'react';

interface AccountInfoItemProps {
  name: string;
  value: string;
}

export function AccountInfoItem({ name, value }: AccountInfoItemProps): React.JSX.Element {
  return (
    <div className="flex flex-row items-center justify-between rounded-xl border p-4">
      <p className="font-semibold">{name}</p>
      <p className="font-medium py-1 px-2 bg-slate-100 rounded-md">{value}</p>
    </div>
  );
}